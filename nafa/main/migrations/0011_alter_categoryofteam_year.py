# Generated by Django 3.2 on 2022-02-09 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_rename_members_contribution_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoryofteam',
            name='year',
            field=models.IntegerField(),
        ),
    ]
