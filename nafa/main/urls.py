from django.urls import path
from . import views
from main.views import *

urlpatterns = [
    path('api/event/', views.event_list ),
    path("api/event/<int:pk>", event_detail, name="detail"),  
]