from django.contrib import admin
from django.urls import path,include
from main.views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('main/', include("main.urls")),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 