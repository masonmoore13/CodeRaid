from rest_framework import viewsets
from main.serializers import *
from main.models import *
from accounts.models import User
from rest_framework import filters
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class GalleryView(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    search_fields = ['question_text']
    filter_backends = (filters.SearchFilter,)

    def retrieve(self, request, pk=None):
        queryset = Event.objects.all()
        eventObj = get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(eventObj)
        return Response(serializer.data)


class CampaignView(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class CategoryOfTeamView(viewsets.ModelViewSet):
    queryset = CategoryOfTeam.objects.all()
    serializer_class = CategoryOfTeamSerializer

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ScholarshipView(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

class ContributionView(viewsets.ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer

class RoleView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
