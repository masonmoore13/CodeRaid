# Generated by Django 3.2 on 2022-03-15 18:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_user_is_verified'),
        ('main', '0013_alter_relationship_user2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationship',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='user1', to='accounts.userprofile'),
        ),
    ]
