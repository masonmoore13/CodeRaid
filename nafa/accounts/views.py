from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.authentication import JWTAuthentication
from nafa.settings import SIMPLE_JWT
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

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
class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):
        user=request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        userObj = User.objects.get(username=user_data['username'])

        # generate refresh token for the user to activate
        token = RefreshToken.for_user(userObj).access_token

        # get current site and attach token to it
        current_site = get_current_site(request).domain
        relativeLink = reverse('verify_email')

        # need to update this after deployment to our desired web address
        absurl = 'http://localhost:8000'+ relativeLink + "?token=" + str(token)
        
        # email the activation lijnk
        email_body = "Hi " + userObj.username + " use the link below to verify\n" + absurl
        # data to send email
        data ={
            'domain':absurl,
            'email_subject': "Verify Your Email",
            "email_body": email_body,
            "to_email": userObj.email
        }
        # email the activation link
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)



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

class UserView(APIView):
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
