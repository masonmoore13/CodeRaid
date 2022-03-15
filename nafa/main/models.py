from django.db import models
from datetime import date
from accounts.models import User, UserProfile

class Relationship(models.Model):
    relationship_type = models.CharField(
        max_length=400, null=False, default="Friend")
    user = models.ForeignKey(
        UserProfile, default=None, null=False, related_name="user1", on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        UserProfile, default=None, null=False, related_name="user2", on_delete=models.CASCADE)
    bool = models.BooleanField(default=False)
    # Extra property
    @property
    def relationship_name(self):
        return str(self.user2.first_name) + " "+ str(self.user2.middle_name) + " " + str(self.user2.last_name)
    
    def __str__(self):
        return(self.relationship_type)  # want to return username

class Event(models.Model):
    event_name = models.CharField(max_length=150)
    date = models.CharField(max_length=40)
    time = models.CharField(max_length=40, null=True, blank=True)
    address_line = models.CharField(max_length=250, null=True, blank=True)
    city = models.CharField(max_length=150, blank=True,
                            null=True, default=None)
    state = models.CharField(max_length=50, default='LA')
    zip_code = models.CharField(max_length=150)
    contact_name = models.CharField(
        max_length=150, blank=True, null=True, default=None)
    contact_number = models.CharField(
        max_length=150, blank=True, null=True, default=None)
    contact_email = models.EmailField(
        max_length=150, blank=True, null=True, default=None)
    banner_image = models.ImageField(default="EventBannerDefault.jpg")

    description = models.TextField(max_length=2500)
    # rsvpd_members = models.ManyToManyField(User, blank=True)
    registration_fees = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return(self.event_name)

    @property
    def imageURL(self):
        if self.banner_image:
            return self.banner_image.url
        else:
            return "/media/EventBannerDefault.jpg"


class Gallery(models.Model):
    event_image = models.FileField(upload_to='media/Event Media', null=True, blank=True)
    event = models.ForeignKey(
        Event, default=None, on_delete=models.CASCADE, null=True, blank=True)

    home_gallery_image = models.FileField(
        upload_to='media/Home Gallery', default="", null=True, blank=True)

    def __int__(self):
        return (self.id, self.event)




class Campaign(models.Model):
    campaign_name = models.CharField(max_length=150)
    members_who_donated = models.ManyToManyField(User, blank=True)
    media = models.ImageField(upload_to='media/Campaign Media', blank=True)
    gallery = models.FileField(upload_to='media/Campaign Media', blank=True)
    banner_image = models.ImageField(
        upload_to='media/Campaign Media',  blank=True)
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    amount_collected = models.DecimalField(
        max_digits=10, decimal_places=2, default='0', blank=True)
    contact_details = models.CharField(max_length=150)

    def __str__(self):
        return(self.campaign_name)

class Team(models.Model):
    members_of_team = models.ManyToManyField(
        User, related_name='members_of_team', blank=True)
    coaches = models.ManyToManyField(
        User, related_name='coaches', blank=True)
    team_name = models.CharField(max_length=150, null=True, blank=True, default='')
    # football, soccer, tennis
    category = models.CharField(max_length=150, null=True, blank=True, default='')
    sub_category = models.CharField(
        max_length=150, null=True, blank=True)  # varsity,
    year = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(max_length=2500, null=True, blank=True)

    def __str__(self):
        return(self.category)


class Scholarship(models.Model):
    scholarship_name = models.CharField(max_length=150)
    description = models.TextField(max_length=2500)
    image = models.ImageField(upload_to='media/Scholarship Media',  blank=True)
    team_organization = models.ManyToManyField(Team,  blank=True)
    amount = models.CharField(max_length=150)

    def __str__(self):
        return(self.scholarship_name)


class Contribution(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, default="")
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
