# Generated by Django 3.1 on 2020-08-30 11:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0002_auto_20200830_1119'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='bucket_id',
        ),
        migrations.AddField(
            model_name='todo',
            name='bucket',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='todo_app.bucket'),
            preserve_default=False,
        ),
    ]
