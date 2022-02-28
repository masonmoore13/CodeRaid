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
from accounts.models import User

sitemaps = {
    'events': EventSiteMap,
    'campaigns': CampaignSiteMap,
    'gallery': GallerySiteMap,
    'CategoryOfTeam': CategoryOfTeamSiteMap,
    'team': TeamSiteMap,
    'scholarship': ScholarshipSiteMap
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

# url patterns for the whole project
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include("accounts.urls")),
    path('main/', include("main.urls")),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('sitemap.xml',sitemap,{'sitemaps': sitemaps}, name='sitemap'),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 


# run this on startup
def populateUser():
    print(User.objects.all())
    user = User.objects.filter(username="nafa")
    if user.exists():
        print("Superuser Already Exists: nafa | p:****")
    else:
        u = User.objects.create_superuser("nafa@wafa.com", "nafa", "nafa")
        u.save()

from main.models import Event
def populateEvents():
    event = Event.objects.filter(event_name="NAFA Event 2022")
    if event.exists():
        print("Events exits")
    else:
        eventObj = Event(
            event_name = "NAFA Event 2022",
            date = "2022-02-23",
            address_line = "4006 Spurgeon Drive",
            city = "Monroe",
            zip_code = "71203",
            contact_name = "Bibek Bhandari",
            contact_number = "3187894132",
            description = "This is an event"
        )
        eventObj.save()

populateUser()

populateEvents()