from django.db import models
from .states import CONTIGUOUS_STATES
from datetime import date

class Member(models.Model):
    first_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150)
    password = models.CharField(max_length=150)
    username = models.CharField(max_length=50, blank=True, null=True, unique=True)
    email = models.EmailField(unique=True)
    class_of = models.CharField(max_length=150, blank=True)
    phone_no = models.CharField(max_length=10)
    have_paid_dues = models.BooleanField(default=False)
    current_work = models.CharField(max_length=150, blank=True, null=True)
    has_contributions = models.BooleanField(default=False)
    achievements = models.TextField(max_length=2500, blank=True, null=True)
    gender = models.CharField(max_length=10)
    address_line_1 = models.CharField( max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True, null=True, default=None)
    state = models.CharField(max_length=25, choices=CONTIGUOUS_STATES, default='LA')

    def __str__(self):
      return(self.username) 

class Event(models.Model):
    rsvpd_members = models.ManyToManyField(Member, blank=True)
    event_name = models.CharField(max_length=150)
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
    members_who_donated  = models.ManyToManyField(Member, blank=True)
    campaign_name = models.CharField(max_length=150)
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
    description = models.TextField(max_length=2500)

    def __str__(self):
      return(self.category_name)

#Basketball, cheerleading, etc.       
class Team(models.Model):
    members_of_team = models.ManyToManyField(Member, related_name='members_of_team') #Connects to members but not all members of old teams are site members
    coaches = models.ManyToManyField(Member, related_name='coaches', blank=True)
    year = models.CharField(max_length=150)
    type_of_team = models.ManyToManyField(CategoryOfTeam)
    description = models.TextField(max_length=2500)
    media = models.ImageField(upload_to='Team Media', blank=True)

    def __str__(self):
      return(self.type_of_team)

class Scholarship(models.Model):
    scholarship_name = models.CharField(max_length=150)
    description = models.TextField(max_length=2500)
    image = models.ImageField(upload_to='Scholarship Media',  blank=True)
    team_organization = models.ManyToManyField(Team,  blank=True) 
    amount = models.CharField(max_length=150)

    def __str__(self):
      return(self.scholarship_name)

class Contribution(models.Model):
    members = models.ManyToManyField(Member)
    events = models.ManyToManyField(Event)
    campaigns = models.ManyToManyField(Campaign)

    def __str__(self):
      return(self.user)

class Role(models.Model):
    role_title = models.CharField(max_length=150, blank=True)
    member_ID = models.ManyToManyField(Member, blank=True)

    def __str__(self):
      return(self.role_title)

class Contact(models.Model):
    sender_email = models.CharField(max_length=150)
    sender_name = models.CharField(max_length=150)
    message = models.TextField(max_length=2500)

    def __str__(self):
      return(self.sender_email)
