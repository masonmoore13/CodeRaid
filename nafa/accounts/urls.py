from django.urls import path
from .views import  Logout,  MyTokenObtainPairView, VerifyEmail, RegisterView, UserView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name="register_user"),
    path('logout/', Logout.as_view(), name="logout_user"),
    path('user/',UserView.as_view(), name="user" ),  
    path('verify-email/', VerifyEmail.as_view(), name="verify_email"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]