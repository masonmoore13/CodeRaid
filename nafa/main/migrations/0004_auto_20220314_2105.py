# Generated by Django 3.2 on 2022-03-15 02:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20220307_2216'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='relationship',
            name='user',
        ),
        migrations.RemoveField(
            model_name='relationship',
            name='user2',
        ),
    ]
