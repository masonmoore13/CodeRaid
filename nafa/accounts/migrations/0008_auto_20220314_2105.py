# Generated by Django 3.2 on 2022-03-15 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_user_is_verified'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='achievements',
        ),
        migrations.RemoveField(
            model_name='user',
            name='address_line_1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='city',
        ),
        migrations.RemoveField(
            model_name='user',
            name='current_work',
        ),
        migrations.RemoveField(
            model_name='user',
            name='descriptions',
        ),
        migrations.RemoveField(
            model_name='user',
            name='has_contributions',
        ),
        migrations.RemoveField(
            model_name='user',
            name='have_paid_dues',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_verified',
        ),
        migrations.RemoveField(
            model_name='user',
            name='middle_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='state',
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
    ]
