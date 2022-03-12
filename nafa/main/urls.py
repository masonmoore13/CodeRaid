from django.urls import path, include
from main.views import *
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

route = routers.DefaultRouter()
route.register("gallery", GalleryView, basename='galleryView')
route.register("event", EventView, basename='eventView')
route.register("campaign", CampaignView, basename='campaignView') 
route.register("Team", TeamView, basename='TeamView') 
route.register("Scholarship", ScholarshipView, basename='ScholarshipView') 
route.register("contribution", ContributionView, basename='ContributionView') 
route.register("role", RoleView, basename='RoleView') 
route.register("contact", ContactView, basename='ContactView') ,
route.register("relationship", RelationshipView, basename='RelationshipView')


urlpatterns = [
    path('api/', include(route.urls)), 
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
