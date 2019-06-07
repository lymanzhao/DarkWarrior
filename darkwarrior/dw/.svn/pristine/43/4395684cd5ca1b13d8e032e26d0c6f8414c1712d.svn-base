#coding:utf8
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
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage
from itertools import chain
import pytz
import xlrd
from HR_views import project_staff
import json
from json import dumps



@checkCdkey
@login_required
@views_permission
@is_superuser
def global_login_title(request,*args,**kwargs): #登陆页面标题
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    user = User.objects.get(username=user_now)


    if Login_title.objects.filter(owner_project=0).exists():
        login_title = Login_title.objects.filter(owner_project=0)[0]
    else:
        login_title = "Dark Warrior | 玄武         "
    if request.method == 'POST':
        login_title = request.POST.get('login_title')
        if login_title is not None and len(login_title)>0:
            if Login_title.objects.filter(owner_project=0).exists():
                Login_title.objects.filter(owner_project=0).update(update_user=user,title=login_title,time=datetime.now())
                return HttpResponseRedirect('/global_manage/', locals())
            else:
                Login_title.objects.create(update_user=user,title=login_title)
                return HttpResponseRedirect('/global_manage/', locals())
    return render_to_response('global_manage/login_title.html',locals())

@checkCdkey
@login_required
@views_permission
@is_superuser
def global_manage(request,*args,**kwargs):   #管理页面
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait


    return render_to_response('global_manage/manage.html',locals())

@checkCdkey
@login_required
@views_permission
@is_superuser
def global_user(request,*args,**kwargs): #用户
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    users = User.objects.all()


    return render_to_response('global_manage/user.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_permission(request,*args,**kwargs): #授权

    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    users = User.objects.all()
    groups = Group.objects.all()
    permissions = Permission.objects.all()



    if request.method == 'POST':
        user_all = request.POST.getlist('users')
        group_all = request.POST.getlist('groups')
        permission_all = request.POST.getlist('permissions')
        errors = []
        for user in user_all:
            if user is not None and len(user)>0:
                for permission in permission_all:
                    if permission is not None and len(permission)>0:
                        User.objects.get(username=user).user_permission.add(Permission.objects.get(id=permission))


        for group in group_all:
            if group is not None and len(group)>0:
                for permission in permission_all:
                    if permission is not None and len(permission)>0:
                        Group.objects.get(name=group).group_permission.add(Permission.objects.get(id=permission))


        return HttpResponseRedirect('/global_manage/user/',locals())


    return render_to_response('global_manage/permission.html',locals())



@checkCdkey
@login_required
@views_permission
@is_superuser
def global_group(request,*args,**kwargs):  #组

    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    groups = Group.objects.all()
    return render_to_response('global_manage/group.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_user_content(request,*args,**kwargs): #用户修改
    user_id = kwargs['user_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    groups = Group.objects.all()
    permissions = Permission.objects.all()
    user = User.objects.get(id=user_id)

    entry_time = user.entry_time
    entry_time_Array = time.strptime(str(entry_time).split('+')[0].split('.')[0], '%Y-%m-%d')
    entry_time_date = time.strftime("%Y/%m/%d %H:%M", entry_time_Array)

    user_group = user.group.all()
    user_permissions = user.user_permission.all()

    if request.method == 'POST':
        user_permission_all = request.POST.getlist('user_permission')
        user_group_all = request.POST.getlist('user_group')
        user_entry_time = request.POST.get('user_entry_time')
        superuser = request.POST.get('is_superuser')

        if superuser == 'true':
            User.objects.filter(id=user_id).update(is_superuser=True)
        else:
            User.objects.filter(id=user_id).update(is_superuser=False)
        if user_entry_time is not None and len(user_entry_time)>0:
            user_entry_time = datetime.strptime(user_entry_time, '%Y/%m/%d %H:%M')
            User.objects.filter(id=user_id).update(entry_time=user_entry_time)
        if user_group is not None and len(user_group)>0:
            for group in user_group:
                user.group.remove(group)

        for group_id in user_group_all:
            if group_id is not None and len(group_id)>0:
                user.group.add(Group.objects.get(id=group_id))

        if user_permissions is not None and len(user_permissions)>0:
            for permission in user_permissions:
                user.user_permission.remove(permission)

        for permission_id in user_permission_all:
            if permission_id is not None and len(permission_id)>0:
                user.user_permission.add(Permission.objects.get(id=permission_id))
        return HttpResponseRedirect('/global_manage/user/',locals())
    return render_to_response('global_manage/user_content.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_add_group(request,*args,**kwargs):  #添加组
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    users = User.objects.all()
    permissions = Permission.objects.all()
    errors = []
    if request.method == 'POST':
        groupname = request.POST.get('groupname')
        permission_all = request.POST.getlist('permissions')
        if groupname is not None and len(groupname)>0:
            group = Group(name=groupname)
            group.save()
            for permission in permission_all:
                if permission is not None and len(permission)>0:
                    Group.objects.get(name=groupname).group_permission.add(Permission.objects.get(id=permission))

            return HttpResponseRedirect('/global_manage/group/',locals())
        else:
            errors.append('请输入组名称')
    return render_to_response('global_manage/add_group.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_add_group_user(request,*args,**kwargs): #添加组成员

    group_id = kwargs['group_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait


    group = Group.objects.get(id=group_id)
    users = User.objects.all()
    group_user = Group.objects.get(id=group_id).user_set.all()
    #print group_user
    if request.method == 'POST':
        user_all = request.POST.getlist('users')
        if user_all is not None and len(user_all)>0:
            for user in group_user:
                if user is not None:
                    user.group.remove(group)

            for user_id in user_all:
                if user_id is not None and len(user_id)>0:
                    User.objects.get(id=user_id).group.add(group)
            return HttpResponseRedirect('/global_manage/group/',locals())


    return render_to_response('global_manage/add_group_user.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_group_content(request,*args,**kwargs): #修改组
    group_id = kwargs['group_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait


    group = Group.objects.get(id=group_id)

    permissions = Permission.objects.all()

    group_permissions = group.group_permission.all()

    if request.method == 'POST':
        group_permission_all = request.POST.getlist('group_permission')

        if group_permissions is not None and len(group_permissions)>0:
            for permission in group_permissions:
                group.group_permission.remove(permission)
        if group is not None:
            for group_permission_id in group_permission_all:
                if group_permission_id is not None and len(group_permission_id)>0:
                    group.group_permission.add(Permission.objects.get(id=group_permission_id))

        delete_group = request.POST.get('delete_group')
        if delete_group is not None and len(delete_group)>0:
            Group.objects.get(id=delete_group).delete()
        return HttpResponseRedirect('/global_manage/group/',locals())

    return render_to_response('global_manage/group_content.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_task_grade(request,*args,**kwargs): #任务等级
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    task_grades = Taskgrade.objects.filter(owner_project=0)
    taskgrade_correlation = []
    for taskgrade in task_grades:
        if Taskorder.objects.filter(owner_project=0,grade=taskgrade.name):
            taskgrade_correlation.append(taskgrade.name)
    if request.method == 'POST':
        judge = request.POST.get('judge')
        if judge == 'task_grade':
            task_grade_id = request.POST.get('task_grade_id')
            task_grade_name = request.POST.get('task_grade_name')
            task_grade_description = request.POST.get('task_grade_description')
            delete = request.POST.get('delete')
            save = request.POST.get('save')
            if save == 'save':
                if len(task_grade_name)>0 and len(task_grade_description)>0:
                    Taskgrade.objects.filter(id=task_grade_id).update(name=task_grade_name,description=task_grade_description)
                else:
                    grade_error = '任务等级 名称 说明不可为空'
                return HttpResponseRedirect('/global_manage/task_grade/')
            if delete == 'delete':
                Taskgrade.objects.get(id=task_grade_id).delete()
                return HttpResponseRedirect('/global_manage/task_grade/')
        if judge == 'add_task_grade':
            name = request.POST.get('name')
            description = request.POST.get('description')
            if len(name)>0 and len(description)>0:
                Taskgrade.objects.create(name=name,description=description,owner_project=0)
            else:
                grade_error = '任务等级 名称 说明不可为空'
            return HttpResponseRedirect('/global_manage/task_grade/')
    return render_to_response('global_manage/task_grade.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_manage_logo(request,*args,**kwargs):
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    user=User.objects.get(username=user_now)
    superuser=user.is_superuser
    logos=Logo.objects.order_by('-id')
    errors=[]

    if request.method == "POST":
        logo=request.FILES.get('logo')
        if logo is not None and len(logo)>0:
            re_img=re.search(r'[\w+]\.(?:png|jpg|jpeg|ico|gif|bmp|pic|tiff)',str(logo),re.I)
            if not re_img:
                errors.append('图片格式不支持')
                return render_to_response('global_manage/manage_logo.html',locals())
            else:
                try:
                    old_logo_obj = Logo.objects.order_by('-id')[0]
                    old_logo = old_logo_obj.logo
                    old_logo_obj.logo = logo
                    old_logo_obj.creator = user
                    old_logo_obj.save()
                except:
                    Logo.objects.create(logo=logo,creator=user)
                try:
                    old_logo = os.path.join(MEDIA_ROOT, str(old_logo)).replace('\\', '/')
                    os.remove(old_logo)  # 删除之前的logo
                except:
                    pass
    return  render_to_response('global_manage/manage_logo.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_change_company_name(request,*args,**kwargs):
    user = kwargs['user']
    staff_user = kwargs['staff_user']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait


    try:
        name = Company_name.objects.filter(owner_project=0)[0]
    except:
        name = False

    if request.method == "POST":
        company_name = request.POST.get('company_name')
        if len(company_name.strip())>0:
            if Company_name.objects.filter(owner_project=0).exists():
                Company_name.objects.filter(owner_project=0).update(update_user=staff_user,name=company_name,time=datetime.now())
            else:
                Company_name.objects.create(update_user=staff_user,name=company_name)
            return HttpResponseRedirect('/global_manage/change_company_name/')
        else:
            error = '名称不能为空！'
            return render_to_response('global_manage/company_name.html',locals())

    return render_to_response('global_manage/company_name.html',locals())


@checkCdkey
@login_required
@views_permission
@is_superuser
def global_project_type(request,*args,**kwargs): #项目类型
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait


    project_types = chain(Project_type.objects.filter(owner=0))  # 0为默认类型

    return render_to_response('global_manage/project_type.html',locals())

@checkCdkey
@login_required
@views_permission
@is_superuser
def global_add_project_type(request,*args,**kwargs): #添加项目类型

    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    task_types = chain(Type.objects.filter(owner_project=0)) #0为默认
    task_prioritys = chain(Priority.objects.filter(owner_project=0))

    versions = chain(Versions.objects.filter(owner_project=0))
    task_components = chain(Component.objects.filter(owner_project=0))
    task_statuss = chain(Status.objects.filter(owner_project=0))
    milestones = chain(Milestone.objects.filter(owner_project=0))


    errors = []
    if request.method == 'POST':
        project_type_name = request.POST.get('project_type_name')
        task_type = request.POST.getlist('task_type')
        task_priority = request.POST.getlist('task_priority')
        task_component = request.POST.getlist('task_component')
        version_all = request.POST.getlist('version')
        task_status = request.POST.getlist('task_status')
        milestone_all = request.POST.getlist('milestone')

        project_type_names = []
        for project in Project.objects.all():
            for create_type in Project_type.objects.filter(owner=project.id).exclude(id=project.project_type.id):
                project_type_names.append(create_type.name)
        for base_type in Project_type.objects.filter(owner=0):
            project_type_names.append(base_type.name)
        if len(project_type_name.strip())>0 and project_type_name in project_type_names:
            errors.append('名称不能重名')
            return render_to_response('global_manage/add_project_type.html', locals())

        if project_type_name is not None and len(project_type_name.strip())>0:
            now_project_type = Project_type.objects.create(name=project_type_name,owner=0,creator=user_now)

            value = 0
            for type_id in task_type:
                if type_id is not None and len(type_id) > 0:
                    value += 1
                    type = Type.objects.get(id=type_id)
                    default = False
                    if value == 1:
                        default = True
                    new_type = Type.objects.create(name=type.name, value=value, owner_project=-1,
                                                   default=default)
                    now_project_type.task_type.add(new_type)

            value = 0
            for priority_id in task_priority:
                if priority_id is not None and len(priority_id) > 0:
                    value += 1
                    priority = Priority.objects.get(id=priority_id)
                    default = False
                    if value == 1:
                        default = True
                    new_priority = Priority.objects.create(name=priority.name, value=value, owner_project=-1,
                                                           default=default)
                    now_project_type.task_priority.add(new_priority)

            value = 0
            for component_id in task_component:
                if component_id is not None and len(component_id) > 0:
                    value += 1
                    component = Component.objects.get(id=component_id)
                    default = False
                    if value == 1:
                        default = True
                    new_component = Component.objects.create(name=component.name, description=component.description,
                                                             owner_project=-1, default=default)
                    now_project_type.task_component.add(new_component)

            value = 0
            for version_id in version_all:
                if version_id is not None and len(version_id) > 0:
                    value += 1
                    version = Versions.objects.get(id=version_id)
                    default = False
                    if value == 1:
                        default = True
                    new_version = Versions.objects.create(name=version.name, description=version.description,
                                                          owner_project=-1, default=default)
                    now_project_type.task_version.add(new_version)

            value = 0
            for status_id in task_status:
                if status_id is not None and len(status_id) > 0:
                    value += 1
                    status = Status.objects.get(id=status_id)
                    new_status = Status.objects.create(name=status.name, value=value, owner_project=-1)
                    now_project_type.task_status.add(new_status)

            value = 0
            for milestone_id in milestone_all:
                if milestone_id is not None and len(milestone_id) > 0:
                    value += 1
                    milestone = Milestone.objects.get(id=milestone_id)
                    default = False
                    if value == 1:
                        default = True
                    new_milestone = Milestone.objects.create(name=milestone.name, description=milestone.description,
                                                             owner_project=-1, default=default)
                    now_project_type.milestone.add(new_milestone)


                return HttpResponseRedirect('/global_manage/project_type/', locals())

        else:
            errors.append('请输入项目类型名称')



    return render_to_response('global_manage/add_project_type.html',locals())

@checkCdkey
@login_required
@views_permission
@is_superuser
def global_project_type_edit(request,*args,**kwargs): #项目类型修改
    project_type_id = kwargs['project_type_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    #项目类型
    project_filter = Project_type.objects.filter(id=project_type_id)

    project_type = Project_type.objects.get(id=project_type_id)
    task_types = project_type.task_type.all().order_by('value')
    task_prioritys = project_type.task_priority.all().order_by('value')
    task_versions = project_type.task_version.all()
    task_components = project_type.task_component.all()
    task_statuss = project_type.task_status.all().order_by('value')
    task_milestones = project_type.milestone.all()
    milestone_due_list = []
    for milestone in task_milestones:
        time_zone = milestone.due.astimezone(pytz.timezone('Asia/Shanghai'))
        list = str(time_zone).split('+')[0].replace('-','/').split(':')
        due_time = list[0]+':'+list[1]
        milestone_due_list.append({'due':due_time,'id':milestone.id})



    if request.method == 'POST':
        judge = request.POST.get('judge')
        default = request.POST.get('default')
        save = request.POST.get('save')
        delete = request.POST.get('delete')
        create = request.POST.get('create')

        id = request.POST.get('id')
        name = request.POST.get('name')
        if name:
            name = name.strip()
        value = request.POST.get('value')
        description = request.POST.get('description')
        due_time = request.POST.get('time')
        milestone_status = request.POST.get('milestone_status')

        if save or create:
            if len(name)<=0:
                return render_to_response('global_manage/project_type_edit.html', locals())

        if judge=='projectType':
            if save:
                if Project_type.objects.filter(owner=0,name=name).exclude(id=id):
                    name_error = '名称不能重名!'
                else:
                    project_type.name=name
                    project_type.save()
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)

            if delete:
                task_types.delete()
                task_prioritys.delete()
                task_versions.delete()
                task_components.delete()
                task_statuss.delete()
                task_milestones.delete()
                project_type.delete()

                return HttpResponseRedirect('/global_manage/project_type/')



        if judge=='type':
            if save:
                if Type.objects.filter(owner_project=0,name=name).exclude(id=id):
                    type_error = '修改的类型名称不能重名！'
                else:
                    others = project_type.task_type.filter(value=value).exclude(id=id)
                    if others.exists():
                        for type in project_type.task_type.all().exclude(id=id):
                            if type.value >= int(value):
                                type.value = type.value+1
                                type.save()
                    Type.objects.filter(id=id).update(name=name, value=value)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    type = Type.objects.get(id=id)
                    if not type.taskorder_set.all():
                        try:
                            if type.default == True:
                                new = project_type.task_type.all().order_by('id').exclude(id=id)[0]
                                new.default = True
                                new.save()
                        except:
                            pass
                        type.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                if not project_type.task_type.filter(name=name).exists():
                    try:
                        next_value = project_type.task_type.all().order_by('-value')[0].value+1
                    except:
                        next_value = 1
                    if project_type.task_type.all().exists():
                        new = Type.objects.create(name=name, value=next_value, owner_project=0)
                        project_type.task_type.add(new)
                    else:
                        new = Type.objects.create(name=name, value=next_value, owner_project=0, default=True)
                        project_type.task_type.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    type_error = '新建的类型名称不能重名！'
            if default:
                task_types.update(default=False)
                Type.objects.filter(id=id).update(default=True)
                return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)

        if judge=='priority':
            if save:
                if project_type.task_priority.filter(name=name).exists() and Priority.objects.filter(owner_project=0,name=name).exclude(id=id):
                    priority_error = '修改的优先级名称不能重名！'
                else:
                    others = project_type.task_priority.filter(value=value).exclude(id=id)
                    if others.exists():
                        for priority in project_type.task_priority.all().exclude(id=id):
                            if priority.value >= int(value):
                                priority.value = priority.value + 1
                                priority.save()
                    Priority.objects.filter(id=id).update(name=name, value=value)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    priority = Priority.objects.get(id=id)
                    if not priority.taskorder_set.all():
                        try:
                            if priority.default == True:
                                new = project_type.task_priority.all().order_by('id').exclude(id=id)[0]
                                new.default = True
                                new.save()
                        except:
                            pass
                        priority.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                if not project_type.task_priority.filter(name=name).exists():
                    try:
                        next_value = project_type.task_priority.all().order_by('-value')[0].value+1
                    except:
                        next_value = 1
                    if project_type.task_priority.all().exists():
                        new = Priority.objects.create(name=name, value=next_value, owner_project=0)
                        project_type.task_priority.add(new)
                    else:
                        new = Priority.objects.create(name=name, value=next_value, owner_project=0, default=True)
                        project_type.task_priority.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    priority_error = '新建的优先级名称不能重名！'
            if default:
                task_prioritys.update(default=False)
                Priority.objects.filter(id=id).update(default=True)
                return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)

        if judge=='status':
            if save:
                if project_type.task_status.filter(name=name).exists() and Status.objects.filter(owner_project=0,name=name).exclude(id=id):
                    status_error = '修改的状态名称不能重名！'
                else:
                    others = project_type.task_status.filter(value=value).exclude(id=id)
                    if others.exists():
                        for status in project_type.task_status.all().exclude(id=id):
                            if status.value >= int(value):
                                status.value = status.value + 1
                                status.save()
                    Status.objects.filter(id=id).update(name=name, value=value)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    status = Status.objects.get(id=id)
                    if not status.taskorder_set.all():
                        status.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                if not project_type.task_status.filter(name=name).exists():
                    try:
                        next_value = project_type.task_status.all().order_by('-value')[0].value+1
                    except:
                        next_value = 1
                    new = Status.objects.create(name=name, value=next_value, owner_project=0)
                    project_type.task_status.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    status_error = '新建的状态名称不能重名！'

        if judge=='component':
            if save:
                if project_type.task_component.filter(name=name).exists() and Component.objects.filter(owner_project=0,name=name).exclude(id=id):
                    component_error = '修改的组件名称不能重名！'
                else:
                    Component.objects.filter(id=id).update(name=name, description=description)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    component = Component.objects.get(id=id)
                    if not component.taskorder_set.all():
                        try:
                            if component.default == True:
                                new = project_type.task_component.all().order_by('id').exclude(id=id)[0]
                                new.default = True
                                new.save()
                        except:
                            pass
                        component.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                if not project_type.task_component.filter(name=name).exists():
                    if project_type.task_component.all().exists():
                        new = Component.objects.create(name=name, description=description, owner_project=0)
                        project_type.task_component.add(new)
                    else:
                        new = Component.objects.create(name=name, description=description, owner_project=0,default=True)
                        project_type.task_component.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    component_error = '新建的组件名称不能重名！'
            if default:
                task_components.update(default=False)
                Component.objects.filter(id=id).update(default=True)
                return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)

        if judge=='version':
            if save:
                if project_type.task_version.filter(name=name).exists() and Versions.objects.filter(owner_project=0,name=name).exclude(id=id):
                    version_error = '修改的版本名称不能重名！'
                else:
                    Versions.objects.filter(id=id).update(name=name, description=description)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    version = Versions.objects.get(id=id)
                    if not version.taskorder_set.all():
                        try:
                            if version.default == True:
                                new = project_type.task_version.all().order_by('id').exclude(id=id)[0]
                                new.default = True
                                new.save()
                        except:
                            pass
                        version.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                if not project_type.task_version.filter(name=name).exists():
                    if project_type.task_version.all().exists():
                        new = Versions.objects.create(name=name, description=description, owner_project=0,)
                        project_type.task_version.add(new)
                    else:
                        new = Versions.objects.create(name=name, description=description, owner_project=0,default=True)
                        project_type.task_version.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    version_error = '新建的版本名称不能重名！'
            if default:
                task_versions.update(default=False)
                Versions.objects.filter(id=id).update(default=True)
                return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)

        if judge=='milestone':
            if save:
                if project_type.milestone.filter(name=name).exists() and Milestone.objects.filter(owner_project=0,name=name).exclude(id=id):
                    milestone_error = '修改的里程碑名称不能重名！'
                else:
                    try:
                        time = datetime.strptime(due_time, '%Y/%m/%d %H:%M')
                        Milestone.objects.filter(id=id).update(name=name, description=description,due=time,milestone_status=milestone_status)
                        return HttpResponseRedirect('/global_manage/project_type_edit/'+project_type_id)
                    except:
                        Milestone.objects.filter(id=id).update(name=name, description=description,milestone_status=milestone_status)
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
            if delete:
                try:
                    milestone= Milestone.objects.get(id=id)
                    if not milestone.taskorder_set.all():
                        try:
                            if milestone.default == True:
                                new = project_type.milestone.all().order_by('id').exclude(id=id)[0]
                                new.default = True
                                new.save()
                        except:
                            pass
                        milestone.delete()
                        return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                except:
                    pass
            if create:
                try:
                    time = datetime.strptime(due_time, '%Y/%m/%d %H:%M')
                except:
                    time = datetime.now()
                if not project_type.milestone.filter(name=name).exists():
                    if project_type.milestone.all().exists():
                        new = Milestone.objects.create(name=name, description=description, due=time,owner_project=0,)
                        new.due = time
                        new.save()
                        project_type.milestone.add(new)
                    else:
                        new = Milestone.objects.create(name=name, description=description, due=time, owner_project=0,default=True)
                        new.due = time
                        new.save()
                        project_type.milestone.add(new)
                    return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)
                else:
                    milestone_error = '新建的里程碑名称不能重名！'
            if default:
                task_milestones.update(default=False)
                Milestone.objects.filter(id=id).update(default=True)
                return HttpResponseRedirect('/global_manage/project_type_edit/' + project_type_id)



    return render_to_response('global_manage/project_type_edit.html',locals())

@checkCdkey
@login_required
@views_permission
@is_superuser
def global_project_interface_edit(request,*args,**kwargs): #项目界面修改
    project_type_id = kwargs['project_type_id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    project_filter = Project_type.objects.filter(id=project_type_id)
    project_type = project_filter

    project_name = project_type[0].name
    task_types = project_type[0].task_type.all().order_by('value')
    task_prioritys = project_type[0].task_priority.all().order_by('value')

    gantt_css = project_type[0].gantt_skin
    gantt_task_height = project_type[0].gantt_task_height
    gantt_row_height =  project_type[0].gantt_row_height
    scheduler_css = project_type[0].scheduler_skin


    if request.method == 'POST':
        change = request.POST.get('change')
        type_id = request.POST.get('type_id')
        color = request.POST.get('color')
        textColor = request.POST.get('textColor')
        progressColor = request.POST.get('progressColor')
        gantt_skin = request.POST.get('gantt_skin')
        gantt_task_height = request.POST.get('gantt_task_height')
        gantt_row_height = request.POST.get('gantt_row_height')
        scheduler_skin = request.POST.get('scheduler_skin')
        judge = request.POST.get('judge')

        if judge == 'gantt_color':
            if change:
                Type.objects.filter(id=type_id).update(color=color,textColor=textColor, progressColor=progressColor)
                return HttpResponseRedirect('/global_manage/project_interface_edit/'+project_type_id)

        if judge=="priority":  #修改优先级颜色
            if change :
                Priority.objects.filter(id=type_id).update(color=color,textColor=textColor)
                return HttpResponseRedirect('/global_manage/project_interface_edit/' + project_type_id)
        if judge == 'gantt_skin':
            project_type.update(gantt_skin=gantt_skin)
            return HttpResponseRedirect('/global_manage/project_interface_edit/'+project_type_id)

        if judge == 'gantt_height':
            if change:
                if len(gantt_task_height.strip()) !=0 and len(gantt_row_height.strip()) !=0:
                    project_type.update(gantt_task_height=gantt_task_height,gantt_row_height=gantt_row_height)
                    return HttpResponseRedirect('/global_manage/project_interface_edit/'+project_type_id)
                else:
                    error = '高度不能为空！'
                    return render_to_response('global_manage/project_interface_edit.html', locals())

        if judge=='scheduler_skin':
            project_type.update(scheduler_skin=scheduler_skin)
            return HttpResponseRedirect('/global_manage/project_interface_edit/' + project_type_id)

    return render_to_response('global_manage/project_interface_edit.html', locals())

from createtree import mkdir
