# Generated by Django 3.0.6 on 2020-07-19 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0009_order_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='is_ready',
            field=models.BooleanField(default=False),
        ),
    ]
