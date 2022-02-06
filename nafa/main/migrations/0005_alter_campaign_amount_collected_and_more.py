# Generated by Django 4.0.1 on 2022-02-06 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_campaign_media_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='amount_collected',
            field=models.DecimalField(blank=True, decimal_places=2, default='0', max_digits=10),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='banner_image',
            field=models.ImageField(blank=True, upload_to='Campaign Media'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='gallery',
            field=models.FileField(blank=True, upload_to='Campaign Media'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='goal',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='media',
            field=models.ImageField(blank=True, upload_to='Campaign Media'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='members_who_donated',
            field=models.ManyToManyField(blank=True, to='main.Member'),
        ),
        migrations.AlterField(
            model_name='event',
            name='banner_image',
            field=models.FileField(blank=True, upload_to='Event Media'),
        ),
        migrations.AlterField(
            model_name='event',
            name='gallery',
            field=models.FileField(blank=True, upload_to='Event Media'),
        ),
        migrations.AlterField(
            model_name='event',
            name='media',
            field=models.ImageField(blank=True, upload_to='Event Media'),
        ),
        migrations.AlterField(
            model_name='event',
            name='rsvpd_members',
            field=models.ManyToManyField(blank=True, to='main.Member'),
        ),
        migrations.AlterField(
            model_name='member',
            name='class_of',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='role',
            name='member_ID',
            field=models.ManyToManyField(blank=True, to='main.Member'),
        ),
        migrations.AlterField(
            model_name='role',
            name='role_title',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='scholarship',
            name='image',
            field=models.ImageField(blank=True, upload_to='Scholarship Media'),
        ),
        migrations.AlterField(
            model_name='scholarship',
            name='team_organization',
            field=models.ManyToManyField(blank=True, to='main.Team'),
        ),
        migrations.AlterField(
            model_name='team',
            name='coaches',
            field=models.ManyToManyField(blank=True, related_name='coaches', to='main.Member'),
        ),
        migrations.AlterField(
            model_name='team',
            name='media',
            field=models.ImageField(blank=True, upload_to='Team Media'),
        ),
    ]
