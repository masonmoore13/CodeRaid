# Generated by Django 3.2 on 2022-02-27 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20220225_1646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='state',
            field=models.CharField(default='LA', max_length=50),
        ),
    ]
