from rest_framework import generics
from rest_framework.response import Response
from .serializers import MitchellEventSerializer
from .models import MitchellEvent

class MitchellCreateApi(generics.CreateAPIView):
    queryset = MitchellEvent.objects.all()
    serializer_class = MitchellEventSerializer

class MitchellViewApi(generics.ListAPIView):
    queryset=MitchellEvent.objects.all()
    serializer_class = MitchellEventSerializer