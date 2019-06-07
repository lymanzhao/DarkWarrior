# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='XMPPAccount',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('jid', models.CharField(max_length=300)),
                ('password', models.CharField(max_length=1024)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name=b'created')),
                ('updated', models.DateTimeField(null=True, verbose_name=b'updated', blank=True)),
                ('user', models.ForeignKey(related_name='xmpp', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='XMPPAutoJoin',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('jid', models.CharField(max_length=300)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name=b'created')),
                ('account', models.ForeignKey(related_name='auto_join', to='xmpp.XMPPAccount')),
            ],
        ),
    ]
