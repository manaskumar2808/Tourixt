# Generated by Django 3.1.1 on 2020-09-29 16:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0002_comment_feed'),
        ('like', '0002_auto_20200926_0554'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='comment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='comment.comment'),
        ),
    ]
