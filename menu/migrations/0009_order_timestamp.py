# Generated by Django 3.0.6 on 2020-07-19 03:24

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0008_remove_order_customer_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
