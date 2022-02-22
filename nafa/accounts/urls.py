from django.urls import path
from .views import  Logout, Register, Logout, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('register/', Register.as_view(), name="register_user"),
    path('logout/', Logout.as_view(), name="logout_user"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]