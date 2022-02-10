from django.contrib import admin
from django.urls import path
from main.views import front, event, event_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("event/", event, name="note"),
    path("event/<int:pk>/", event_detail, name="detail"),
]