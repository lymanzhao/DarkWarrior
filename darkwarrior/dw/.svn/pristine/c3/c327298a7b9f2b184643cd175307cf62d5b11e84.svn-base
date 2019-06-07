# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attachment_file',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.FileField(upload_to=b'attachment/file', verbose_name=b'\xe6\x96\x87\xe4\xbb\xb6\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=500, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('owner_comment', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe8\xaf\x84\xe8\xae\xbaid', blank=True)),
            ],
            options={
                'verbose_name': '\u6587\u4ef6\u9644\u4ef6',
                'verbose_name_plural': '\u6587\u4ef6\u9644\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Attachment_image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.ImageField(upload_to=b'attachment/imges', verbose_name=b'\xe5\x9b\xbe\xe7\x89\x87\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=500, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('owner_comment', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe8\xaf\x84\xe8\xae\xbaid', blank=True)),
            ],
            options={
                'verbose_name': '\u56fe\u7247\u9644\u4ef6',
                'verbose_name_plural': '\u56fe\u7247\u9644\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Attachment_video',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.FileField(upload_to=b'attachment/video', verbose_name=b'\xe8\xa7\x86\xe9\xa2\x91\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=500, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('owner_comment', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe8\xaf\x84\xe8\xae\xbaid', blank=True)),
            ],
            options={
                'verbose_name': '\u89c6\u9891\u9644\u4ef6',
                'verbose_name_plural': '\u89c6\u9891\u9644\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe5\xa7\x93\xe5\x90\x8d')),
                ('department', models.CharField(max_length=50, verbose_name=b'\xe9\x83\xa8\xe9\x97\xa8')),
                ('clock_in', models.DateTimeField(verbose_name=b'\xe4\xb8\x8a\xe7\x8f\xad\xe6\x97\xb6\xe9\x97\xb4')),
                ('clock_out', models.DateTimeField(verbose_name=b'\xe4\xb8\x8b\xe7\x8f\xad\xe6\x97\xb6\xe9\x97\xb4')),
                ('date', models.DateField(default=datetime.date(2016, 11, 15), verbose_name=b'\xe6\x97\xa5\xe6\x9c\x9f')),
                ('owner_project', models.CharField(max_length=50, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae')),
            ],
            options={
                'verbose_name': '\u8003\u52e4',
                'verbose_name_plural': '\u8003\u52e4',
            },
        ),
        migrations.CreateModel(
            name='Base_permission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('view_name', models.CharField(max_length=50, verbose_name=b'views\xe5\x90\x8d\xe7\xa7\xb0', blank=True)),
                ('description', models.CharField(max_length=50, verbose_name=b'\xe6\x9d\x83\xe9\x99\x90\xe6\x8f\x8f\xe8\xbf\xb0', blank=True)),
            ],
            options={
                'verbose_name_plural': '\u57fa\u7840\u6743\u9650',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField(verbose_name=b'\xe8\xaf\x84\xe8\xae\xba\xe5\x86\x85\xe5\xae\xb9')),
                ('author', models.CharField(max_length=50, verbose_name=b'\xe5\x9b\x9e\xe5\xa4\x8d\xe4\xba\xba', blank=True)),
                ('at_people', models.CharField(max_length=50, verbose_name=b'@\xe4\xba\xba', blank=True)),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe8\xaf\x84\xe8\xae\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('parent_id', models.CharField(default=0, max_length=20, verbose_name=b'\xe7\x88\xb6id')),
            ],
            options={
                'verbose_name': '\u8bc4\u8bba',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u8bc4\u8bba',
            },
        ),
        migrations.CreateModel(
            name='Company_name',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe5\x85\xac\xe5\x8f\xb8\xe5\x90\x8d\xe7\xa7\xb0')),
                ('time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 393711), verbose_name=b'\xe6\x9b\xb4\xe6\x96\xb0\xe6\x97\xb6\xe9\x97\xb4')),
                ('owner_project', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
            ],
            options={
                'verbose_name': '\u516c\u53f8\u540d\u79f0',
                'verbose_name_plural': '\u516c\u53f8\u540d\u79f0',
            },
        ),
        migrations.CreateModel(
            name='CompanyDepartment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('company', models.CharField(max_length=50, verbose_name=b'\xe5\x85\xac\xe5\x8f\xb8')),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe9\x83\xa8\xe9\x97\xa8')),
                ('owner_project', models.CharField(max_length=50, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae')),
                ('create_time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 391224))),
            ],
            options={
                'verbose_name': '\u516c\u53f8\u90e8\u95e8',
                'verbose_name_plural': '\u516c\u53f8\u90e8\u95e8',
            },
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name=b'\xe7\xbb\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('description', models.CharField(max_length=500, verbose_name=b'\xe7\xbb\x84\xe4\xbb\xb6\xe6\x8f\x8f\xe8\xbf\xb0')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
                ('default', models.BooleanField(default=False, verbose_name=b'\xe9\xbb\x98\xe8\xae\xa4\xe9\x80\x89\xe9\xa1\xb9')),
            ],
            options={
                'verbose_name': '\u7ec4\u4ef6',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u7ec4\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Gantt_links',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('source', models.IntegerField(verbose_name=b'\xe6\x9d\xa5\xe6\xba\x90')),
                ('target', models.IntegerField(verbose_name=b'\xe7\x9b\xae\xe6\xa0\x87')),
                ('type', models.CharField(max_length=20, verbose_name=b'\xe7\xb1\xbb\xe5\x9e\x8b')),
            ],
            options={
                'verbose_name_plural': '\u7518\u7279\u94fe\u63a5',
            },
        ),
        migrations.CreateModel(
            name='Gantt_type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gantt_color', models.CharField(max_length=20, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa0\x8f\xe8\x83\x8c\xe6\x99\xaf\xe8\x89\xb2', blank=True)),
                ('gantt_textColor', models.CharField(max_length=20, verbose_name=b'\xe6\x96\x87\xe6\x9c\xac\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
                ('gantt_progressColor', models.CharField(max_length=20, verbose_name=b'\xe8\xbf\x9b\xe5\xba\xa6\xe6\x9d\xa1\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
            ],
            options={
                'verbose_name_plural': '\u7518\u7279\u56fe\u6837\u5f0f',
            },
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=50, verbose_name=b'\xe5\x90\x8d\xe7\xa7\xb0')),
                ('owner_project_id', models.CharField(default=0, max_length=10, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid')),
            ],
            options={
                'verbose_name': '\u7ec4',
                'verbose_name_plural': '\u7ec4',
            },
        ),
        migrations.CreateModel(
            name='Login_title',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100, verbose_name=b'\xe7\x99\xbb\xe9\x99\x86\xe9\xa1\xb5\xe9\x9d\xa2\xe6\xa0\x87\xe9\xa2\x98')),
                ('time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 394553), verbose_name=b'\xe6\x9b\xb4\xe6\x96\xb0\xe6\x97\xb6\xe9\x97\xb4')),
                ('owner_project', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
            ],
            options={
                'verbose_name': '\u767b\u9646\u9875\u9762\u6807\u9898',
                'verbose_name_plural': '\u767b\u9646\u9875\u9762\u6807\u9898',
            },
        ),
        migrations.CreateModel(
            name='Logo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('logo', models.ImageField(upload_to=b'project_logo', verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe5\x85\xa8\xe5\xb1\x80logo')),
            ],
            options={
                'verbose_name_plural': '\u9879\u76ee\u5168\u5c40LOGO',
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name=b'\xe6\xb6\x88\xe6\x81\xaf\xe6\xa0\x87\xe9\xa2\x98')),
                ('classify', models.CharField(max_length=20, verbose_name=b'\xe6\xb6\x88\xe6\x81\xaf\xe5\x88\x86\xe7\xb1\xbb')),
                ('promulgator', models.CharField(max_length=20, verbose_name=b'\xe5\x8f\x91\xe5\xb8\x83\xe8\x80\x85')),
                ('comment_id', models.CharField(default=0, max_length=20, verbose_name=b'\xe8\xaf\x84\xe8\xae\xbaID')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x8f\x91\xe5\xb8\x83\xe6\x97\xb6\xe9\x97\xb4')),
                ('status', models.BooleanField(default=False, verbose_name=b'\xe6\xb6\x88\xe6\x81\xaf\xe7\x8a\xb6\xe6\x80\x81')),
            ],
            options={
                'verbose_name_plural': '\u6d88\u606f\u5217\u8868',
            },
        ),
        migrations.CreateModel(
            name='Milestone',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe9\x87\x8c\xe7\xa8\x8b\xe7\xa2\x91\xe5\x90\x8d\xe7\xa7\xb0')),
                ('due', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 397682), verbose_name=b'\xe9\xa2\x84\xe6\x9c\x9f\xe5\xae\x8c\xe6\x88\x90\xe6\x97\xb6\xe9\x97\xb4')),
                ('description', models.CharField(max_length=500, verbose_name=b'\xe9\x87\x8c\xe7\xa8\x8b\xe7\xa2\x91\xe6\x8f\x8f\xe8\xbf\xb0')),
                ('milestone_status', models.CharField(default=b'\xe8\xbf\x9b\xe8\xa1\x8c\xe4\xb8\xad', max_length=50, verbose_name=b'\xe9\x87\x8c\xe7\xa8\x8b\xe7\xa2\x91\xe7\x8a\xb6\xe6\x80\x81')),
                ('complete_time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 397762), verbose_name=b'\xe5\xae\x9e\xe9\x99\x85\xe5\xae\x8c\xe6\x88\x90\xe6\x97\xb6\xe9\x97\xb4')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
                ('default', models.BooleanField(default=False, verbose_name=b'\xe9\xbb\x98\xe8\xae\xa4\xe9\x80\x89\xe9\xa1\xb9')),
            ],
            options={
                'verbose_name': '\u91cc\u7a0b\u7891',
                'verbose_name_plural': '\u91cc\u7a0b\u7891',
            },
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('project_id', models.CharField(default=0, max_length=5, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', blank=True)),
                ('view_name', models.CharField(max_length=50, verbose_name=b'views\xe5\x90\x8d\xe7\xa7\xb0', blank=True)),
                ('label_control', models.CharField(max_length=50, verbose_name=b'\xe6\x8c\x89\xe9\x92\xae\xe6\x9d\x83\xe9\x99\x90', blank=True)),
                ('name', models.CharField(max_length=30, verbose_name=b'\xe6\x9d\x83\xe9\x99\x90\xe5\x90\x8d\xe7\xa7\xb0', blank=True)),
                ('description', models.CharField(max_length=50, verbose_name=b'\xe6\x9d\x83\xe9\x99\x90\xe6\x8f\x8f\xe8\xbf\xb0', blank=True)),
            ],
            options={
                'verbose_name': '\u6743\u9650',
                'verbose_name_plural': '\u6743\u9650\u5217\u8868',
            },
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe4\xbc\x98\xe5\x85\x88\xe7\xba\xa7\xe5\x90\x8d\xe7\xa7\xb0')),
                ('value', models.IntegerField(default=0, verbose_name=b'\xe4\xbc\x98\xe5\x85\x88\xe7\xba\xa7\xe6\x8e\x92\xe5\xba\x8f')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
                ('color', models.CharField(default=b'5B9BE0', max_length=20, verbose_name=b'\xe8\x83\x8c\xe6\x99\xaf\xe8\x89\xb2', blank=True)),
                ('textColor', models.CharField(default=b'ffffff', max_length=20, verbose_name=b'\xe5\xad\x97\xe4\xbd\x93\xe8\x89\xb2', blank=True)),
                ('default', models.BooleanField(default=False, verbose_name=b'\xe9\xbb\x98\xe8\xae\xa4\xe9\x80\x89\xe9\xa1\xb9')),
            ],
            options={
                'ordering': ['value'],
                'verbose_name': '\u4efb\u52a1\u5355\u4f18\u5148\u7ea7',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u4f18\u5148\u7ea7',
            },
        ),
        migrations.CreateModel(
            name='Production_process',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe5\x90\x8d\xe7\xa7\xb0', blank=True)),
                ('grade', models.CharField(max_length=50, verbose_name=b'\xe7\xad\x89\xe7\xba\xa7', blank=True)),
                ('progress', models.CharField(default=0, max_length=50, verbose_name=b'\xe8\xbf\x9b\xe5\xba\xa6', blank=True)),
                ('verifier', models.CharField(max_length=50, verbose_name=b'\xe5\xae\xa1\xe6\xa0\xb8\xe4\xba\xba', blank=True)),
                ('owner', models.CharField(max_length=100, verbose_name=b'\xe4\xba\xba\xe5\x91\x98', blank=True)),
                ('owner_task', models.CharField(max_length=50, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95id', blank=True)),
            ],
            options={
                'verbose_name_plural': '\u5236\u4f5c\u6d41\u7a0b',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('project_name', models.CharField(max_length=100, verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe5\x90\x8d\xe7\xa7\xb0')),
                ('project_logo', models.ImageField(upload_to=b'project_logo', verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xaelogo', blank=True)),
                ('project_description', models.CharField(max_length=2000, verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe6\x8f\x8f\xe8\xbf\xb0')),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('due_time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 409221), verbose_name=b'\xe9\xa2\x84\xe8\xae\xa1\xe5\xae\x8c\xe6\x88\x90\xe6\x97\xb6\xe9\x97\xb4')),
                ('complete_time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 409249), verbose_name=b'\xe5\xae\x9e\xe9\x99\x85\xe5\xae\x8c\xe6\x88\x90\xe6\x97\xb6\xe9\x97\xb4')),
                ('project_status', models.CharField(default=b'\xe8\xbf\x9b\xe8\xa1\x8c\xe4\xb8\xad', max_length=50, verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe7\x8a\xb6\xe6\x80\x81')),
                ('is_archive', models.BooleanField(default=False, verbose_name=b'\xe6\x98\xaf\xe5\x90\xa6\xe5\xbd\x92\xe6\xa1\xa3')),
                ('is_check_permission', models.BooleanField(default=True, verbose_name=b'\xe6\x98\xaf\xe5\x90\xa6\xe6\xa3\x80\xe6\x9f\xa5\xe6\x9d\x83\xe9\x99\x90')),
                ('gantt_skin', models.CharField(max_length=50, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe7\x9a\xae\xe8\x82\xa4', blank=True)),
                ('gantt_task_height', models.IntegerField(default=28, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe9\xab\x98\xe5\xba\xa6', blank=True)),
                ('gantt_row_height', models.IntegerField(default=38, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa0\x8f\xe9\xab\x98\xe5\xba\xa6', blank=True)),
                ('scheduler_skin', models.CharField(max_length=100, verbose_name=b'\xe6\x97\xa5\xe5\x8e\x86\xe7\x9a\xae\xe8\x82\xa4', blank=True)),
            ],
            options={
                'verbose_name': '\u9879\u76ee',
                'verbose_name_plural': '\u9879\u76ee',
            },
        ),
        migrations.CreateModel(
            name='Project_index',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('content', models.TextField(verbose_name=b'\xe5\x86\x85\xe5\xae\xb9')),
            ],
            options={
                'verbose_name_plural': '\u9879\u76ee\u9996\u9875',
            },
        ),
        migrations.CreateModel(
            name='Project_type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe7\xb1\xbb\xe5\x9e\x8b\xe5\x90\x8d\xe7\xa7\xb0')),
                ('creator', models.CharField(max_length=50, null=True, verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba', blank=True)),
                ('owner', models.CharField(default=0, max_length=30, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid')),
                ('gantt_skin', models.CharField(default=b'dhtmlxgantt_terrace.css', max_length=50, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe7\x9a\xae\xe8\x82\xa4', blank=True)),
                ('scheduler_skin', models.CharField(default=b'dhtmlxscheduler.css', max_length=100, verbose_name=b'\xe6\x97\xa5\xe5\x8e\x86\xe7\x9a\xae\xe8\x82\xa4', blank=True)),
                ('gantt_task_height', models.IntegerField(default=28, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe9\xab\x98\xe5\xba\xa6', blank=True)),
                ('gantt_row_height', models.IntegerField(default=38, verbose_name=b'\xe7\x94\x98\xe7\x89\xb9\xe5\x9b\xbe\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa0\x8f\xe9\xab\x98\xe5\xba\xa6', blank=True)),
                ('milestone', models.ManyToManyField(to='dw.Milestone', verbose_name=b'\xe9\x87\x8c\xe7\xa8\x8b\xe7\xa2\x91\xe5\x90\x8d\xe7\xa7\xb0')),
                ('task_component', models.ManyToManyField(to='dw.Component', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\xbb\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('task_priority', models.ManyToManyField(to='dw.Priority', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe4\xbc\x98\xe5\x85\x88\xe7\xba\xa7\xe5\x90\x8d\xe7\xa7\xb0')),
            ],
            options={
                'verbose_name_plural': '\u9879\u76ee\u7c7b\u578b',
            },
        ),
        migrations.CreateModel(
            name='Project_type_import',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.FileField(upload_to=b'project_type_import', verbose_name=b'\xe6\x96\x87\xe4\xbb\xb6\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=500, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('author', models.CharField(max_length=50, verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85')),
                ('example', models.BooleanField(default=False, verbose_name=b'\xe4\xbe\x8b\xe5\xad\x90')),
            ],
            options={
                'verbose_name_plural': '\u9879\u76ee\u7c7b\u578b\u5bfc\u5165',
            },
        ),
        migrations.CreateModel(
            name='Repository',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=200, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe5\x90\x8d\xe7\xa7\xb0')),
                ('description', models.TextField(null=True, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe8\xaf\xb4\xe6\x98\x8e', blank=True)),
                ('creator', models.CharField(max_length=200, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba')),
            ],
            options={
                'verbose_name_plural': '\u6e90\u7801\u7248\u672c\u5e93',
            },
        ),
        migrations.CreateModel(
            name='RepositoryUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=200, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('passwd', models.CharField(max_length=200, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe5\xaf\x86\xe7\xa0\x81')),
            ],
            options={
                'verbose_name_plural': '\u7248\u672c\u5e93\u7528\u6237',
            },
        ),
        migrations.CreateModel(
            name='Scheduler_type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('scheduler_color', models.CharField(max_length=100, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe8\x83\x8c\xe6\x99\xaf\xe8\x89\xb2', blank=True)),
                ('scheduler_text_color', models.CharField(max_length=100, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\x96\x87\xe6\x9c\xac\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
                ('owner_project', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project')),
            ],
            options={
                'verbose_name': '\u65e5\u5386\u6837\u5f0f',
                'verbose_name_plural': '\u65e5\u5386\u6837\u5f0f',
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name=b'\xe7\x8a\xb6\xe6\x80\x81\xe5\x90\x8d\xe7\xa7\xb0')),
                ('value', models.IntegerField(default=0, verbose_name=b'\xe7\x8a\xb6\xe6\x80\x81\xe6\x8e\x92\xe5\xba\x8f')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
            ],
            options={
                'ordering': ['value'],
                'verbose_name': '\u4efb\u52a1\u5355\u72b6\u6001',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u72b6\u6001',
            },
        ),
        migrations.CreateModel(
            name='Task_team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name=b'\xe5\x9b\xa2\xe9\x98\x9f\xe5\x90\x8d\xe7\xa7\xb0')),
                ('team_logo', models.FileField(upload_to=b'attachment/team_logo', verbose_name=b'\xe5\x9b\xa2\xe9\x98\x9flogo', blank=True)),
                ('introduction', models.CharField(max_length=140, verbose_name=b'\xe5\x9b\xa2\xe9\x98\x9f\xe7\xae\x80\xe4\xbb\x8b', blank=True)),
                ('create_time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 411551))),
                ('owner_project', models.CharField(default=0, max_length=20, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid')),
            ],
            options={
                'verbose_name_plural': '\u4efb\u52a1\u56e2\u961f',
            },
        ),
        migrations.CreateModel(
            name='Taskgrade',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe7\xad\x89\xe7\xba\xa7\xe5\x90\x8d\xe7\xa7\xb0')),
                ('description', models.TextField(verbose_name=b'\xe7\xad\x89\xe7\xba\xa7\xe8\xaf\xb4\xe6\x98\x8e')),
                ('owner_project', models.CharField(default=0, max_length=50, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid')),
            ],
            options={
                'verbose_name_plural': '\u4efb\u52a1\u7b49\u7ea7',
            },
        ),
        migrations.CreateModel(
            name='TaskList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200, verbose_name=b'\xe6\xb8\x85\xe5\x8d\x95\xe6\xa0\x87\xe9\xa2\x98')),
                ('start_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 435628), verbose_name=b'\xe5\xbc\x80\xe5\xa7\x8b\xe6\x97\xb6\xe9\x97\xb4')),
                ('end_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 435661), verbose_name=b'\xe7\xbb\x93\xe6\x9d\x9f\xe6\x97\xb6\xe9\x97\xb4')),
                ('status', models.BooleanField(default=False, verbose_name=b'\xe5\xae\x8c\xe6\x88\x90')),
            ],
            options={
                'verbose_name_plural': '\u4efb\u52a1\u6e05\u5355',
            },
        ),
        migrations.CreateModel(
            name='Taskorder',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('display_id', models.CharField(max_length=b'100', verbose_name=b'\xe5\x89\x8d\xe7\xab\xaf\xe6\x98\xbe\xe7\xa4\xbaid', blank=True)),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('task_image', models.ImageField(upload_to=b'task_image', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe5\x9b\xbe\xe7\x89\x87', blank=True)),
                ('owner', models.CharField(max_length=50, verbose_name=b'\xe5\xb1\x9e\xe4\xb8\xbb', blank=True)),
                ('reporter', models.CharField(max_length=50, verbose_name=b'\xe5\xae\xa1\xe6\xa0\xb8\xe4\xba\xba', blank=True)),
                ('progress_task', models.IntegerField(default=0, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe8\xbf\x9b\xe5\xba\xa6\xe7\x99\xbe\xe5\x88\x86\xe6\xaf\x94')),
                ('summary', models.CharField(max_length=100, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa6\x82\xe8\xbf\xb0')),
                ('description', models.TextField(max_length=500, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\x8f\x8f\xe8\xbf\xb0')),
                ('read_status', models.CharField(default=b'\xe6\x9c\xaa\xe8\xaf\xbb', max_length=20, verbose_name=b'\xe8\xaf\xbb\xe5\x8f\x96\xe7\x8a\xb6\xe6\x80\x81')),
                ('text', models.CharField(max_length=255, verbose_name=b'\xe5\x86\x85\xe5\xae\xb9', blank=True)),
                ('start_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 415390), verbose_name=b'\xe5\xae\x9e\xe9\x99\x85\xe8\xb5\xb7\xe5\xa7\x8b\xe6\x97\xb6\xe9\x97\xb4')),
                ('duration', models.FloatField(default=1, verbose_name=b'\xe5\xae\x9e\xe9\x99\x85\xe6\x8c\x81\xe7\xbb\xad\xe6\x97\xb6\xe9\x97\xb4')),
                ('end_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 415439), verbose_name=b'\xe5\xae\x9e\xe9\x99\x85\xe7\xbb\x93\xe6\x9d\x9f\xe6\x97\xb6\xe9\x97\xb4')),
                ('predict_start_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 415463), verbose_name=b'\xe9\xa2\x84\xe8\xae\xa1\xe8\xb5\xb7\xe5\xa7\x8b\xe6\x97\xb6\xe9\x97\xb4')),
                ('predict_duration', models.FloatField(default=1, verbose_name=b'\xe9\xa2\x84\xe8\xae\xa1\xe6\x8c\x81\xe7\xbb\xad\xe6\x97\xb6\xe9\x97\xb4')),
                ('predict_end_date', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 415502), verbose_name=b'\xe9\xa2\x84\xe8\xae\xa1\xe7\xbb\x93\xe6\x9d\x9f\xe6\x97\xb6\xe9\x97\xb4')),
                ('progress', models.FloatField(default=0, verbose_name=b'\xe8\xbf\x9b\xe5\xb1\x95')),
                ('sortorder', models.IntegerField(default=0, verbose_name=b'\xe6\x8e\x92\xe5\xba\x8f\xe6\xac\xa1\xe5\xba\x8f')),
                ('parent', models.IntegerField(default=0, verbose_name=b'\xe7\x88\xb6id')),
                ('storypoint', models.FloatField(default=0, verbose_name=b'\xe6\x95\x85\xe4\xba\x8b\xe7\x82\xb9')),
                ('color', models.CharField(max_length=20, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa0\x8f\xe8\x83\x8c\xe6\x99\xaf\xe8\x89\xb2', blank=True)),
                ('textColor', models.CharField(max_length=20, verbose_name=b'\xe6\x96\x87\xe6\x9c\xac\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
                ('progressColor', models.CharField(max_length=20, verbose_name=b'\xe8\xbf\x9b\xe5\xba\xa6\xe6\x9d\xa1\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
                ('time_length', models.IntegerField(default=0, verbose_name=b'\xe6\x97\xb6\xe9\x95\xbf(\xe5\xb8\xa7)', blank=True)),
                ('notes', models.CharField(max_length=500, verbose_name=b'\xe5\xa4\x87\xe6\xb3\xa8', blank=True)),
                ('grade', models.CharField(max_length=100, verbose_name=b'\xe7\xad\x89\xe7\xba\xa7', blank=True)),
                ('roll', models.CharField(max_length=500, verbose_name=b'\xe5\x8d\xb7', blank=True)),
                ('scene', models.IntegerField(default=0, verbose_name=b'\xe5\x9c\xba\xe5\x8f\xb7', blank=True)),
                ('take', models.IntegerField(default=0, verbose_name=b'\xe6\xac\xa1\xe6\x95\xb0', blank=True)),
                ('component', models.ForeignKey(verbose_name=b'\xe7\xbb\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0', blank=True, to='dw.Component', null=True)),
            ],
            options={
                'verbose_name': '\u4efb\u52a1\u5355',
                'verbose_name_plural': '\u4efb\u52a1\u5355',
            },
        ),
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe6\xa8\xa1\xe7\x89\x88\xe5\x90\x8d\xe7\xa7\xb0')),
                ('display', models.CharField(max_length=50, verbose_name=b'\xe6\xa8\xa1\xe7\x89\x88\xe6\x98\xbe\xe7\xa4\xba\xe5\x90\x8d\xe7\xa7\xb0')),
                ('description', models.TextField(verbose_name=b'\xe6\xa8\xa1\xe7\x89\x88\xe8\xaf\xb4\xe6\x98\x8e')),
                ('owner_project', models.CharField(default=0, max_length=50, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid')),
            ],
            options={
                'verbose_name_plural': '\u9879\u76ee\u6a21\u7248',
            },
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\xb1\xbb\xe5\x9e\x8b\xe5\x90\x8d\xe7\xa7\xb0')),
                ('value', models.IntegerField(default=0, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\xb1\xbb\xe5\x9e\x8b\xe6\x8e\x92\xe5\xba\x8f')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
                ('color', models.CharField(default=b'5B9BE0', max_length=20, verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe6\xa0\x8f\xe8\x83\x8c\xe6\x99\xaf\xe8\x89\xb2', blank=True)),
                ('textColor', models.CharField(default=b'ffffff', max_length=20, verbose_name=b'\xe6\x96\x87\xe6\x9c\xac\xe9\xa2\x9c\xe8\x89\xb2', blank=True)),
                ('progressColor', models.CharField(default=38, max_length=20, verbose_name=b'\xe8\xbf\x9b\xe5\xba\xa6\xe6\x9d\xa1\xe9\x80\x8f\xe6\x98\x8e\xe5\xba\xa6', blank=True)),
                ('default', models.BooleanField(default=False, verbose_name=b'\xe9\xbb\x98\xe8\xae\xa4\xe9\x80\x89\xe9\xa1\xb9')),
            ],
            options={
                'ordering': ['value'],
                'verbose_name': '\u4efb\u52a1\u5355\u7c7b\u578b',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u7c7b\u578b',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(unique=True, max_length=50, verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe5\x90\x8d')),
                ('password', models.CharField(max_length=100, verbose_name=b'\xe5\xaf\x86\xe7\xa0\x81')),
                ('last_login', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 387761), null=True, verbose_name=b'\xe6\x9c\x80\xe5\x90\x8e\xe7\x99\xbb\xe5\xbd\x95\xe6\x97\xb6\xe9\x97\xb4', blank=True)),
                ('is_superuser', models.BooleanField(default=False, verbose_name=b'\xe6\x98\xaf\xe5\x90\xa6\xe8\xb6\x85\xe7\xba\xa7\xe7\xae\xa1\xe7\x90\x86')),
                ('name', models.CharField(max_length=100, verbose_name=b'\xe5\xa7\x93\xe5\x90\x8d', blank=True)),
                ('email', models.EmailField(max_length=254, verbose_name=b'\xe9\x82\xae\xe7\xae\xb1\xe5\x9c\xb0\xe5\x9d\x80')),
                ('is_staff', models.BooleanField(default=False, verbose_name=b'\xe6\x98\xaf\xe5\x90\xa6\xe8\x81\x8c\xe5\x91\x98')),
                ('number', models.CharField(max_length=50, verbose_name=b'\xe7\xbc\x96\xe5\x8f\xb7', blank=True)),
                ('entry_time', models.DateField(default=datetime.date(2016, 11, 15), verbose_name=b'\xe5\x85\xa5\xe8\x81\x8c\xe6\x97\xb6\xe9\x97\xb4')),
                ('is_active', models.BooleanField(default=True, verbose_name=b'\xe6\x98\xaf\xe5\x90\xa6\xe6\xbf\x80\xe6\xb4\xbb')),
                ('date_joined', models.DateTimeField(auto_now=True, verbose_name=b'\xe6\xb3\xa8\xe5\x86\x8c\xe6\x97\xb6\xe9\x97\xb4')),
                ('head_portrait', models.ImageField(upload_to=b'user/head_portrait', verbose_name=b'\xe5\xa4\xb4\xe5\x83\x8f', blank=True)),
                ('gender', models.CharField(max_length=20, verbose_name=b'\xe6\x80\xa7\xe5\x88\xab', blank=True)),
                ('position', models.CharField(max_length=50, verbose_name=b'\xe8\x81\x8c\xe4\xbd\x8d', blank=True)),
                ('address', models.CharField(max_length=200, verbose_name=b'\xe5\xae\xb6\xe5\xba\xad\xe4\xbd\x8f\xe5\x9d\x80', blank=True)),
                ('phone', models.CharField(max_length=50, verbose_name=b'\xe7\x94\xb5\xe8\xaf\x9d\xe5\x8f\xb7\xe7\xa0\x81', blank=True)),
                ('group', models.ManyToManyField(default=(1,), to='dw.Group', verbose_name=b'\xe7\xbb\x84', blank=True)),
                ('user_permission', models.ManyToManyField(to='dw.Permission', verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe6\x9d\x83\xe9\x99\x90', blank=True)),
            ],
            options={
                'verbose_name': '\u7528\u6237',
                'verbose_name_plural': '\u7528\u6237',
            },
        ),
        migrations.CreateModel(
            name='Versions',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\x90\x8d\xe7\xa7\xb0')),
                ('time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x8f\x91\xe5\xb8\x83\xe6\x97\xb6\xe9\x97\xb4')),
                ('description', models.CharField(max_length=500, verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe6\x8f\x8f\xe8\xbf\xb0')),
                ('owner_project', models.CharField(default=0, max_length=20, null=True, verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', blank=True)),
                ('default', models.BooleanField(default=False, verbose_name=b'\xe9\xbb\x98\xe8\xae\xa4\xe9\x80\x89\xe9\xa1\xb9')),
            ],
            options={
                'verbose_name': '\u7248\u672c',
                'verbose_name_plural': '\u4efb\u52a1\u5355\u7248\u672c',
            },
        ),
        migrations.CreateModel(
            name='Wiki',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('create_time', models.DateTimeField(auto_now=True, verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe6\x97\xb6\xe9\x97\xb4')),
                ('title', models.CharField(max_length=200, verbose_name=b'\xe6\xa0\x87\xe9\xa2\x98')),
                ('content', models.TextField(verbose_name=b'\xe5\x86\x85\xe5\xae\xb9')),
                ('creator', models.ForeignKey(verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba', to='dw.User')),
                ('owner', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project')),
            ],
            options={
                'verbose_name': '\u7ef4\u57fa',
                'verbose_name_plural': '\u7ef4\u57fa',
            },
        ),
        migrations.CreateModel(
            name='Wiki_attachment_file',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.FileField(upload_to=b'attachment/wiki/file', verbose_name=b'\xe6\x96\x87\xe4\xbb\xb6\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 426410), verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('author', models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User')),
                ('owner', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe7\xbb\xb4\xe5\x9f\xba', to='dw.Wiki')),
                ('owner_project', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project')),
            ],
            options={
                'verbose_name': '\u6587\u4ef6\u9644\u4ef6',
                'verbose_name_plural': '\u7ef4\u57fa\u6587\u4ef6\u9644\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Wiki_attachment_image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.ImageField(upload_to=b'attachment/wiki/imges', verbose_name=b'\xe5\x9b\xbe\xe7\x89\x87\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 428648), verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('author', models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User')),
                ('owner', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe7\xbb\xb4\xe5\x9f\xba', to='dw.Wiki')),
                ('owner_project', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project')),
            ],
            options={
                'verbose_name': '\u56fe\u7247\u9644\u4ef6',
                'verbose_name_plural': '\u7ef4\u57fa\u56fe\u7247\u9644\u4ef6',
            },
        ),
        migrations.CreateModel(
            name='Wiki_attachment_video',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.FileField(upload_to=b'attachment/wiki/video', verbose_name=b'\xe8\xa7\x86\xe9\xa2\x91\xe5\xad\x98\xe6\x94\xbe\xe5\x9c\xb0\xe5\x9d\x80')),
                ('time', models.DateTimeField(default=datetime.datetime(2016, 11, 15, 14, 4, 7, 427633), verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe6\x97\xb6\xe9\x97\xb4')),
                ('name', models.CharField(max_length=50, verbose_name=b'\xe9\x99\x84\xe4\xbb\xb6\xe5\x90\x8d\xe7\xa7\xb0')),
                ('author', models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User')),
                ('owner', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe7\xbb\xb4\xe5\x9f\xba', to='dw.Wiki')),
                ('owner_project', models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project')),
            ],
            options={
                'verbose_name': '\u89c6\u9891\u9644\u4ef6',
                'verbose_name_plural': '\u7ef4\u57fa\u89c6\u9891\u9644\u4ef6',
            },
        ),
        migrations.AddField(
            model_name='taskorder',
            name='creator',
            field=models.ForeignKey(verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba', to_field=b'username', blank=True, to='dw.User'),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='milestone',
            field=models.ForeignKey(verbose_name=b'\xe9\x87\x8c\xe7\xa8\x8b\xe7\xa2\x91', blank=True, to='dw.Milestone', null=True),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='priority',
            field=models.ForeignKey(verbose_name=b'\xe4\xbc\x98\xe5\x85\x88\xe7\xba\xa7', blank=True, to='dw.Priority', null=True),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='production_process',
            field=models.ManyToManyField(to='dw.Production_process', verbose_name=b'\xe5\x88\xb6\xe4\xbd\x9c\xe6\xb5\x81\xe7\xa8\x8b', blank=True),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='status',
            field=models.ForeignKey(verbose_name=b'\xe7\x8a\xb6\xe6\x80\x81', to='dw.Status'),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='task_team',
            field=models.ManyToManyField(to='dw.Task_team', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x9b\xa2\xe9\x98\x9f', blank=True),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='type',
            field=models.ForeignKey(verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe7\xb1\xbb\xe5\x9e\x8b', to='dw.Type'),
        ),
        migrations.AddField(
            model_name='taskorder',
            name='version',
            field=models.ForeignKey(verbose_name=b'\xe7\x89\x88\xe6\x9c\xac', blank=True, to='dw.Versions', null=True),
        ),
        migrations.AddField(
            model_name='tasklist',
            name='onwer_task',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='task_team',
            name='member',
            field=models.ManyToManyField(to='dw.User', verbose_name=b'\xe9\x98\x9f\xe5\x91\x98'),
        ),
        migrations.AddField(
            model_name='scheduler_type',
            name='type',
            field=models.ForeignKey(verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\xb1\xbb\xe5\x9e\x8b', to='dw.Type'),
        ),
        migrations.AddField(
            model_name='repositoryuser',
            name='owner_user',
            field=models.ForeignKey(verbose_name=b'\xe5\xb7\xb2\xe6\xb3\xa8\xe5\x86\x8c\xe7\xb3\xbb\xe7\xbb\x9f\xe7\x94\xa8\xe6\x88\xb7', blank=True, to='dw.User', null=True),
        ),
        migrations.AddField(
            model_name='repositoryuser',
            name='project_id',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeID', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='repositoryuser',
            name='repository_name',
            field=models.ForeignKey(verbose_name=b'\xe7\x89\x88\xe6\x9c\xac\xe5\xba\x93\xe5\x90\x8d', to='dw.Repository'),
        ),
        migrations.AddField(
            model_name='repository',
            name='owner_task',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95', blank=True, to='dw.Taskorder', null=True),
        ),
        migrations.AddField(
            model_name='repository',
            name='owner_user',
            field=models.ManyToManyField(to='dw.User', verbose_name=b'\xe5\xb7\xb2\xe6\xb3\xa8\xe5\x86\x8c\xe7\xb3\xbb\xe7\xbb\x9f\xe7\x94\xa8\xe6\x88\xb7', blank=True),
        ),
        migrations.AddField(
            model_name='repository',
            name='project_id',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeID', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='project_type',
            name='task_status',
            field=models.ManyToManyField(to='dw.Status', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\x8a\xb6\xe6\x80\x81\xe5\x90\x8d\xe7\xa7\xb0'),
        ),
        migrations.AddField(
            model_name='project_type',
            name='task_type',
            field=models.ManyToManyField(to='dw.Type', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\xb1\xbb\xe5\x9e\x8b\xe5\x90\x8d\xe7\xa7\xb0'),
        ),
        migrations.AddField(
            model_name='project_type',
            name='task_version',
            field=models.ManyToManyField(to='dw.Versions', verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95\xe7\x89\x88\xe6\x9c\xac\xe5\x90\x8d\xe7\xa7\xb0'),
        ),
        migrations.AddField(
            model_name='project_index',
            name='creator',
            field=models.ForeignKey(verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba', to='dw.User'),
        ),
        migrations.AddField(
            model_name='project_index',
            name='owner',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='project',
            name='creator',
            field=models.ForeignKey(to='dw.User', to_field=b'username', verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba'),
        ),
        migrations.AddField(
            model_name='project',
            name='project_type',
            field=models.ForeignKey(verbose_name=b'\xe9\xa1\xb9\xe7\x9b\xae\xe7\xb1\xbb\xe5\x9e\x8b', to='dw.Project_type'),
        ),
        migrations.AddField(
            model_name='message',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='message',
            name='owner_task',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='message',
            name='reminder',
            field=models.ForeignKey(verbose_name=b'\xe6\x8f\x90\xe7\xa4\xba\xe4\xba\xba', to='dw.User'),
        ),
        migrations.AddField(
            model_name='logo',
            name='creator',
            field=models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User'),
        ),
        migrations.AddField(
            model_name='login_title',
            name='update_user',
            field=models.ForeignKey(to='dw.User', to_field=b'username', verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba'),
        ),
        migrations.AddField(
            model_name='group',
            name='group_permission',
            field=models.ManyToManyField(to='dw.Permission', verbose_name=b'\xe7\x94\xa8\xe6\x88\xb7\xe6\x9d\x83\xe9\x99\x90', blank=True),
        ),
        migrations.AddField(
            model_name='gantt_type',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xae', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='gantt_type',
            name='type',
            field=models.ForeignKey(verbose_name=b'\xe4\xbb\xbb\xe5\x8a\xa1\xe7\xb1\xbb\xe5\x9e\x8b', to='dw.Type'),
        ),
        migrations.AddField(
            model_name='companydepartment',
            name='personnel',
            field=models.ManyToManyField(to='dw.User', verbose_name=b'\xe5\xa7\x93\xe5\x90\x8d'),
        ),
        migrations.AddField(
            model_name='company_name',
            name='update_user',
            field=models.ForeignKey(to='dw.User', to_field=b'username', verbose_name=b'\xe5\x88\x9b\xe5\xbb\xba\xe4\xba\xba'),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(verbose_name=b'\xe8\xaf\x84\xe8\xae\xba\xe8\x80\x85', to='dw.User'),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner_task',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='attachment_video',
            name='author',
            field=models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User'),
        ),
        migrations.AddField(
            model_name='attachment_video',
            name='owner',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95id', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='attachment_video',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='attachment_image',
            name='author',
            field=models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User'),
        ),
        migrations.AddField(
            model_name='attachment_image',
            name='owner',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95id', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='attachment_image',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', to='dw.Project'),
        ),
        migrations.AddField(
            model_name='attachment_file',
            name='author',
            field=models.ForeignKey(verbose_name=b'\xe4\xb8\x8a\xe4\xbc\xa0\xe8\x80\x85', to='dw.User'),
        ),
        migrations.AddField(
            model_name='attachment_file',
            name='owner',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe4\xbb\xbb\xe5\x8a\xa1\xe5\x8d\x95id', to='dw.Taskorder'),
        ),
        migrations.AddField(
            model_name='attachment_file',
            name='owner_project',
            field=models.ForeignKey(verbose_name=b'\xe6\x89\x80\xe5\xb1\x9e\xe9\xa1\xb9\xe7\x9b\xaeid', to='dw.Project'),
        ),
    ]
