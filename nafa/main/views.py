from rest_framework import viewsets
from main.serializers import *
from main.models import *

# class MemberView(viewsets.ModelViewSet):
#     serializer_class = MemberSerializer
#     queryset = User.objects.all()

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

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

# mitchell created this as a test
class MitchellEventView(viewsets.ModelViewSet):
    queryset = MitchellEvent.objects.all()
    serializer_class = MitchellEventSerializer