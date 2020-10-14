# Generated by Django 3.0.6 on 2020-07-27 16:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0012_auto_20200727_1553'),
    ]

    operations = [
        migrations.CreateModel(
            name='Extra',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='Item_Instance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('special_request', models.TextField()),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Item')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Order')),
            ],
        ),
        migrations.CreateModel(
            name='Extra_Instance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Extra')),
                ('item_instance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Item_Instance')),
            ],
        ),
    ]