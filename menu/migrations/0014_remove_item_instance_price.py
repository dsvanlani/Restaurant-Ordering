# Generated by Django 3.0.6 on 2020-07-27 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0013_extra_extra_instance_item_instance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item_instance',
            name='price',
        ),
    ]
