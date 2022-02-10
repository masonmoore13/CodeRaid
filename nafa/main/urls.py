from django.urls import path
from . import views
from django.urls import path,include
from main.views import *

urlpatterns = [
    path('api/event/', views.event ),
    path("event/<int:pk>/", event_detail, name="detail"), 
    
]