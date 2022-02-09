from django.shortcuts import render
from rest_framework import viewsets
from main.serializers import *
from main.models import *
from accounts.models import User

class MemberView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = User.objects.all()

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()