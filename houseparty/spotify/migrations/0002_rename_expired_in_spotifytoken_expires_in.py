# Generated by Django 4.2.8 on 2024-01-13 21:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("spotify", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="spotifytoken", old_name="expired_in", new_name="expires_in",
        ),
    ]