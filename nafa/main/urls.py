from django.urls import path
from . import views
from main.views import *

urlpatterns = [
    path('api/event/', views.event ),
    path("api/event/<int:pk>/", event_detail, name="detail"),  
]