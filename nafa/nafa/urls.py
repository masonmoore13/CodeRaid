from django.contrib import admin
from django.urls import path,include, re_path
from main.views import *
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.sitemaps.views import sitemap 
from .sitemap import *

sitemaps = {
    'events': EventSiteMap
}

schema_view = get_schema_view(
   openapi.Info(
      title="NAFA WEB API",
      default_version='v1',
      description="NAFA website api endpoints",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('main/', include("main.urls")),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('sitemap.xml',sitemap,{'sitemaps': sitemaps}, name='sitemap'),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
