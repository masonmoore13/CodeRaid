from email.policy import default
from optparse import Values
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import date
from .states import CONTIGUOUS_STATES
from django.contrib.auth.models import AbstractUser, BaseUserManager


# custon user manager
class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, username, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        if not username:
            raise Values('The username must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, username, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, username, **extra_fields)

    def create_superuser(self, email, username, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, username, **extra_fields)
    use_in_migrations = True

        

# update the django default user model
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique = True)
    first_name = models.CharField(max_length = 150)
    middle_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150)
    phone_no = models.CharField(max_length = 10)
    address_line_1 = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True, null=True, default=None)
    state = models.CharField(max_length=25, choices=CONTIGUOUS_STATES, default='LA')
    current_work = models.CharField(max_length=150, blank=True, null=True)
    has_contributions = models.BooleanField(default=False)
    have_paid_dues = models.BooleanField(default=False)
    descriptions = models.TextField(max_length=2500, blank=True, null=True)
    achievements = models.TextField(max_length=2500, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']
    USERNAME_FIELD = 'username'

    objects = UserManager()
    def __str__(self):
        return "{}".format(self.email)

class UserProfile(models.Model):
    user = models.OneToOneField(
        User, null=True, on_delete=models.CASCADE, related_name="useraccount")

    first_name = models.CharField(max_length=150, blank=True, null=True)
    middle_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    maiden_name = models.CharField(max_length=150, blank=True, null=True)
    grad_year = models.IntegerField(blank=True, null=True)
    birth_date = models.CharField(max_length=150, blank=True, null=True)
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    address_line_1 = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True,
                            null=True, default=None)
    state = models.CharField(
        max_length=25, choices=CONTIGUOUS_STATES, default='LA')
    current_work = models.CharField(max_length=150, blank=True, null=True)
    has_contributions = models.BooleanField(default=False)
    have_paid_dues = models.BooleanField(default=False)
    achievements = models.TextField(max_length=2500, blank=True, null=True)
    bio = models.TextField(max_length=2500, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='media', null=True, blank=True)

    def __str__(self):
        return(self.first_name + " " + self.last_name) 