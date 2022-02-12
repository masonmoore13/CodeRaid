from django.urls import path, include
from main.views import *
from rest_framework import routers

route = routers.DefaultRouter()
route.register("event", EventView, basename='eventView')
route.register("campaign", CampaignView, basename='campaignView') 
route.register("CategoryOfTeam", CategoryOfTeamView, basename='CategoryOfTeamView') 
route.register("Team", TeamView, basename='TeamView') 
route.register("Scholarship", ScholarshipView, basename='ScholarshipView') 
route.register("Contribution", ContributionView, basename='ContributionView') 
route.register("Role", RoleView, basename='RoleView') 
route.register("Contact", ContactView, basename='ContactView') 
route.register("events", MitchellEventView, basename="mitchelleventview")

urlpatterns = [
    path('api/', include(route.urls)), 
]