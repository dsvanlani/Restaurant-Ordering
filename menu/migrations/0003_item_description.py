# Generated by Django 3.0.6 on 2020-07-15 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0002_item_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]