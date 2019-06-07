#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
import time
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
import xlrd
import pytz
from task_content_views import create_task,movetask


@checkCdkey
@login_required
@views_permission
def time_coord(request,*args,**kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']

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


    user_now = request.session.get('USERNAME', False)
    # if User.objects.get(username=user_now).is_superuser:
    #    admin = True


    task_type = type_default
    component = component_default
    priority = priority_default
    version = version_default

    creator = User.objects.get(username=user_now)
    owner_project = Project.objects.get(id=url)

    data = xlrd.open_workbook(r"/var/www/mrrytxb.xls",'r')
    table = data.sheets()[0]
    ncols = table.ncols
    nrows = table.nrows
    for rows in range(2, nrows):
        # print table.row_values(rows)
        display_id = int(table.row_values(rows)[0])
        summary = table.row_values(rows)[1]
        if type(table.row_values(rows)[3]) == float:
            time_length = int(table.row_values(rows)[3])
        else:
            time_length = 0
        description = table.row_values(rows)[4]
        notes = table.row_values(rows)[23]
        #print display_id, summary, time_length, description, notes


        create_task = Taskorder.objects.create(summary=summary, creator=creator,
                                                                   description=description, type=task_type, milestone=milestones[0],
                                                                   component=component, priority=priority,
                                                                   version=version,display_id=display_id,time_length=time_length,
                                                                   status=statuss[0], owner_project=owner_project,notes=notes
                                                                   )
        display_id = 1
        if len(table.row_values(rows)[5])>0 or len(table.row_values(rows)[6])>0:
            if Taskorder.objects.filter(owner_project=url,parent=create_task.id):
                Taskorder.objects.create(summary=summary, creator=creator,
                                         description=description, type=task_type, milestone=milestones[0],
                                         component=component, priority=priority,grade=table.row_values(rows)[5],
                                         owner=table.row_values(rows)[6],parent=create_task.id,
                                         version=version, display_id=display_id, time_length=time_length,
                                         status=statuss[0], owner_project=owner_project, notes=notes
                                         )
            #key = Production_process.objects.create(name='抠像',grade=table.row_values(rows)[5],owner=table.row_values(rows)[6],owner_task=create_task.id)
            #create_task.production_process.add(key)

        if len(table.row_values(rows)[7])>0 or len(table.row_values(rows)[8])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[1],
                                    component=component, priority=priority, grade=table.row_values(rows)[7],
                                    owner=table.row_values(rows)[8], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #erase = Production_process.objects.create(name='擦除',grade=table.row_values(rows)[7],owner=table.row_values(rows)[8],owner_task=create_task.id)
            #create_task.production_process.add(erase)

        if len(table.row_values(rows)[9])>0 or len(table.row_values(rows)[10])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[2],
                                    component=component, priority=priority, grade=table.row_values(rows)[9],
                                    owner=table.row_values(rows)[10], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #track = Production_process.objects.create(name='跟踪',grade=table.row_values(rows)[9],owner=table.row_values(rows)[10],owner_task=create_task.id)
            #create_task.production_process.add(track)

        if len(table.row_values(rows)[11])>0 or len(table.row_values(rows)[12])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[3],
                                    component=component, priority=priority, grade=table.row_values(rows)[11],
                                    owner=table.row_values(rows)[12], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #picture = Production_process.objects.create(name='绘景',grade=table.row_values(rows)[11],owner=table.row_values(rows)[12],owner_task=create_task.id)
            #create_task.production_process.add(picture)

        if len(table.row_values(rows)[13])>0 or len(table.row_values(rows)[14])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[4],
                                    component=component, priority=priority, grade=table.row_values(rows)[13],
                                    owner=table.row_values(rows)[14], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #effects = Production_process.objects.create(name='特效',grade=table.row_values(rows)[13],owner=table.row_values(rows)[14],owner_task=create_task.id)
            #create_task.production_process.add(effects)

        if len(table.row_values(rows)[15])>0 or len(table.row_values(rows)[16])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[5],
                                    component=component, priority=priority, grade=table.row_values(rows)[15],
                                    owner=table.row_values(rows)[16], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #scene = Production_process.objects.create(name='场景',grade=table.row_values(rows)[15],owner=table.row_values(rows)[16],owner_task=create_task.id)
            #create_task.production_process.add(scene)

        if len(table.row_values(rows)[17])>0 or len(table.row_values(rows)[18])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[6],
                                    component=component, priority=priority, grade=table.row_values(rows)[17],
                                    owner=table.row_values(rows)[18], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #cartoon = Production_process.objects.create(name='动画',grade=table.row_values(rows)[17],owner=table.row_values(rows)[18],owner_task=create_task.id)
            #create_task.production_process.add(cartoon)

        if len(table.row_values(rows)[19])>0 or len(table.row_values(rows)[20])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[7],
                                    component=component, priority=priority, grade=table.row_values(rows)[19],
                                    owner=table.row_values(rows)[20], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #concept = Production_process.objects.create(name='概念',grade=table.row_values(rows)[19],owner=table.row_values(rows)[20],owner_task=create_task.id)
            #create_task.production_process.add(concept)

        if len(table.row_values(rows)[21])>0 or len(table.row_values(rows)[22])>0:
            Taskorder.objects.create(summary=summary, creator=creator,
                                    description=description, type=task_type, milestone=milestones[8],
                                    component=component, priority=priority, grade=table.row_values(rows)[21],
                                    owner=table.row_values(rows)[22], parent=create_task.id,
                                    version=version, display_id=display_id, time_length=time_length,
                                    status=statuss[0], owner_project=owner_project, notes=notes
                                    )
            #synthesis = Production_process.objects.create(name='合成',grade=table.row_values(rows)[21],owner=table.row_values(rows)[22],owner_task=create_task.id)
            #create_task.production_process.add(synthesis)
        task_child_sum = Taskorder.objects.filter(owner_project=url, parent=create_task.id).count()
        if task_child_sum > 0:
            display_sum = 1
            for taskobject in Taskorder.objects.filter(owner_project=url, parent=create_task.id):
                task_display_id = '%s-%s' % (create_task.display_id, display_sum)
                Taskorder.objects.filter(owner_project=url, id=taskobject.id).update(display_id=task_display_id)
                display_sum += 1
    return HttpResponseRedirect('/',locals())


