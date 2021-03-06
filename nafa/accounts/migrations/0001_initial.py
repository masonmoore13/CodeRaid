# Generated by Django 3.2 on 2022-03-15 02:34

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=150, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('middle_name', models.CharField(blank=True, max_length=150, null=True)),
                ('last_name', models.CharField(max_length=150)),
                ('phone_no', models.CharField(max_length=10)),
                ('address_line_1', models.CharField(blank=True, max_length=150, null=True)),
                ('city', models.CharField(blank=True, default=None, max_length=150, null=True)),
                ('state', models.CharField(choices=[('AL', 'Alabama'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming')], default='LA', max_length=25)),
                ('current_work', models.CharField(blank=True, max_length=150, null=True)),
                ('has_contributions', models.BooleanField(default=False)),
                ('have_paid_dues', models.BooleanField(default=False)),
                ('descriptions', models.TextField(blank=True, max_length=2500, null=True)),
                ('achievements', models.TextField(blank=True, max_length=2500, null=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', accounts.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=150, null=True)),
                ('middle_name', models.CharField(blank=True, max_length=150, null=True)),
                ('last_name', models.CharField(blank=True, max_length=150, null=True)),
                ('maiden_name', models.CharField(blank=True, max_length=150, null=True)),
                ('grad_year', models.IntegerField(blank=True, null=True)),
                ('birth_date', models.CharField(blank=True, max_length=150, null=True)),
                ('phone_no', models.CharField(blank=True, max_length=10, null=True)),
                ('address_line_1', models.CharField(blank=True, max_length=150, null=True)),
                ('city', models.CharField(blank=True, default=None, max_length=150, null=True)),
                ('state', models.CharField(choices=[('AL', 'Alabama'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming')], default='LA', max_length=25)),
                ('current_work', models.CharField(blank=True, max_length=150, null=True)),
                ('has_contributions', models.BooleanField(default=False)),
                ('have_paid_dues', models.BooleanField(default=False)),
                ('achievements', models.TextField(blank=True, max_length=2500, null=True)),
                ('bio', models.TextField(blank=True, max_length=2500, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='media')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='useraccount', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
