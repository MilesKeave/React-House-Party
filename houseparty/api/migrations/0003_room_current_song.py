# Generated by Django 4.2.8 on 2024-01-14 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_rename_vote_to_skip_room_votes_to_skip_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="room",
            name="current_song",
            field=models.CharField(max_length=50, null=True),
        ),
    ]
