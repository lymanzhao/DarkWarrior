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
from HR_views import user_permissions


@checkCdkey
@login_required
@views_permission
def message_2(request,*args,**kwargs):     #消息列表
    project = kwargs['project']
    url = kwargs['project_id']
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    message = {}
    message_style_list = ['reply', 'comment', 'application', 'application_reply', 'task_status', 'task_image','task_owner',
                          'task_reporter', 'task_summary', 'task_type', 'task_milestone', 'task_component','task_priority',
                          'task_version', 'task_team', 'team_comment', 'task_description','task_attachment','task_grade']

    for message_style in message_style_list:
        message.setdefault(message_style,Message.objects.filter(reminder=staff_user, status=False, classify=message_style,owner_project=project).order_by('-time'))
        message.setdefault(message_style+'_num',Message.objects.filter(reminder=staff_user, status=False, classify=message_style,owner_project=project).count())

    if request.method=="POST":
        check_news = request.POST.get('check_news')
        if check_news is not None:
            Message.objects.filter(id=int(check_news)).update(status=True)

        clear_message = request.POST.get('clear_message')
        if clear_message=='clear_message':
            Message.objects.filter(reminder=staff_user,status=False).update(status=True)
            return HttpResponseRedirect('/'+url+'/message_2/')
        return HttpResponseRedirect('/'+url+'/message_2/')


    return render_to_response('message.html',locals())


@checkCdkey
@login_required
@views_permission
def judgment_message(request,*args,**kwargs):   #消息提示
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    url = kwargs['project_id']
    project = kwargs['project']
    message_style_list = ['reply','comment','application','application_reply','task_status','task_image','task_owner',
                          'task_reporter','task_summary','task_type','task_milestone','task_component','task_priority',
                          'task_version','task_team','team_comment','task_description','task_attachment','task_grade']

    for message_style in message_style_list:
        if Message.objects.filter(reminder=staff_user, status=False, classify=message_style,owner_project=project).exists():
            return HttpResponse('True')

    return HttpResponse('False')




@checkCdkey
@login_required
@views_permission
def search_people(request,*args,**kwargs):             #搜索用户提示功能

    if request.method=='GET':
        search_people = request.GET.get('q')
        if search_people is not None and len(search_people.strip())>0:
            search_list = User.objects.filter(username__contains=search_people)
            return render_to_response('search_people.html',locals())

    return render_to_response('search_people.html',locals())


@checkCdkey
@login_required
@views_permission
def application(request,*args,**kwargs):                   #申请加入项目
    project_archive = kwargs['project']
    url = kwargs['project_id']
    user_now =request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    staff_user = User.objects.get(username=user_now)

    staff_permission = staff_user.user_permission.all()                    #用户个人所有权限
    groups = staff_user.group.all()                                   #用户所有所属组
    group_permission_all = []                                         #用户所有所属组的全部权限
    for i in groups:
        for j in i.group_permission.all():
            group_permission_all.append(j)
    staff_all_per = list(set(list(staff_permission)+group_permission_all))    #用户所有权限
    project_creator = Project.objects.get(id = url).creator                   #项目主管
    project_home_permission = Permission.objects.get(project_id = url,view_name = 'project_index')  #项目首页权限
    project_manage_permission = Permission.objects.get(project_id = url,view_name = 'manage')  #项目后台权限

    if project_home_permission not in staff_all_per and staff_user.is_superuser is False and staff_user!=project_creator:

        if not Message.objects.filter(name='application',promulgator=user_now,owner_project=Project.objects.get(id=url),status=False).exists():

            manager_list = []
            for i in project_manage_permission.user_set.all():
                manager_list.append(i)
            for i in project_manage_permission.group_set.all():
                for j in i.user_set.all():
                    manager_list.append(j)
            manager_list.append(Project.objects.get(id=url).creator)
            manager_list = list(set(manager_list))
            try:
                for i in manager_list:                                              #发消息给拥有该项目后台管理权限的人
                    message_2 = Message.objects.create(name='application',classify='application',reminder=i,
                                                       promulgator=user_now,owner_task=Taskorder.objects.all()[0],   #!!!!!!!!!!!!
                                                       owner_project=Project.objects.get(id=url),)
                message_2 = Message.objects.create(name='application_record',classify='application_record',reminder=staff_user,
                                                   promulgator=user_now,owner_task=Taskorder.objects.all()[0],
                                                   owner_project=Project.objects.get(id=url),)                  #创建申请历史记录
            except:
                pass
            application_notice = '您的申请已经提交！请耐心等待'
            application_title = '申请'
            return render_to_response('permission_notice.html',locals())

        else:
            error = '您的申请已在审核中，请勿重复提交！'

            return render_to_response('permission_notice.html',locals())

    else:
        error = '您可以进入该项目,不要闹!'

        return render_to_response('permission_notice.html',locals())

@checkCdkey
@is_login
@views_permission
def check_application(request,*args,**kwargs):        #审核申请
    project_archive = kwargs['project']  # 项目归档判断
    url = kwargs['project_id']
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    project_id = kwargs['project_id']
    project = kwargs['project']
    application_people = kwargs['application_people']
    try:
        applicant = User.objects.get(username=application_people)
    except:
        error = '该用户不存在！'
        return render_to_response('permission_notice.html',locals())

    staff_permission = applicant.user_permission.all()                    #用户个人所有权限
    groups = applicant.group.all()                                   #用户所有所属组
    group_permission_all = []                                         #用户所有所属组的全部权限
    for i in groups:
        for j in i.group_permission.all():
            group_permission_all.append(j)
    staff_all_per = list(set(list(staff_permission)+group_permission_all))    #用户所有权限
    project_creator = Project.objects.get(id = project_id).creator            #项目主管
    project_home_permission = Permission.objects.get(project_id = project_id,view_name = 'project_index')  #项目首页权限
    project_manage_permission = Permission.objects.get(project_id = project_id,view_name = 'manage')  #项目后台权限

    if project_home_permission not in staff_all_per and applicant.is_superuser is False and applicant!=project_creator:
        user_group_project = Group.objects.filter(owner_project_id = project_id)
        project_permission = Permission.objects.filter(project_id = project_id)
        if request.method=="POST":
            if project_home_permission not in staff_all_per and applicant.is_superuser is False and applicant!=project_creator:
                selected_groups = request.POST.getlist('groups')
                user_permissions = request.POST.getlist('user_permissions')
                print selected_groups
                print user_permissions
                if len(selected_groups)>0 or len(user_permissions)>0:
                    for i in selected_groups:
                        applicant.group.add(Group.objects.get(id=i))
                    for i in user_permissions:
                        applicant.user_permission.add(Permission.objects.get(id=i))
                    applicant.user_permission.add(project_home_permission)
                    try:
                        message_2 = Message.objects.create(name='application_reply',classify='application_reply',reminder=applicant,
                                                           promulgator=user,owner_task=Taskorder.objects.all()[0],    #!!!!!!!!!!!
                                                           owner_project=project,)
                        Message.objects.filter(classify='application_record', owner_project=project,
                                               promulgator=application_people,
                                               status=False).update(name=user, status=True)             # 修改申请历史记录
                    except:
                        pass

                    return HttpResponseRedirect('/'+project_id)
                else:
                    error = '请给用户添加组或权限！'
                    return render_to_response('check_application.html',locals())


            else:
                error = '您来晚了，该用户已通过审核！'
                return render_to_response('permission_notice.html',locals())


        return render_to_response('check_application.html',locals())



    else:

        error = '您来晚了，该用户已通过审核！'
        return render_to_response('permission_notice.html',locals())

def change_attachment_name(request):                   #lly 2016/08/31 添加附件备注
    if request.method =="POST":
        new_name = request.POST.get('new_name')
        old_name = request.POST.get('old_name')
        project_id = request.POST.get('project_id')
        task_id = request.POST.get('task_id')
        wiki_id = request.POST.get('wiki_id')
        judge = request.POST.get('judge')


        if judge=='change_attachment_name':
            owner = Taskorder.objects.get(id=task_id)
            owner_project = Project.objects.get(id=project_id)
            if len(new_name.strip())>0:
                file_last = old_name.split('.')[-1]
                image_format = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
                video_format = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
                file_format = ['doc','txt','html','bmp','rar','zip','exe','pdf','xls',]
                if len(file_last) > 0:
                    if file_last in image_format:
                        Attachment_image.objects.filter(name=old_name,owner_comment=0,owner=owner,owner_project=owner_project).update(name=new_name)

                    elif file_last in video_format:
                        Attachment_video.objects.filter(name=old_name,owner_comment=0,owner=owner,owner_project=owner_project).update(name=new_name)

                    else:
                        Attachment_file.objects.filter(name=old_name,owner_comment=0,owner=owner,owner_project=owner_project).update(name=new_name)
        if judge=='change_wikiattachment_name':
            owner = Wiki.objects.get(id=wiki_id)
            owner_project = Project.objects.get(id=project_id)
            if len(new_name.strip())>0:
                file_last = old_name.split('.')[-1]
                image_format = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
                video_format = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
                file_format = ['doc','txt','html','bmp','rar','zip','exe','pdf','xls',]
                if len(file_last) > 0:
                    if file_last in image_format:
                        Wiki_attachment_image.objects.filter(name=old_name,owner=owner,owner_project=owner_project).update(name=new_name)

                    elif file_last in video_format:
                        Wiki_attachment_video.objects.filter(name=old_name,owner=owner,owner_project=owner_project).update(name=new_name)

                    else:
                        Wiki_attachment_file.objects.filter(name=old_name,owner=owner,owner_project=owner_project).update(name=new_name)

    return HttpResponse('ok')

@checkCdkey
@login_required
@views_permission
def get_company_name(request,*args,**kwargs):          #lly 2016/09/06 获取公司名称

    try:
        name = Company_name.objects.filter(owner_project=0)[0]
    except:
        name = False

    return HttpResponse(name)

@checkCdkey
@login_required
@views_permission
def get_sites_logo(request,*args,**kwargs):          #lly 2016/09/12 获取站点logo

    try:
        icon = Logo.objects.order_by('-id')[0]
        icon = str(icon.logo)
    except:
        icon = False

    return HttpResponse(icon)

@checkCdkey
@login_required
@views_permission
def search_parent_task(request,*args,**kwargs):          #lly 2016/09/19 search_parent_task
    url = kwargs['project_id']
    if request.method=='GET':
        search_content = request.GET.get('q')
        summary = Taskorder.objects.filter(owner_project=url,summary__contains=search_content).order_by('-id')
        description = Taskorder.objects.filter(owner_project=url,description__contains=search_content).order_by('-id')
        search_list = list(set(list(summary) + list(description)))[0:20]


    return render_to_response('search_parent_task.html',locals())



@checkCdkey
@login_required
@views_permission
def search_project(request,*args,**kwargs):          #lly 2016/09/19 search_parent_task
    url = kwargs['project_id']
    if request.method=='GET':
        search_content = request.GET.get('q')
        search_project_list = Project.objects.filter(project_name__contains=search_content).order_by('-id')[0:20]

    return render_to_response('search_project.html',locals())



@checkCdkey
@login_required
@views_permission
def update_status_kanban(request,*args,**kwargs):          #lly 2016/09/21 update_status_kanban
    project_archive = kwargs['project']  # 项目归档判断
    url = kwargs['project_id']
    staff_user = kwargs['staff_user']
    user_now = request.session.get('USERNAME', False)

    project_type = project_archive.project_type
    end_status = project_type.task_status.filter(owner_project=url).order_by('-value')[0]

    user = User.objects.get(username=user_now)
    user_all_permissions = user_permissions(user)
    project_manage_permissions = Permission.objects.get(view_name='manage', project_id=url)


    if user.is_superuser:
        manage = True
    else:
        if project_manage_permissions in user_all_permissions:
            manage = True

    if request.method=='POST':
        sort_name = request.POST.get('sort_name')
        task_id = request.POST.get('task_id')
        old_status_name = request.POST.get('old_status_name')
        new_status_id = request.POST.get('new_status_id')
        new_status_name = request.POST.get('new_status_name')

        sort_dict = {'milestone': u'里程碑', 'priority': u'优先级', 'status': u'状态', 'component': u'组件','type': u'类型', 'versions': u'版本'}
        if new_status_id and task_id:
            if sort_name=='milestone':
                Taskorder.objects.filter(id=task_id).update(milestone=Milestone.objects.get(id=new_status_id))
            if sort_name=='priority':
                Taskorder.objects.filter(id=task_id).update(priority=Priority.objects.get(id=new_status_id))
            if sort_name=='status':
                if manage:
                    Taskorder.objects.filter(id=task_id).update(status=Status.objects.get(id=new_status_id))
                    if Status.objects.get(id=new_status_id) == end_status:
                        Taskorder.objects.filter(id=task_id).update(end_date=datetime.now())

                elif Status.objects.get(id=new_status_id) != end_status:
                    Taskorder.objects.filter(id=task_id).update(status=Status.objects.get(id=new_status_id))
            if sort_name=='component':
                Taskorder.objects.filter(id=task_id).update(component=Component.objects.get(id=new_status_id))
            if sort_name=='type':
                Taskorder.objects.filter(id=task_id).update(type=Type.objects.get(id=new_status_id))
            if sort_name=='versions':
                Taskorder.objects.filter(id=task_id).update(version=Versions.objects.get(id=new_status_id))

            status = sort_dict[sort_name]
            Comment.objects.create(content=u'任务单%s被修改 , %s→%s' % (status,old_status_name,new_status_name),
                                   owner=User.objects.get(username=user_now), owner_task=Taskorder.objects.get(id=task_id),
                                   owner_project=Project.objects.get(id=url))

            message_status = []
            id = task_id
            if Taskorder.objects.get(id=id).reporter:
                if user_now != Taskorder.objects.get(id=id).reporter:
                    message_status.append(Taskorder.objects.get(id=id).reporter)
            if Taskorder.objects.get(id=id).owner:
                for user_name in Taskorder.objects.get(id=id).owner.split(','):
                    if user_now != user_name:
                        message_status.append(user_name)
            if Taskorder.objects.get(id=id).creator:
                if user_now != Taskorder.objects.get(id=id).creator.username:
                    message_status.append(Taskorder.objects.get(id=id).creator.username)

            message_status_reminder = list(set(message_status))
            for reminder_user in message_status_reminder:
                message = Message.objects.create(name=Status.objects.get(id=new_status_id).name, classify='task_status',
                                                 reminder=User.objects.get(username=reminder_user),
                                                 promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                 owner_project=Project.objects.get(id=url))
            return HttpResponse('ok')


def make_attachment_message(request):  # lly 2016/10/13 添加 附件上传消息
    if request.method == "POST":
        user_now = request.POST.get('user_name')
        url = request.POST.get('project_id')
        id = request.POST.get('task_id')
        judge = request.POST.get('judge')

        #owner = Taskorder.objects.get(id=task_id)
        #owner_project = Project.objects.get(id=project_id)

        if judge == 'make_attachment_message':
            message = []
            if Taskorder.objects.get(id=id).reporter:  # 附件消息
                if user_now != Taskorder.objects.get(id=id).reporter:
                    message.append(Taskorder.objects.get(id=id).reporter)

            if Taskorder.objects.get(id=id).owner:
                for user_name in Taskorder.objects.get(id=id).owner.split(','):
                    if user_now != user_name:
                        message.append(user_name)
            if Taskorder.objects.get(id=id).creator:
                if user_now != Taskorder.objects.get(id=id).creator.username:
                    message.append(Taskorder.objects.get(id=id).creator.username)

            message_reminder = list(set(message))
            for reminder_user in message_reminder:
                Message.objects.create(name=u'%s上传了附件'%(user_now),
                                       classify='task_attachment',
                                       reminder=User.objects.get(username=reminder_user),
                                       promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                       owner_project=Project.objects.get(id=url))
        return HttpResponse('ok')