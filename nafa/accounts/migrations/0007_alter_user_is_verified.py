# Generated by Django 3.2 on 2022-03-13 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
