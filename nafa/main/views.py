from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MemberSerializer
from main.models import *


class MembersView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()