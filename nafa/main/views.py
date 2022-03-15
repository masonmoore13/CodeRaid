from rest_framework import viewsets
from main.serializers import *
from main.models import *
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet
from .permissions import UserPermission
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication 
from django.core.mail import send_mail

class RelationshipView(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer
    
   

class GalleryView(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=event__id'] #search foreign key id

    # permissions
    permission_classes = [UserPermission]
    
# Home page gallery, exludes any image that is null or empty. 
class HomeGalleryView(viewsets.ModelViewSet):
    queryset = Gallery.objects.exclude(
        home_gallery_image__isnull=True).exclude(home_gallery_image__exact='')
    serializer_class = HomeGallerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['home_gallery_image']  

    # permissions
    permission_classes = [UserPermission]

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    permission_classes = [UserPermission]

class CampaignView(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    # permissions 
    permission_classes = [UserPermission]

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']  # search by team category

    # permissions
    permission_classes = [UserPermission]

class ScholarshipView(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    # permissions
    permission_classes = [UserPermission]

class ContributionView(viewsets.ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer

    # permissions
    permission_classes = [UserPermission]


class RoleView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    # permissions
    permission_classes = [UserPermission]

class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
