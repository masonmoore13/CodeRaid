from django.shortcuts import render
from rest_framework import viewsets
from main.serializers import *
from main.models import *
from accounts.models import User
from rest_framework.views import APIView
from rest_framework.response import Response

class MemberView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = User.objects.all()

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

# mitchell created this as a test
class ReactEventView(APIView):
    def get(self, request):
        output = [{"eventName": output.mitchell_event_name,
                   "location": output.location}
                for output in MitchellEvent.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = MitchellEventSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
