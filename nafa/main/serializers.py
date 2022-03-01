from rest_framework import serializers
from main.models import * 
from .models import User

<<<<<<< HEAD
=======
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('__all__')

>>>>>>> 958e284cf86c851c90a0e157be8607e418636705
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ('__all__')

class CategoryOfTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryOfTeam
        fields = ('__all__')

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('__all__')

class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ('__all__')

class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = ('__all__')

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('__all__')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('__all__')