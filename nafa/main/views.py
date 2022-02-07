from django.shortcuts import render
from rest_framework import viewsets
from main.serializers import *
from main.models import *


class MemberView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()