# Generated by Django 2.2.7 on 2020-04-08 06:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='folder.Folder'),
        ),
    ]