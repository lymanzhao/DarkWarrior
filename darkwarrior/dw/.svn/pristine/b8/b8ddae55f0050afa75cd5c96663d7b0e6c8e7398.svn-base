#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
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



@checkCdkey
@login_required
@views_permission
def personal_log(request,*args,**kwargs):        #个人日志(时间线) 2016/08/16
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    comment_owner = Comment.objects.filter(owner=staff_user)
    comment_at_people = Comment.objects.filter(at_people__contains=user)
    comment_author = Comment.objects.filter(author__contains=user)
    set_list = list(set(list(comment_owner)+list(comment_at_people)+list(comment_author)))

    for i in set_list:
        if i.parent_id!='0':
            if Comment.objects.filter(id=i.parent_id):
                if Comment.objects.get(id=i.parent_id) not in set_list:
                    set_list.append(Comment.objects.get(id=i.parent_id))
            set_list.remove(i)

    set_dict={}
    for i in set_list:
        set_dict.setdefault(i,str(i.time))
        set_list = sorted(set_dict.items(), key=lambda set_dict:set_dict[1],reverse=True)
    set_list_new = []
    for i in set_list:
        set_list_new.append(i[0])
    comment_parent = set_list_new[0:10]
    if len(set_list_new)>=10:
        more_data = True
    else:
        more_data = False

    comment_all = []
    for comments in comment_parent:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})




    return render_to_response('personal_log.html',locals())


@checkCdkey
@login_required
@views_permission
def project_members(request,*args,**kwargs):       #项目成员 2016/08/16
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    #staff_all_per = kwargs['staff_all_per']

    project_home_permission = Permission.objects.get(project_id = project_id,view_name = 'project_index')  #项目首页权限

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    ##########################   检索跟本项目相关的所有人员
    permission_project = Permission.objects.filter(project_id = project_id)
    project_staff_list = []
    for i in permission_project:
        staff_list = i.user_set.all()
        project_staff_list = list(set(list(staff_list)+project_staff_list))

    for i in permission_project:
        for j in i.group_set.all():
            project_staff_list = list(set(list(j.user_set.all())+project_staff_list))

    project_groups = Group.objects.filter(owner_project_id = project_id)
    for i in project_groups:
        project_staff_list = list(set(list(i.user_set.all())+project_staff_list))
    project_staff_list.append(Project.objects.get(id=project_id).creator)
    project_staff_list = list(set(project_staff_list))
    all_num = len(project_staff_list)
    #############################

    if request.method=="GET":                                                 #搜索功能
        name = request.GET.get('q')
        if name is not None:
            name = name.strip()
            if len(name)>0:
                search_user = User.objects.filter(username__contains=name)
                if search_user:
                    project_staff_list = [i for i in search_user if i in project_staff_list]
                    num = len(project_staff_list)
                    search = '显示搜索结果'
                else:
                    project_staff_list = []
                    num = 0
                    search = '显示搜索结果'
        else:
            name = ''

    staff_detail = []
    for i in project_staff_list:
        staff_id = i.id
        if i.name:
            staff_name = i.name
        else:
            staff_name = i.username
        staff_email = i.email
        staff_phone_number = i.phone
        staff_position = i.position
        staff_photo = i.head_portrait

        #staff_active = i.active
        staff_superuser = i.is_superuser
        staff_permission = i.user_permission.all()                   #用户个人所有权限
        ############
        project_staff_group_list = []                           #用户跟该项目相关的所属小组
        staff_group = i.group.all()                             #用户所属的所有小组
        group_permission_all = []
        for z in staff_group:
            if len(z.group_permission.filter(project_id = project_id))>0:
                project_staff_group_list.append(z)

                for j in z.group_permission.all():
                    group_permission_all.append(j)
        #print project_staff_group_list,'用户跟该项目相关的所属小组'
        staff_all_per = list(set(list(staff_permission)+group_permission_all))     #用户跟该项目相关的所有权限
        ##############
        if project_home_permission in staff_all_per or i==project.creator or True==i.is_superuser:             #判断用户是否在该项目已激活
            staff_active = True
        else:
            staff_active = False
        if i==project.creator:                                  #判断是否是项目主管
            project_director = True
        else:
            project_director = False
        #print staff_permission
        staff_permission_list=[]                                 #用户跟该项目相关的个人所有权限
        for s in staff_permission:
            #print s
            if s.project_id == project_id:
                #print s
                staff_permission_list.append(s)




        staff_detail.append({'staff_id':staff_id,'staff_name':staff_name,'staff_email':staff_email,'staff_position':staff_position,
                             'staff_photo':staff_photo,'staff_active':staff_active,'staff_superuser':staff_superuser,'staff_phone_number':staff_phone_number,

                             'staff_permission_list':staff_permission_list,'staff_group':project_staff_group_list,'project_director':project_director })
    staff_num = len(staff_detail)


    return render_to_response('project_members.html',locals())


@checkCdkey
@login_required
@views_permission
def member_log(request,*args,**kwargs):        #项目成员日志   2016/08/16
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    member_id = kwargs['member_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    try:
        member = User.objects.get(id=member_id)
    except:
        error = '未找到该用户，非法操作！'
        return render_to_response('permission_notice.html',locals())


    comment_owner = Comment.objects.filter(owner_project=project,owner=User.objects.get(id=member_id))
    comment_at_people = Comment.objects.filter(owner_project=project,at_people__contains=User.objects.get(id=member_id).username)
    comment_author = Comment.objects.filter(owner_project=project,author__contains=User.objects.get(id=member_id).username)
    set_list = list(set(list(comment_owner)+list(comment_at_people)+list(comment_author)))


    for i in set_list:
        if i.parent_id!='0':
            if Comment.objects.filter(id=i.parent_id):
                if Comment.objects.get(id=i.parent_id) not in set_list:
                    set_list.append(Comment.objects.get(id=i.parent_id))

            set_list.remove(i)

    set_dict={}
    for i in set_list:
        set_dict.setdefault(i,str(i.time))
        set_list = sorted(set_dict.items(), key=lambda set_dict:set_dict[1],reverse=True)
    set_list_new = []
    for i in set_list:
        set_list_new.append(i[0])
    comment_parent = set_list_new[0:10]
    if len(set_list_new)>=10:
        more_data = True
    else:
        more_data = False

    comment_all = []
    for comments in comment_parent:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(owner_project=project,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})




    return render_to_response('member_log.html',locals())

@checkCdkey
@login_required
@views_permission
def loading_personal_timeline(request,*args,**kwargs):        #项目成员日志动态加载
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']

    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    loading_index = kwargs['loading_index']
    loading_num = kwargs['loading_num']
    user_id = kwargs['user_id']



    comment_owner = Comment.objects.filter(owner=User.objects.get(id=user_id))
    comment_at_people = Comment.objects.filter(at_people__contains=User.objects.get(id=user_id).username)
    comment_author = Comment.objects.filter(author__contains=User.objects.get(id=user_id).username)
    set_list = list(set(list(comment_owner)+list(comment_at_people)+list(comment_author)))


    for i in set_list:
        if i.parent_id!='0':
            if Comment.objects.get(id=i.parent_id) not in set_list:
                set_list.append(Comment.objects.get(id=i.parent_id))
            set_list.remove(i)

    set_dict={}
    for i in set_list:
        set_dict.setdefault(i,str(i.time))
        set_list = sorted(set_dict.items(), key=lambda set_dict:set_dict[1],reverse=True)
    set_list_new = []
    for i in set_list:
        set_list_new.append(i[0])

    try:
        loading_index = set_list_new.index(Comment.objects.get(id=loading_index))
    except:
        return HttpResponse('data_error')
    comment_parent = set_list_new[int(loading_index)+1:int(loading_index)+int(loading_num)+1]
    if len(comment_parent)==0:
        return HttpResponse('False')

    comment_all = []
    for comments in comment_parent:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})




    return render_to_response('loading_timeline.html',locals())


@checkCdkey
@login_required
@views_permission
def timeline(request,*args,**kwargs):        #时间线      2016/08/17
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    action_all = Comment.objects.filter(owner_project=project,parent_id=0).order_by('-time')[0:10]
    if Comment.objects.filter(owner_project=project,parent_id=0).count()>=10:
        more_data = True
    else:
        more_data = False
    comment_all = []
    for comments in action_all:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(owner_project=project,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})

    return render_to_response('timeline.html',locals())


@checkCdkey
@login_required
@views_permission
def loading_timeline(request,*args,**kwargs):        #时间线动态加载      2016/08/18
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    loading_index = kwargs['loading_index']
    loading_num = kwargs['loading_num']
    try:
        loading_index = list(Comment.objects.filter(owner_project=project,parent_id=0).order_by('-time')).index(Comment.objects.get(id=loading_index))
    except:
        return HttpResponse('data_error')
    action_all = Comment.objects.filter(owner_project=project,parent_id=0).order_by('-time')[int(loading_index)+1:int(loading_index)+int(loading_num)+1]
    if action_all.count()==0:
        return HttpResponse('False')
    comment_all = []
    for comments in action_all:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(owner_project=project,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})
    return render_to_response('loading_timeline.html',locals())

@checkCdkey
@login_required
@views_permission
def member_gantt(request,*aegs,**kwargs):    #项目成员甘特图  2016/09/05
    project_archive = kwargs['project']  #项目归档判断

    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    gantt_links = Gantt_links.objects.all()                                        #甘特图关联
    member_id = kwargs['member_id']
    try:
        member = User.objects.get(id=member_id)
    except:
        error = '未找到该用户，非法操作！'
        return render_to_response('permission_notice.html',locals())


    #实时更新甘特图任务进度数据

    project_type = Project.objects.get(id=url).project_type.id
    statuss = Project_type.objects.get(id=project_type).task_status.all()
    start_tasks = Taskorder.objects.filter(owner_project=url,status=statuss.order_by('value')[1])
    for start_task in start_tasks:
        now_start_time = time.mktime(time.strptime(str(Taskorder.objects.get(id=start_task.id).start_date).split('+')[0],"%Y-%m-%d %H:%M:%S"))
        now_time = time.time()
        progress_timestamip = now_time - now_start_time
        use_time = progress_timestamip / 86400
        if start_task.duration == 0:
            start_task.duration = 1
        progress = use_time / start_task.duration
        Taskorder.objects.filter(id=start_task.id).update(progress=progress)


    gantt_css = Project.objects.get(id=url).gantt_skin
    gantt_css_url = 'codebase/skins/'+Project.objects.get(id=url).gantt_skin
    for i in Gantt_type.objects.filter(owner_project=project_id):                #设置甘特图颜色 liuluyang 2016/7/25
        Taskorder.objects.filter(type=i.type,owner_project=project).update(
            color=i.gantt_color,textColor=i.gantt_textColor,
            progressColor='rgba(0,0,0,'+str(int(i.gantt_progressColor)*0.01)+')'
        )
    gantt_task_height = Project.objects.get(id=url).gantt_task_height              #设置甘特图高度
    gantt_row_height = Project.objects.get(id=url).gantt_row_height

    #创建任务单

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

    if request.method=='GET':
        gantt_tasks_creator = Taskorder.objects.filter(owner_project=url,creator=member)
        gantt_tasks_owner = Taskorder.objects.filter(owner_project=url,owner__contains=member.username)
        gantt_tasks_reporter = Taskorder.objects.filter(owner_project=url,reporter=member.username)
        set_list = list(set(list(gantt_tasks_creator)+list(gantt_tasks_owner)+list(gantt_tasks_reporter)))
        for i in set_list:
            if i.parent!=0:
                try:
                    task_parent = Taskorder.objects.get(id=i.parent_id)
                    if task_parent not in set_list:
                        set_list.append(task_parent)
                except:
                    pass
        task_num = len(set_list)
        gantt_tasks = set_list
        if gantt_row_height:
            if task_num==0:
                height_num = 100
            elif task_num < 5:
                if gantt_row_height<=100:
                    height_num = task_num *100
                else:
                    height_num = task_num * gantt_row_height
            elif 5 <= task_num <= 10:
                if gantt_row_height<=60:
                    height_num = task_num *60
                else:
                    height_num = task_num * gantt_row_height
            elif 10 < task_num <= 50:
                if gantt_row_height<=50:
                    height_num = task_num *50
                else:
                    height_num = task_num * gantt_row_height
            else:
                if gantt_row_height<=40:
                    height_num = task_num * 40
                else:
                    height_num = task_num * gantt_row_height
        else:
            if task_num==0:
                height_num = 100
            elif task_num < 5:
                height_num = task_num * 100
            elif 5 <= task_num <= 10:
                height_num = task_num *60
            elif 10 < task_num <= 50:
                height_num = task_num * 50
            else:
                height_num = task_num * 40
        return render_to_response('member_gantt.html',locals())

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

        task_parent_id =request.POST.get('parent_id')

        task_relevance = request.POST.get('relevance')
        task_id = request.POST.get('task_id')
        relevance_type = request.POST.get('relevance_type')

        if end_date == '':
            end_date = now_date
        if start_date == '':
            start_date = now_date

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

        #检测属主是否存在，只添加存在的属主
        if owner.split(',') is not None and len(owner)>0:
            task_owners = ''
            for task_owner in owner.split(','):
                if User.objects.filter(username=task_owner):
                    task_owners = task_owners + task_owner + ','
            owner_list=list(task_owners)
            if len(owner_list)>0:
                owner_list.pop()
            owner = "".join(owner_list)

        #获取最后一个显示id
        task_num = Taskorder.objects.filter(owner_project=project_archive).count()
        if task_num == 0:
            display_id = 1
        else:
            display_id = Taskorder.objects.filter(owner_project=project_archive).order_by('-id')[0].display_id + 1

        if summary is not None and len(summary)>0:

            if image == 'tiff':
                errors.append('您上传的图片web不支持显示')
            elif start_date is not None and len(start_date) > 0:
                if duration is not None and duration >= 0:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date)
                    else:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date)

                else:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date)
                    else:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,parent=task_parent_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date,display_id=display_id)

                id = Taskorder.objects.filter(creator=user_now).order_by('-id')[0].id

                #任务单关联
                if task_relevance == 'task_relevance':
                    if task_id is not None and len(task_id)>0:
                        Gantt_links.objects.create(source=id,target=task_id,type=relevance_type.split(',')[1])


                return HttpResponseRedirect('/%s/member_gantt/%s'%(url,member_id),locals())
            else:
                errors.append('请输入任务起始时间')
                return render_to_response('member_gantt.html',locals())
        else:
            errors.append('请输入任务概述')
            return render_to_response('member_gantt.html',locals())




    return render_to_response('member_gantt.html',locals())

@checkCdkey
@login_required
@views_permission
def member_calendar(request,*args,**kwargs):     #项目成员日程  2016/09/06
    project_archive = kwargs['project']          #项目判断
    url=kwargs['project_id']
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait
    member_id = kwargs['member_id']
    try:
        member = User.objects.get(id=member_id)
    except:
        error = '未找到该用户，非法操作！'
        return render_to_response('permission_notice.html',locals())

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    project=Project.objects.get(id=url)
    for i in Scheduler_type.objects.filter(owner_project=project):
        Taskorder.objects.filter(type=i.type,owner_project=project).update(color=i.scheduler_color,textColor=i.scheduler_text_color)

    calendar=[]
    task_owner=Taskorder.objects.filter(owner_project=project,owner=member.username)
    task_creator=Taskorder.objects.filter(owner_project=project, creator=member)
    task_reporter=Taskorder.objects.filter(owner_project=project,reporter=member.username)
    task=[task_creator,task_owner,task_reporter]
    for task_item in task:
        for t in task_item:
            start_date=t.start_date
            end_date=t.end_date
            summary=t.summary
            color=t.color
            textColor=t.textColor
            calendar.append({'id':t.id,'text':summary,'start_date':start_date,'end_date':end_date,'color':color,'textColor':textColor})

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

    scheduler_css=Project.objects.get(id=url).scheduler_skin
    scheduler_css_url='codebase/'+scheduler_css

    return render_to_response('member_calendar.html',locals())


@checkCdkey
@login_required
@views_permission
def project_teams(request,*args,**kwargs):       #项目团队 2016/09/07
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    project_teams = Task_team.objects.filter(owner_project=project_id)

    return render_to_response('project_teams.html',locals())

@checkCdkey
@login_required
@views_permission
def team_kanban(request,*args,**kwargs):      #项目团队看版  2016/09/07
    project_archive = kwargs['project']  #项目归档判断
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    project_logo=Project.objects.get(id=url).project_logo

    project_type = project_archive.project_type
    milestones = project_type.milestone.all()
    prioritys = project_type.task_priority.all()
    statuss = project_type.task_status.all()
    components = project_type.task_component.all()
    types = project_type.task_type.all()
    versions = project_type.task_version.all()

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    status_num = 10 / float(statuss.count()) * 10

    team_id = kwargs['team_id']
    try:
        team = Task_team.objects.get(id=team_id)
    except:
        error = '未找到该团队，非法操作！'
        return render_to_response('permission_notice.html',locals())

    if request.method=='GET':
        self = request.GET.get('self')
        search_content = request.GET.get('search_content')
        judge = request.GET.get('judge')

        if search_content is not None and len(search_content.strip())>0:

            status_id_names = []
            for status in statuss:
                status_id_names.append('drag-%s'%status.id)
            kanbans = []
            for status in statuss:

                s_team_kanban = team.taskorder_set.filter(owner_project=url,status=status,summary__contains=search_content).order_by('priority')
                d_team_kanban = team.taskorder_set.filter(owner_project=url,status=status,description__contains=search_content).order_by('priority')


                user_kanban_list= list(set(list(s_team_kanban)+list(d_team_kanban)))
                task_list_new = []
                for i in user_kanban_list:
                    if i.task_image:
                        task_list_new.append({'task':i,'task_image':i.task_image})
                    else:
                        try:
                            task_image = Attachment_image.objects.filter(owner=i,owner_project=project_archive).order_by('-time')[0]
                            task_list_new.append({'task':i,'task_image':task_image.url})
                        except:
                            task_list_new.append({'task':i,'task_image':False})

                kanbans.append({'status':status,'task':task_list_new})
            return render_to_response('team_kanban.html',locals())
        else:

            status_id_names = []
            for status in statuss:
                status_id_names.append('drag-%s'%status.id)
            kanbans = []
            for status in statuss:

                team_kanban = team.taskorder_set.filter(owner_project=url,status=status).order_by('priority')
                task_list_new = []                     #2016/08/30 lly
                for i in team_kanban:
                    if i.task_image:
                        task_list_new.append({'task':i,'task_image':i.task_image})
                    else:
                        try:
                            task_image = Attachment_image.objects.filter(owner=i,owner_project=project_archive).order_by('-time')[0]
                            task_list_new.append({'task':i,'task_image':task_image.url})
                        except:
                            task_list_new.append({'task':i,'task_image':False})

                kanbans.append({'status':status,'task':task_list_new})

            return render_to_response('team_kanban.html',locals())




    status_id_names = []
    for status in statuss:
        status_id_names.append('drag-%s'%status.id)

    if request.method == 'POST':
        status_change =request.POST.get('status_change')
        kanban_status = []
        kanban_id = []
        if status_change == 'change':
            for value in status_id_names:
                values = request.POST.get(value)
                new_list =[]
                for new_id in re.findall('\d+',values):
                    new_list.append(int(new_id))
                kanban_id.append(new_list)

            for status in statuss:
                kanban_status.append(status)

            for merge in map(None,kanban_status,kanban_id):
                Taskorder.objects.filter(id__in=merge[1]).update(status=merge[0])
            return HttpResponseRedirect('/%s/team_kanban/%s'%(url,team_id),locals())


    return render_to_response('team_kanban.html',locals())

@checkCdkey
@login_required
@views_permission
def team_calendar(request,*args,**kwargs):     #项目团队日程  2016/09/08
    project_archive = kwargs['project']          #项目判断
    url=kwargs['project_id']
    user_now=request.session.get('USERNAME',False)
    user_head_portrait=User.objects.get(username=user_now).head_portrait
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    team_id = kwargs['team_id']
    try:
        team = Task_team.objects.get(id=team_id)
    except:
        error = '未找到该团队，非法操作！'
        return render_to_response('permission_notice.html',locals())

    project=Project.objects.get(id=url)
    for i in Scheduler_type.objects.filter(owner_project=project):
        Taskorder.objects.filter(type=i.type,owner_project=project).update(color=i.scheduler_color,textColor=i.scheduler_text_color)

    calendar=[]
    task=team.taskorder_set.filter(owner_project=url)
    task=[task]
    for task_item in task:
        for t in task_item:
            start_date=t.start_date
            end_date=t.end_date
            summary=t.summary
            color=t.color
            textColor=t.textColor
            calendar.append({'id':t.id,'text':summary,'start_date':start_date,'end_date':end_date,'color':color,'textColor':textColor})

    project_type = project_archive.project_type
    milestones = project_type.milestone.all()
    prioritys = project_type.task_priority.all()
    statuss = project_type.task_status.all()
    components = project_type.task_component.all()
    types = project_type.task_type.all()
    versions = project_type.task_version.all()


    scheduler_css=Project.objects.get(id=url).scheduler_skin
    scheduler_css_url='codebase/'+scheduler_css

    return render_to_response('team_calendar.html',locals())

@checkCdkey
@login_required
@views_permission
def team_gantt(request,*aegs,**kwargs):    #项目团队甘特图  2016/09/05
    project_archive = kwargs['project']  #项目归档判断
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    gantt_links = Gantt_links.objects.all()                                        #甘特图关联
    team_id = kwargs['team_id']
    try:
        team = Task_team.objects.get(id=team_id)
    except:
        error = '未找到该团队，非法操作！'
        return render_to_response('permission_notice.html', locals())


    #实时更新甘特图任务进度数据
    project_type = Project.objects.get(id=url).project_type.id
    statuss = Project_type.objects.get(id=project_type).task_status.all()
    start_tasks = Taskorder.objects.filter(owner_project=url,status=statuss.order_by('value')[1])
    for start_task in start_tasks:
        now_start_time = time.mktime(time.strptime(str(Taskorder.objects.get(id=start_task.id).start_date).split('+')[0],"%Y-%m-%d %H:%M:%S"))
        now_time = time.time()
        progress_timestamip = now_time - now_start_time
        use_time = progress_timestamip / 86400
        if start_task.duration == 0:
            start_task.duration = 1
        progress = use_time / start_task.duration
        Taskorder.objects.filter(id=start_task.id).update(progress=progress)


    gantt_css = Project.objects.get(id=url).gantt_skin
    gantt_css_url = 'codebase/skins/'+Project.objects.get(id=url).gantt_skin
    for i in Gantt_type.objects.filter(owner_project=project_id):                #设置甘特图颜色 liuluyang 2016/7/25
        Taskorder.objects.filter(type=i.type,owner_project=project).update(
            color=i.gantt_color,textColor=i.gantt_textColor,
            progressColor='rgba(0,0,0,'+str(int(i.gantt_progressColor)*0.01)+')'
        )
    gantt_task_height = Project.objects.get(id=url).gantt_task_height              #设置甘特图高度
    gantt_row_height = Project.objects.get(id=url).gantt_row_height

    #创建任务单

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

    if request.method=='GET':
        set_list = team.taskorder_set.filter(owner_project=url)
        for i in set_list:
            if i.parent!=0:
                try:
                    task_parent = Taskorder.objects.get(id=i.parent_id)
                    if task_parent not in set_list:
                        set_list.append(task_parent)
                except:
                    pass
        task_num = len(set_list)
        gantt_tasks = set_list
        if gantt_row_height:
            if task_num==0:
                height_num = 100
            elif task_num < 5:
                if gantt_row_height<=100:
                    height_num = task_num *100
                else:
                    height_num = task_num * gantt_row_height
            elif 5 <= task_num <= 10:
                if gantt_row_height<=60:
                    height_num = task_num *60
                else:
                    height_num = task_num * gantt_row_height
            elif 10 < task_num <= 50:
                if gantt_row_height<=50:
                    height_num = task_num *50
                else:
                    height_num = task_num * gantt_row_height
            else:
                if gantt_row_height<=40:
                    height_num = task_num * 40
                else:
                    height_num = task_num * gantt_row_height
        else:
            if task_num==0:
                height_num = 100
            elif task_num < 5:
                height_num = task_num * 100
            elif 5 <= task_num <= 10:
                height_num = task_num *60
            elif 10 < task_num <= 50:
                height_num = task_num * 50
            else:
                height_num = task_num * 40
        return render_to_response('team_gantt.html',locals())

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

        task_parent_id =request.POST.get('parent_id')

        task_relevance = request.POST.get('relevance')
        task_id = request.POST.get('task_id')
        relevance_type = request.POST.get('relevance_type')

        if end_date == '':
            end_date = now_date
        if start_date == '':
            start_date = now_date

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

        #检测属主是否存在，只添加存在的属主
        if owner.split(',') is not None and len(owner)>0:
            task_owners = ''
            for task_owner in owner.split(','):
                if User.objects.filter(username=task_owner):
                    task_owners = task_owners + task_owner + ','
            owner_list=list(task_owners)
            if len(owner_list)>0:
                owner_list.pop()
            owner = "".join(owner_list)

        #获取最后一个显示id
        task_num = Taskorder.objects.filter(owner_project=project_archive).count()
        if task_num == 0:
            display_id = 1
        else:
            display_id = Taskorder.objects.filter(owner_project=project_archive).order_by('-id')[0].display_id + 1

        if summary is not None and len(summary)>0:

            if image == 'tiff':
                errors.append('您上传的图片web不支持显示')
            elif start_date is not None and len(start_date) > 0:
                if duration is not None and duration >= 0:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date)
                    else:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,duration=duration,end_date=task_end_date)

                else:
                    if story_point is not None and len(story_point)>0:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,parent=task_parent_id,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,storypoint=story_point,display_id=display_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date)
                    else:
                        create_task = Taskorder.objects.create(summary=summary,creator=creator,description=description,type=type,milestone=milestone,
                                                               component=component,priority=priority,task_image=task_image,owner=owner,version=version,parent=task_parent_id,
                                                               status=statuss[0],owner_project=owner_project,start_date=task_start_date,end_date=task_end_date,display_id=display_id)

                id = Taskorder.objects.filter(creator=user_now).order_by('-id')[0].id

                #任务单关联
                if task_relevance == 'task_relevance':
                    if task_id is not None and len(task_id)>0:
                        Gantt_links.objects.create(source=id,target=task_id,type=relevance_type.split(',')[1])


                return HttpResponseRedirect('/%s/team_gantt/%s'%(url,team_id),locals())
            else:
                errors.append('请输入任务起始时间')
                return render_to_response('team_gantt.html',locals())
        else:
            errors.append('请输入任务概述')
            return render_to_response('team_gantt.html',locals())




    return render_to_response('team_gantt.html',locals())

@checkCdkey
@login_required
@views_permission
def team_log(request,*args,**kwargs):        #项目团队日志   2016/09/12
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    team_id = kwargs['team_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    try:
        team = Task_team.objects.get(id=team_id)
    except:
        error = '未找到该团队，非法操作！'
        return render_to_response('permission_notice.html',locals())


    #comment_owner = Comment.objects.filter(owner_project=project,owner=User.objects.get(id=team_id))
    comment_at_people = Comment.objects.filter(owner_project=project,at_people__contains=team.name)
    #comment_author = Comment.objects.filter(owner_project=project,author__contains=User.objects.get(id=team_id).username)
    set_list = list(set(list(comment_at_people)))

    for i in set_list:
        if i.parent_id!='0':
            if Comment.objects.get(id=i.parent_id) not in set_list:
                set_list.append(Comment.objects.get(id=i.parent_id))
            set_list.remove(i)

    set_dict={}
    for i in set_list:
        set_dict.setdefault(i,str(i.time))
        set_list = sorted(set_dict.items(), key=lambda set_dict:set_dict[1],reverse=True)
    set_list_new = []
    for i in set_list:
        set_list_new.append(i[0])
    comment_parent = set_list_new[0:10]
    if len(set_list_new)>=10:
        more_data = True
    else:
        more_data = False

    comment_all = []
    for comments in comment_parent:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(owner_project=project,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})




    return render_to_response('team_log.html',locals())

@checkCdkey
@login_required
@views_permission
def loading_team_log(request,*args,**kwargs):        #项目团队日志动态加载
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    loading_index = kwargs['loading_index']
    loading_num = kwargs['loading_num']
    team_id = kwargs['team_id']

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    #comment_owner = Comment.objects.filter(owner_project=project,owner=User.objects.get(id=user_id))
    comment_at_people = Comment.objects.filter(owner_project=project,at_people__contains=Task_team.objects.get(id=team_id))
    #comment_author = Comment.objects.filter(owner_project=project,author__contains=User.objects.get(id=user_id).username)
    set_list = list(set(list(comment_at_people)))


    for i in set_list:
        if i.parent_id!='0':
            if Comment.objects.get(id=i.parent_id) not in set_list:
                set_list.append(Comment.objects.get(id=i.parent_id))
            set_list.remove(i)

    set_dict={}
    for i in set_list:
        set_dict.setdefault(i,str(i.time))
        set_list = sorted(set_dict.items(), key=lambda set_dict:set_dict[1],reverse=True)
    set_list_new = []
    for i in set_list:
        set_list_new.append(i[0])

    try:
        loading_index = set_list_new.index(Comment.objects.get(id=loading_index))
    except:
        return HttpResponse('data_error')
    comment_parent = set_list_new[int(loading_index)+1:int(loading_index)+int(loading_num)+1]
    if len(comment_parent)==0:
        return HttpResponse('False')

    comment_all = []
    for comments in comment_parent:
        owner_task = comments.owner_task
        comment_child = Comment.objects.filter(owner_project=project,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=project,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video,'owner_task':owner_task})




    return render_to_response('loading_timeline.html',locals())