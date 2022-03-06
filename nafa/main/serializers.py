from rest_framework import serializers
from main.models import * 
from .models import User


class RelationshipSerializer(serializers.ModelSerializer):
    
    relationship_name = serializers.ReadOnlyField()
    class Meta:
        model = Relationship
        fields = ('__all__')


class UserProfileSerializer(serializers.ModelSerializer):
    
    '''
    Nested serializer
    Searches the ForeignKey according to the related name
    '''
    relationships =RelationshipSerializer(many=True, read_only=True, source="user1")
    
    class Meta:
        model = UserProfile
        fields = ('__all__')

    extra_kwargs = {'profile_picture': {'required': True}}


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('__all__')
        



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