from django.db import models
from .states import CONTIGUOUS_STATES
from datetime import date
from accounts.models import User

class Event(models.Model):
    event_name = models.CharField(max_length=150)
    rsvpd_members = models.ManyToManyField(User, blank=True)
    date = models.DateField()
    location = models.CharField(max_length=150)
    banner_image = models.FileField(upload_to='Event Media', blank=True) 
    gallery = models.FileField(upload_to='Event Media', blank=True) 
    description = models.TextField(max_length=2500)
    media = models.ImageField(upload_to='Event Media', blank=True) 
    registration_fees = models.CharField(max_length=150)

    def __str__(self):
      return(self.event_name)

class Campaign(models.Model):
    campaign_name = models.CharField(max_length=150)
    members_who_donated  = models.ManyToManyField(User, blank=True)
    media = models.ImageField(upload_to='Campaign Media', blank=True)
    gallery = models.FileField(upload_to='Campaign Media', blank=True)
    banner_image = models.ImageField(upload_to='Campaign Media',  blank=True)
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    amount_collected = models.DecimalField(max_digits=10, decimal_places=2, default='0', blank=True)
    contact_details = models.CharField(max_length=150)

    def __str__(self):
      return(self.campaign_name)

class CategoryOfTeam(models.Model):
    category_name = models.CharField(max_length=150)
    year = models.IntegerField()
    description = models.TextField(max_length=2500)

    def __str__(self):
      return(self.category_name)

#Basketball, cheerleading, etc.       
class Team(models.Model):

    members_of_team = models.ManyToManyField(User, related_name='members_of_team') #Connects to members but not all members of old teams are site members
    coaches = models.ManyToManyField(User, related_name='coaches', blank=True)
    type_of_team = models.ForeignKey(CategoryOfTeam, on_delete=models.CASCADE)
    description = models.TextField(max_length=2500)
    media = models.ImageField(upload_to='Team Media', blank=True)

    def __str__(self):
      return(str(self.type_of_team.year) + " " +self.type_of_team.category_name)

class Scholarship(models.Model):
    scholarship_name = models.CharField(max_length=150)
    description = models.TextField(max_length=2500)
    image = models.ImageField(upload_to='Scholarship Media',  blank=True)
    team_organization = models.ManyToManyField(Team,  blank=True) 
    amount = models.CharField(max_length=150)

    def __str__(self):
      return(self.scholarship_name)

class Contribution(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    events = models.ManyToManyField(Event)
    campaigns = models.ManyToManyField(Campaign)

    def __str__(self):
      return(self.user.username)

class Role(models.Model):
    role_title = models.CharField(max_length=150, blank=True)
    user = models.ManyToManyField(User, blank=True)

    def __str__(self):
      return(self.role_title)

class Contact(models.Model):
    sender_email = models.CharField(max_length=150)
    sender_name = models.CharField(max_length=150)
    message = models.TextField(max_length=2500)

    def __str__(self):
      return(self.sender_email)