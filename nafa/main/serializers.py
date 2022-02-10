from rest_framework import serializers
from main.models import * 
from .models import User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'rsvpd_members', 'event_name', 'date', 'location', 'banner_image', 
        'gallery', 'description', 'media', 'registration_fees')