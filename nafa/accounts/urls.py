from django.urls import path
from .views import  Logout, Register,  MyTokenObtainPairView, UserView
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)


urlpatterns = [
    path('register/', Register.as_view(), name="register_user"),
    path('logout/', Logout.as_view(), name="logout_user"),
    path('user/',UserView.as_view(), name="user" ),  
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify')
]