from django.urls import path, include
from main.views import *
from rest_framework import routers

route = routers.DefaultRouter()
route.register("event", EventView, basename='eventView')
route.register("campaign", CampaignView, basename='campaignView') 
route.register("categoryOfTeam", CategoryOfTeamView, basename='CategoryOfTeamView') 
route.register("team", TeamView, basename='TeamView') 
route.register("scholarships", ScholarshipView, basename='ScholarshipView') 
route.register("contribution", ContributionView, basename='ContributionView') 
route.register("role", RoleView, basename='RoleView') 
route.register("contact", ContactView, basename='ContactView') 

urlpatterns = [
    path('api/', include(route.urls)), 
]