from django.contrib import admin
from django.urls import path,include
from main.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('main/', include("main.urls")),
]