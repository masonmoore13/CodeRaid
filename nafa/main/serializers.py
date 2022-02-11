from rest_framework import serializers
from main.models import * 
from .models import User

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'middle_name', 'last_name', 'password', 
        'username', 'email', 'class_of', 'phone_no', 'have_paid_dues',
        'current_work', 'has_contributions',  'achievements',
        'address_line_1', 'city', 'state') 

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'rsvpd_members', 'event_name', 'date', 'location', 'banner_image', 
        'gallery', 'description', 'media', 'registration_fees')

# Mitchell created this for testing
class MitchellEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MitchellEvent
        fields = ['mitchell_event_name', 'location']