from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from main.serializers import *
from main.models import *

#event_list(): GET list of events, POST a new event, DELETE all events
@api_view(['GET', 'POST', 'DELETE'])
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        
        title = request.query_params.get('title', None)
        if title is not None:
            events = events.filter(title__icontains=title)
        
        events_serializer = EventSerializer(events, many=True)
        return JsonResponse(events_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        event_data = JSONParser().parse(request)
        event_serializer = EventSerializer(data=event_data)
        if event_serializer.is_valid():
            event_serializer.save()
            return JsonResponse(event_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Event.objects.all().delete()
        return JsonResponse({'message': '{} Events were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
#GET / PUT / DELETE event by ‘id’
@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, pk):
    try: 
        event = Event.objects.get(pk=pk) 
    except Event.DoesNotExist: 
        return JsonResponse({'message': 'The event does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        event_serializer = EventSerializer(event) 
        return JsonResponse(event_serializer.data) 
 
    elif request.method == 'PUT': 
        event_data = JSONParser().parse(request) 
        event_serializer = EventSerializer(event, data=event_data) 
        if event_serializer.is_valid(): 
            event_serializer.save() 
            return JsonResponse(event_serializer.data) 
        return JsonResponse(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        event.delete() 
        return JsonResponse({'message': 'Event was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)