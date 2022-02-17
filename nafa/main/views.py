from django.shortcuts import render
from rest_framework import viewsets
from main.serializers import *
from main.models import *
from accounts.models import User
from rest_framework import filters
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class MemberView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = User.objects.all()

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    search_fields = ['question_text']
    filter_backends = (filters.SearchFilter,)

    def retrieve(self, request, pk=None):
        queryset = Event.objects.all()
        eventObj = get_object_or_404(queryset, pk=pk)
        serializer = EventSerializer(eventObj)
        return Response(serializer.data)

