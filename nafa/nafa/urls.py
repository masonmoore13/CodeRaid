from django.contrib import admin
from django.urls import path,include
from main.views import front, event, event_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('main/', include("main.urls")),
]