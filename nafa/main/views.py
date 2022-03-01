from rest_framework import viewsets
from main.serializers import *
from main.models import *
<<<<<<< HEAD

# class MemberView(viewsets.ModelViewSet):
#     serializer_class = MemberSerializer
#     queryset = User.objects.all()
=======
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet
from .permissions import UserPermission
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication 
from django.core.mail import send_mail


class GalleryView(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['event__id'] #search foreign key id

    # permissions
    permission_classes = [UserPermission]
>>>>>>> 958e284cf86c851c90a0e157be8607e418636705

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

<<<<<<< HEAD
=======
    permission_classes = [UserPermission]



>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class CampaignView(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

<<<<<<< HEAD
=======
    # permissions 
    permission_classes = [UserPermission]

>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class CategoryOfTeamView(viewsets.ModelViewSet):
    queryset = CategoryOfTeam.objects.all()
    serializer_class = CategoryOfTeamSerializer

<<<<<<< HEAD
=======
    # permissions
    permission_classes = [UserPermission]

>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

<<<<<<< HEAD
=======
    # permissions
    permission_classes = [UserPermission]

>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class ScholarshipView(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

<<<<<<< HEAD
=======
    # permissions
    permission_classes = [UserPermission]

>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class ContributionView(viewsets.ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer

<<<<<<< HEAD
=======
    # permissions
    permission_classes = [UserPermission]


>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class RoleView(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

<<<<<<< HEAD
class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
=======
    # permissions
    permission_classes = [UserPermission]

class ContactView(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
