from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from nafa.settings import SIMPLE_JWT
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import datetime
import jwt
from .models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer, UserSerializer
from main.models import UserProfile
from rest_framework.views import APIView
from django.shortcuts import render
from operator import truediv
from rest_framework import filters


from rest_framework import viewsets
from rest_framework import generics

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': ('Username or password does not match')
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

   

# registration api view
# class Register(APIView):
# generic registration with email
# class RegisterView(generics.GenericAPIView):

#     serializer_class = UserSerializer

#     def post(self, request):
#         user=request.data
#         serializer = self.serializer_class(data=user)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()

#         user_data = serializer.data
#         userObj = User.objects.get(username=user_data['username'])

#         # generate refresh token for the user to activate
#         token = RefreshToken.for_user(userObj).access_token

#         # get current site and attach token to it
#         current_site = get_current_site(request).domain
#         relativeLink = reverse('verify_email')

#         # need to update this after deployment to our desired web address
#         absurl = 'http://localhost:8000'+ relativeLink + "?token=" + str(token)
        
#         # email the activation lijnk
#         email_body = "Hi " + userObj.username + " use the link below to verify\n" + absurl
#         # data to send email
#         data ={
#             'domain':absurl,
#             'email_subject': "Verify Your Email",
#             "email_body": email_body,
#             "to_email": userObj.email
#         }
#         # email the activation link
#         Util.send_email(data)
#         return Response(user_data, status=status.HTTP_201_CREATED)


# registration api view
class RegisterView(APIView):
    # post view
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


#  view to verify the user email address
class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        # get the token sent to the mail
        token = request.GET.get('token')

        # decode the token and verify
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=payload['user_id'])
            
            # check if the user is verified
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({"email": "Successfully Activated"}, status=status.HTTP_200_OK)
        # error handling for token expired
        except jwt.ExpiredSignature as e:
            return Response({"error": "Activation Link Expired"}, status=status.HTTP_400_BAD_REQUEST)
        # error handling for token decode error
        except jwt.DecodeError as e:
            return Response({"error": "Decode Error"}, status=status.HTTP_400_BAD_REQUEST)


# endpoint to reset password using email
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request': request, 'data':request.data}
        serializer = self.serializer_class(data=data)

        email = request.data['email']
        # check if the user with that email exists
        if User.objects.filter(email=email).exists():
            userObj = User.objects.get(email=email)

            # encoding for comm across networks
            uidb64 = urlsafe_base64_encode(smart_bytes(userObj.id))
            # make a token to reset the password
            token = PasswordResetTokenGenerator().make_token(userObj)

            # send email with the token to reset the password
            # get current site and attach token to it
            current_site = get_current_site(request).domain
            relativeLink = reverse('reset_password_confirm', kwargs={'uidb64': uidb64, 'token':token})

            # need to update this after deployment to our desired web address
            absurl = 'http://localhost:8000'+ relativeLink
            
            # email the activation lijnk
            email_body = "Hi use the link below to reset your password\n" + absurl
            # data to send email
            data ={
                'domain':absurl,
                'email_subject': "Reset Your Password",
                "email_body": email_body,
                "to_email": userObj.email
            }
            # email the activation link
            Util.send_email(data)
    
        return Response({"success": "We've sent a link to reset your password"}, status=status.HTTP_200_OK)


# password token check
# this is the view affter the user clicks the reset link in email
class PasswordTokenCheck(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"error": "Token isn't valid. Request new one"}, status=status.HTTP_401_UNAUTHORIZED)
        
            return Response({"success":True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)


        except DjangoUnicodeDecodeError as e:
            return Response({"error": "Token isn't valid. Request new one"}, status=status.HTTP_401_UNAUTHORIZED)

# view for password change
class SetNewPassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"success": True, 'message':"Password Reset Success"}, status=status.HTTP_200_OK)

# login view
# class Login(APIView):
#     def post(self, request):


#         # create a payload for token
#         # payload = {
#         #     "id": user.id,
#         #     "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#         #     "iat": datetime.datetime.utcnow()
#         # }

#         # # create a token
#         # token = jwt.encode(payload, 'secret', algorithm='HS256').decode("utf-8")

#         # set the token to cookie
#         response = Response()
#         # response.set_cookie(key='jwt', value=token, httponly=True)

#         response.data = {
#             'status': 'authenticated'
#         }

#         return response


class UserProfileView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'user__id'] 

class UserView(APIView):
    serializer_class = UserSerializer
    
    def get(self, request):
        authentication_classes = [JWTAuthentication]
        print(request)
        authenticate = JWTAuthentication().authenticate(request)
        print(authenticate)
        username = authenticate[1]['username']
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
        
    
        
# user view to see if the token is still active
# class UserView(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed('unauthenticated')

#         try:
#             payload = jwt.decode(token, 'secret', algorithm=['HS256'])

#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed("not authenticated")

#         # filter the user with payload id i.e. check for token
#         user = User.objects.filter(id=payload['id']).first()
#         serializer = UserSerializer(user)

#         return Response(serializer.data)


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
