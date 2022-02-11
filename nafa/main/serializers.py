from rest_framework import serializers
from main.models import * 
from .models import User

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
        model = Event
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

# Mitchell created this for testing
class MitchellEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MitchellEvent
        fields = ('__all__')