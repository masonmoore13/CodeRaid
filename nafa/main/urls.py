from django.urls import path
from . import views

urlpatterns = [
    path('api/event/', views.event ),
]