#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
from datetime import timedelta
from datetime import datetime,date
import time
#from django.contrib.auth.decorators import login_required
from darkwarrior.settings import MEDIA_ROOT,EMAIL_HOST_USER
from django.contrib.auth.hashers import make_password,check_password
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from decorator import *
import subprocess
from django.core.paginator import Paginator
import random,base64
import uuid
from task_content_views import create_task,movetask
import calendar
from permissions import user_permissions
import base64
from views import catch_kanban_Thumbnails,dynamic_loading_kanban,count_task_progress,data_filter


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_gantt(request, *args, **kwargs):
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    gantt_links = Gantt_links.objects.all()  # 甘特图关联

    global_manage = True

    gantt_tasks = Taskorder.objects.all().order_by('-time')
    task_num = gantt_tasks.count()
    if task_num == 0:
        height_num = 100
    elif task_num < 5:
        height_num = task_num * 100
    elif 5 <= task_num <= 10:
        height_num = task_num * 60
    elif 10 < task_num <= 50:
        height_num = task_num * 50
    elif 10 < task_num <= 100:
        height_num = task_num * 40
    else:
        height_num = task_num * 35.1


    return render_to_response('index/index_gantt.html', locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_calendar(request,*args,**kwargs):
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait
    if User.objects.get(username=user_now).is_superuser:
        admin = True

    global_manage = True


    tasks = Taskorder.objects.all().order_by('-time')

    calendar=[]

    for task in tasks:
        start_date=task.start_date
        end_date=task.end_date
        summary=task.summary
        color=task.type.color
        textColor=task.type.textColor
        calendar.append({'id':task.id,'text':summary,'start_date':start_date,'end_date':end_date,'color':color,'textColor':textColor})


    scheduler_css='dhtmlxscheduler_flat.css'
    scheduler_css_url='codebase/'+scheduler_css

    return render_to_response('index/index_calendar.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_report(request,*args,**kwargs):
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    global_manage = True
    tasks=Taskorder.objects.all().order_by('-time')
    if request.method=="POST":
        judge=request.POST.get('judge')
        if judge=="task_select":
            owner_select=request.POST.get('owner_select')
            if owner_select is not None and len(owner_select)>0:
                tasks = Taskorder.objects.filter(owner__contains=owner_select).order_by('priority')
            else:
                tasks = Taskorder.objects.all().order_by('-time')
    return render_to_response('index/index_report.html',locals())



