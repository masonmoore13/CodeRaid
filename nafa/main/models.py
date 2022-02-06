from django.db import models

class Member(models.Model):
    first_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    password = models.CharField(max_length=150)
    username = models.CharField(max_length=50, blank=True, null=True, unique=True)
    email = models.EmailField(unique=True)
    class_of = models.CharField(max_length=150)
    phone_no = models.CharField(max_length=10)
    have_paid_dues = models.BooleanField(default=False)
    current_work = models.CharField(max_length=150, blank=True, null=True)
    has_contributions = models.BooleanField(default=False)
    achievements = models.TextField(max_length=2500, blank=True, null=True)
    gender = models.CharField(max_length=10)
    
    #Unsure if these are needed
    #address_line_1 = models.CharField( max_length=150, blank=True, null=True)
    #city = models.CharField(max_length=150, blank=True, null=True, default=None)
    #state = models.CharField(max_length=25, choices=CONTIGUOUS_STATES, default='LA')

    def __str__(self):
      return(self.username) 

class Event(models.Model):
    rsvpd_members = models.ManyToManyField(Member)
    event_name = models.CharField(max_length=150)
    date = models.DateField()
    location = models.CharField(max_length=150)
    banner_image = models.CharField(max_length=150) #May need to be image field
    gallery = models.CharField(max_length=150) #May need to be image field
    description = models.TextField(max_length=2500)
    media = models.CharField(max_length=150) #May need to be image field - may be same as gallery
    registration_fees = models.CharField(max_length=150)

    def __str__(self):
      return(self.event_name)

class Campaign(models.Model):
    members_who_donated  = models.ManyToManyField(Member)
    campaign_name = models.CharField(max_length=150)
    media = models.CharField(max_length=150) #May need to be image field - may be same as gallery
    gallery = models.CharField(max_length=150) #May need to be image field
    banner_image = models.CharField(max_length=150) #May need to be image field
    goal = models.CharField(max_length=150)
    amount_collected = models.CharField(max_length=150)
    contact_details = models.CharField(max_length=150)

    def __str__(self):
      return(self.campaign_name)

class CategoryOfTeam(models.Model):
    category_name = models.CharField(max_length=150)
    description = models.TextField(max_length=2500)

    def __str__(self):
      return(self.category_name)
      
class Team(models.Model):
    members_of_team = models.ManyToManyField(Member, related_name='members_of_team')
    coaches = models.ManyToManyField(Member, related_name='coaches')
    year = models.CharField(max_length=150)
    type_of_team = models.ManyToManyField(CategoryOfTeam)
    description = models.TextField(max_length=2500)
    media = models.CharField(max_length=150) #May need to be image field

    def __str__(self):
      return(self.type_of_team)

class Scholarship(models.Model):
    scholarship_name = models.CharField(max_length=150)
    description = models.TextField(max_length=2500)
    image = models.CharField(max_length=150) #May need to be image field
    team_organization = models.ManyToManyField(Team) #may be wrong
    amount = models.CharField(max_length=150) #May be wrong - linked to Team table on schema

    def __str__(self):
      return(self.scholarship_name)

class Contribution(models.Model):
    members = models.ManyToManyField(Member)
    events = models.ManyToManyField(Event)
    campaigns = models.ManyToManyField(Campaign)

    def __str__(self):
      return(self.user)

class Role(models.Model):
    role_title = models.CharField(max_length=150)
    member_ID = models.ManyToManyField(Member)

    def __str__(self):
      return(self.role_title)

class Contact(models.Model):
    sender_email = models.CharField(max_length=150)
    sender_name = models.CharField(max_length=150)
    message = models.TextField(max_length=2500)

    def __str__(self):
      return(self.sender_email)
