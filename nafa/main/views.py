from rest_framework import viewsets
from main.serializers import *
from main.models import *
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet
from .permissions import UserPermission
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication 

class GalleryView(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['event__id'] #search foreign key id

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['event_name', 'address_line', 'city', 'date', ]
    ordering_fields = ['event_name', 'id', ]

    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = [UserPermission]



class CampaignView(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions 
    permission_classes = [UserPermission]

class CategoryOfTeamView(viewsets.ModelViewSet):
    queryset = CategoryOfTeam.objects.all()
    serializer_class = CategoryOfTeamSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]

class ScholarshipView(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]

class ContributionView(viewsets.ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]


class RoleView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    authentication_classes = (JWTTokenUserAuthentication,)
    # permissions
    permission_classes = [UserPermission]

class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer