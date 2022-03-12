from django.urls import path,include
from rest_framework import routers
from .views import  Logout,  MyTokenObtainPairView, VerifyEmail,Login, SetNewPassword,RequestPasswordResetEmail,  RegisterVerifyView, UserView, PasswordTokenCheck,UserProfileView
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)

route = routers.DefaultRouter()

route.register("user", UserProfileView, basename='UserProfileView')

urlpatterns = [
    path("profile/", include(route.urls)),
    path('register/',  RegisterVerifyView.as_view(), name="register_user"),
    path('login/',  Login.as_view(), name="login_user"),
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