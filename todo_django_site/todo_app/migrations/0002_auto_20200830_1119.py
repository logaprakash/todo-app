# Generated by Django 3.1 on 2020-08-30 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='bucket',
        ),
        migrations.AddField(
            model_name='todo',
            name='bucket_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
