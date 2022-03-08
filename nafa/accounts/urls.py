from django.urls import path
from .views import  Logout,  MyTokenObtainPairView,UserProfileView, VerifyEmail, SetNewPassword,RequestPasswordResetEmail, RegisterView, UserView, PasswordTokenCheck
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)
from rest_framework import routers

route = routers.DefaultRouter()

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register_user"),
    path('logout/', Logout.as_view(), name="logout_user"),
    path('user/',UserView.as_view(), name="user" ),  
    path('verify-email/', VerifyEmail.as_view(), name="verify_email"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('request-reset-password/', RequestPasswordResetEmail.as_view(), name="reset_password_email"),
    path('reset-password/<uidb64>//<token>//', PasswordTokenCheck.as_view(), name="reset_password_confirm"),
    path('set-new-password/', SetNewPassword.as_view(), name="set-new-password"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify')
]
route.register("userProfile", UserProfileView, basename='UserProfileView')
