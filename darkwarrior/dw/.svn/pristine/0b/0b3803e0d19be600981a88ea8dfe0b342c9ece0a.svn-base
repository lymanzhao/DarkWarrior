#coding:utf-8

from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
import datetime
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
from django.views.decorators.cache import cache_page
import pytz

@checkCdkey
@login_required
@views_permission
def view_calendar(request,*args,**kwargs):
    project_archive = kwargs['project']          #项目判断
    url=kwargs['project_id']
    #id = kwargs['id']
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait
    if User.objects.get(username=user_now).is_superuser:
        admin = True
    project=Project.objects.get(id=url)
    for i in Scheduler_type.objects.filter(owner_project=project):
        Taskorder.objects.filter(type=i.type,owner_project=project).update(color=i.scheduler_color,textColor=i.scheduler_text_color)

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    project_type = project_archive.project_type
    milestones = project_type.milestone.all()
    prioritys = project_type.task_priority.all()
    statuss = project_type.task_status.all()
    components = project_type.task_component.all()
    types = project_type.task_type.all()
    versions = project_type.task_version.all()

    milestone_default = project_type.milestone.filter(owner_project=url, default=True)[0]
    priority_default = project_type.task_priority.filter(owner_project=url, default=True)[0]
    component_default = project_type.task_component.filter(owner_project=url, default=True)[0]
    type_default = project_type.task_type.filter(owner_project=url, default=True)[0]
    version_default = project_type.task_version.filter(owner_project=url, default=True)[0]

    calendar=[]
    if request.method == "GET":
        self = request.GET.get('self')
        #judge = request.GET.get('judge')
        if self=='self':
            get_form = """
             <form method="get" action=""   hidden='hidden'>
            <input type="submit" value="查看全部" id="all">
            </form>
            <a style='cursor:pointer;font-size:20px;' id='all_a' name='premise'><i class="fa fa-users" aria-hidden="true"></i></a>
            <script>
            document.getElementById('all_a').onclick = function(){
                document.getElementById('all').click();
             };
            </script>
             """
            task_owner=Taskorder.objects.filter(owner_project=project,owner=user_now)
            task_creator=Taskorder.objects.filter(owner_project=project, creator=user_now)
            task_reporter=Taskorder.objects.filter(owner_project=project,reporter=user_now)
            task=[task_creator,task_owner,task_reporter]
            for task_item in task:
                for t in task_item:
                    start_date=t.start_date
                    end_date=t.end_date
                    summary=t.summary
                    color=t.type.color
                    textColor=t.type.textColor
                    calendar.append({'id':t.id,'text':summary,'start_date':start_date,'end_date':end_date,'color':color,'textColor':textColor})


        else:
            get_form = '''
              <form method="get" action=""  hidden='hidden' >
             <input type="text" value="self" name="self" >
             <input type="submit" value="查看属于的我" id='self'>
             </form>
               <a style='cursor:pointer;font-size:20px;"' id='self_a' name='premise'><i class="fa fa-user" aria-hidden="true"></i></a>
              <script>
            document.getElementById('self_a').onclick = function(){
                document.getElementById('self').click();
             };
            </script>
            '''
            task=Taskorder.objects.filter(owner_project=project)
            for t in task:
                start_date=t.start_date
                end_date=t.end_date
                summary=t.summary
                color=t.type.color
                textColor=t.type.textColor
                calendar.append({'id':t.id,'text':summary,'start_date':start_date,'end_date':end_date,'color':color,'textColor':textColor})




    scheduler_css=Project.objects.get(id=url).scheduler_skin
    scheduler_css_url='codebase/'+scheduler_css

    return render_to_response('calendar.html',locals())


'''
@checkCdkey
@login_required
@views_permission
def modify_calendar(request,*args,**kwargs):
    project_archive = kwargs['project']          #项目判断
    url=kwargs['project_id']
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    if request.method=="POST":
        id=request.POST.get('id')
        start_date=request.POST.get('start_date')
        end_date=request.POST.get('end_date')

        task_start_date = datetime.strptime(start_date,'%Y/%m/%d %H:%M')
        task_end_date = datetime.strptime(end_date,'%Y/%m/%d %H:%M')
        duration_timestamip= int(time.mktime(time.strptime(end_date,'%Y/%m/%d %H:%M'))) - int(time.mktime(time.strptime(start_date,'%Y/%m/%d %H:%M')))
        duration = duration_timestamip / 86400

        if duration == 0:
            duration = 1
        tasks=Taskorder.objects.get(id=id)
        tasks.start_date=task_start_date
        tasks.end_date=task_end_date
        tasks.duration=duration
        tasks.save()
        return render_to_response('calendar.html',locals())


@checkCdkey
@login_required
@views_permission
def delete_calendar(request,*args,**kwargs):
    project_archive = kwargs['project']          #项目判断
    url=kwargs['project_id']
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    if request.method=="POST":
        id=request.POST.get('id')
        Taskorder.objects.get(id=id).delete()
    return render_to_response('calendar.html',locals())



@checkCdkey
@login_required
@views_permission
def create_calendar(request,*args,**kwargs):    #创建任务单
    project_archive = kwargs['project']          #项目判断
    url = kwargs['project_id']

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    project_type = project_archive.project_type
    milestones = project_type.milestone.all()
    prioritys = project_type.task_priority.all()
    statuss = project_type.task_status.all()
    components = project_type.task_component.all()
    types = project_type.task_type.all()
    versions = project_type.task_version.all()

    milestone_default = project_type.milestone.filter(owner_project=url, default=True)[0]
    priority_default = project_type.task_priority.filter(owner_project=url, default=True)[0]
    component_default = project_type.task_component.filter(owner_project=url, default=True)[0]
    type_default = project_type.task_type.filter(owner_project=url, default=True)[0]
    version_default = project_type.task_version.filter(owner_project=url, default=True)[0]


    start_date_Array = time.strptime(str(datetime.now()).split('.')[0], '%Y-%m-%d %H:%M:%S')
    now_date = time.strftime("%Y/%m/%d %H:%M", start_date_Array)

    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    #if User.objects.get(username=user_now).is_superuser:
    #    admin = True
    errors = []
    if request.method == 'POST':
        summary = request.POST.get('summary')
        description = request.POST.get('content')
        task_type = request.POST.get('type')
        milestone = request.POST.get('milestone')
        component = request.POST.get('component')
        priority = request.POST.get('priority')
        owner = request.POST.get('owner')
        version = request.POST.get('version')
        task_image = request.FILES.get('task_image')


        start_date = request.POST.get('start_date')
        text = request.POST.get('text')
        end_date = request.POST.get('end_date')
        story_point =request.POST.get('story_point')

        task_relevance = request.POST.get('relevance')
        task_id = request.POST.get('task_id')
        relevance_type = request.POST.get('relevance_type')

        task_start_date = datetime.strptime(start_date,'%Y/%m/%d %H:%M')
        task_end_date = datetime.strptime(end_date,'%Y/%m/%d %H:%M')


        duration_timestamip= int(time.mktime(time.strptime(end_date,'%Y/%m/%d %H:%M'))) - int(time.mktime(time.strptime(start_date,'%Y/%m/%d %H:%M')))
        duration = duration_timestamip / 86400

        type = Type.objects.get(id=task_type)
        component = Component.objects.get(id=component)
        priority = Priority.objects.get(id=priority)
        version = Versions.objects.get(id=version)
        milestone = Milestone.objects.get(id=milestone)
        creator = User.objects.get(username=user_now)
        owner_project = Project.objects.get(id=url)
        if task_image is not None:
            image = task_image.name.split('.')[-1]
        else:
            image = None

        #获取最后一个显示id
        task_num = Taskorder.objects.filter(owner_project=project_archive).count()
        if task_num == 0:
            display_id = 1
        else:
            display_id = Taskorder.objects.filter(owner_project=project_archive).order_by('-id')[0].display_id + 1

        if duration == 0:
            duration = 1

        if summary is not None and len(summary)>0:
            #if len(owner)>0:
            if image == 'tiff':
                errors.append('您上传的图片web不支持显示')
            elif start_date is not None and len(start_date)>0:
                if duration is not None and duration >=0:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,reporter=user_now,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date
                                                               , predict_start_date=task_start_date,
                                                               predict_duration=duration, predict_end_date=task_end_date)
                    else:
                        create_task = Taskorder(summary=summary,creator=creator,description=description,type=type,milestone=milestone,reporter=user_now,
                                                component=component,priority=priority,task_image=task_image,owner=owner,version=version,display_id=display_id,
                                                status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date
                                                , predict_start_date=task_start_date, predict_duration=duration,
                                                predict_end_date=task_end_date)
                        create_task.save()
                else:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,reporter=user_now,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date,display_id=display_id
                                                               , predict_start_date=task_start_date,
                                                               predict_duration=duration, predict_end_date=task_end_date)
                    else:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,reporter=user_now,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date
                                                               , predict_start_date=task_start_date,
                                                               predict_duration=duration, predict_end_date=task_end_date)

                id = Taskorder.objects.filter(creator=user_now).order_by('-id')[0].id

                #任务单关联
                if task_relevance == 'task_relevance':
                    if task_id is not None and len(task_id)>0:
                        #print relevance_type.split(',')[1]
                        Gantt_links.objects.create(source=id,target=task_id,type=relevance_type.split(',')[1])

            else:
                errors.append('请输入任务起始时间')

        else:
            errors.append('请输入任务单概述')
    return render_to_response('calendar.html',locals())

'''