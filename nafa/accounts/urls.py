from django.urls import path
from .views import Login, Logout, Register, UserView, Logout

urlpatterns = [
    path('register/', Register.as_view(), name="register_user"),
    path('login/', Login.as_view(), name="login_user" ),
    path('user/', UserView.as_view(), name="user"),
    path('logout/', Logout.as_view(), name="logout_user")

]