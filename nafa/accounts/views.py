from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.authentication import JWTAuthentication
from nafa.settings import SIMPLE_JWT

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

   

# registration api view
class Register(APIView):
    # post view
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

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
