from rest_framework import serializers
from main.models import * 
from .models import User


class RelationshipSerializer(serializers.ModelSerializer):  
    relationship_name = serializers.ReadOnlyField()
    class Meta:
        model = Relationship
        fields = ('__all__')

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('__all__')


class HomeGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('home_gallery_image', 'id')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
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