
from operator import truediv
import re
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework import viewsets
from main.models import UserProfile
from .serializers import  ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer, UserSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication, JWTAuthentication
from rest_framework import filters
import os
from django.shortcuts import redirect


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = ('http', 'https')


JwtAuthenticator = JWTAuthentication()

usernameGetter = JWTTokenUserAuthentication()


# overriding obtain token to our custom need


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': ('Username or password doesnot match')
    }

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# generic registration with email
class RegisterVerifyView (generics.GenericAPIView):

    serializer_class = UserSerializer

    def post(self, request):
        user = request.data

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        userObj = User.objects.get(username=user_data['username'])
        userObj.is_active = False
        userObj.save()
        # generate refresh token for the user to activate
        token = MyTokenObtainPairSerializer.get_token(userObj).access_token

        # get current site and attach token to it
        current_site = get_current_site(request).domain
        relativeLink = reverse('verify_email')
        redirect_url = request.data.get('redirect_url', '')
        
        ## appropriate redirect url sent
        # need to update this after deployment to our desired web address
        absurl = current_site + relativeLink + "?token=" + str(token) +"?redirect_url="+redirect_url

        # email the activation lijnk
        email_body = "Hi " + userObj.username + \
            " use the link below to verify\n" + absurl
        # data to send email
        data = {
            'domain': absurl,
            'email_subject': "Verify Your Email",
            "email_body": email_body,
            "to_email": userObj.email
        }
        # email the activation link
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


class Login(APIView):

    def post(self, request):
        username = request.data["username"]

        password = request.data["password"]



        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                return Response({'error': 'Password does not match'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Username or password does not match'}, status=status.HTTP_404_NOT_FOUND)

        if user:
            if user.is_active == False:
                return Response({'error': 'Please verify your email'}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = MyTokenObtainPairSerializer.get_token(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })


#  view to verify the user email address
class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        # get the token sent to the mail
        token = request.GET.get('token')
        print(token)
        # decode the token and verify
        # try:
        vToken = JwtAuthenticator.get_validated_token(token)
        if(token is not None):
            
            userObj = usernameGetter.get_user(vToken).id
            
            try:
                user = User.objects.get(id=userObj)
            except User.DoesNotExist:
                return Response({"error": "Token expired or invalid"}, status=status.HTTP_400_BAD_REQUEST)
            # check if the user is verified
            redirect_url = request.GET.get('redirect_url','')
            if not user.is_active:
                user.is_active = True
                user.save()
                if redirect_url and len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?email_verified=True')
            else:
                return CustomRedirect(redirect_url+'?email_verified=False')
        else:
            return CustomRedirect(redirect_url+'?email_verified=False&token_experied=True')
        # error handling for token expired
        # except jwt.ExpiredSignature as e:
        #     return Response({"error": "Activation Link Expired"}, status=status.HTTP_400_BAD_REQUEST)
        # # error handling for token decode error
        # except jwt.DecodeError as e:
        #     return Response({"error": "Decode Error"}, status=status.HTTP_400_BAD_REQUEST)


# password token check
# this is the view affter the user clicks the reset link in email
class PasswordTokenCheck(generics.GenericAPIView):

    def get(self, request, uidb64, token):
        redirect_url = request.GET.get('redirect_url')
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                # return Response({"error": "Token isn't valid. Request new one"}, status=status.HTTP_401_UNAUTHORIZED)

                if len(redirect_url > 3):
                    return CustomRedirect(redirect_url+'token_valid=False')
                else:
                    return CustomRedirect(os.environ.get('FRONTEND_URL')+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(redirect_url+'token_valid=False')
            # return Response({"success":True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as e:
            return CustomRedirect(redirect_url+'?token_valid=False')


# endpoint to reset password using email
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request': request, 'data': request.data}
        serializer = self.serializer_class(data=data)

        email = request.data.get("email","")
        print(email)
        # check if the user with that email exists
        if User.objects.filter(email=email).exists():
            userObj = User.objects.get(email=email)

            # encoding for comm across networks
            uidb64 = urlsafe_base64_encode(smart_bytes(userObj.id))
            # make a token to reset the password
            tokenP = PasswordResetTokenGenerator().make_token(userObj)

            # send email with the token to reset the password
            # get current site and attach token to it
            current_site = get_current_site(request).domain
            relativeLink = reverse(
                'reset-password-confirm', kwargs={'uidb64': uidb64, 'token': tokenP})

            # redirect url coming from frontend

            redirect_url = request.data.get('redirect_url', '')

            # need to update this after deployment to our desired web address
            absurl = 'http://'+current_site + relativeLink

            # email the activation lijnk
            email_body = "Hi use the link below to reset your password\n" + \
                absurl + "?redirect_url="+redirect_url
            # data to send email
            data = {
                'domain': absurl,
                'email_subject': "Reset Your Password",
                "email_body": email_body,
                "to_email": userObj.email
            }
            # email the activation lin
            Util.send_email(data)

        return Response({"success": "We've sent a link to reset your password to your email if our system has an account with this email"}, status=status.HTTP_200_OK)


class SetNewPassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"success": True, 'message': "Password Reset Success"}, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            userProfile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            UserProfile.objects.create(user=user)

        userProfile = UserProfile.objects.get(user=user)
        userProfileSerializer = UserProfileSerializer(userProfile)

        userSerializer = UserSerializer(user)

        response_dictonary = {"user": userSerializer.data,
                              "userProfile": userProfileSerializer.data}
        return Response(response_dictonary)


class UserProfileView(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

# logout view


class Logout(APIView):
    def post(self, request):
        response = Response()
        # delete the cookie will logout
        response.delete_cookie('jwt')
        response.data = {
            "message": "successfully logged out"
        }
        return response
