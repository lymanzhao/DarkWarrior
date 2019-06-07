#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
from datetime import timedelta
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
from permissions import user_permissions


def create_task(request,task, project, project_archive, display_id,parent=0): #跨项目复制任务单函数    2016-10-14 lizhiwen
    '''
    :param task: 当前任务单对象
    :param project: 要复制到的项目对象
    :param project_archive: 当前项目对象
    :param display_id: 任务单显示id
    :param parent: 任务单父id
    :return: 新任务单对象
    '''

    user_now = request.session.get('USERNAME', False)
    author = User.objects.get(username=user_now)
    selected_project_id = request.POST.get('selected_project')

    project_type = project.project_type

    milestone = project_type.milestone.filter(owner_project=selected_project_id, default=True)[0]
    priority = project_type.task_priority.filter(owner_project=selected_project_id, default=True)[0]
    component = project_type.task_component.filter(owner_project=selected_project_id, default=True)[0]
    type = project_type.task_type.filter(owner_project=selected_project_id, default=True)[0]
    version = project_type.task_version.filter(owner_project=selected_project_id, default=True)[0]
    status = project_type.task_status.all()[0]


    # 创建单独任务单
    task_object = Taskorder.objects.create(milestone=milestone, priority=priority, status=status,
                                           component=component, type=type, version=version, creator=author,
                                           display_id=display_id,
                                           reporter=user_now, summary=task.summary, owner_project=project,
                                           start_date=task.start_date,
                                           duration=task.duration, end_date=task.end_date,
                                           predict_start_date=task.predict_start_date,
                                           predict_duration=task.predict_duration,
                                           predict_end_date=task.predict_end_date, progress=task.progress,
                                           sortorder=task.sortorder, parent=parent, storypoint=task.storypoint,
                                           time_length=task.time_length, notes=task.notes,
                                           scene=task.scene, take=task.take)
    if task.description:
        Taskorder.objects.filter(id=task_object.id).update(description=task.description)

        # if task.owner:
        # Taskorder.objects.filter(id=task_object.id).update(owner=task.owner)

    if task.grade:
        Taskorder.objects.filter(id=task_object.id).update(grade=task.grade)

    if task.roll:
        Taskorder.objects.filter(id=task_object.id).update(roll=task.roll)

    if task.task_image:
        task_image_url = os.path.join(MEDIA_ROOT, str(task.task_image)).replace('\\', '/')
        task_image_copy = str(task.task_image).split('/')[0] + os.sep + str(time.time()) + \
                          str(task.task_image).split('/')[1]
        Taskorder.objects.filter(id=task_object.id).update(task_image=task_image_copy)
        copy_image_url = os.path.join(MEDIA_ROOT, task_image_copy).replace('\\', '/')
        os.system('cp %s %s' % (task_image_url, copy_image_url))

    if Comment.objects.filter(owner_task=task, owner_project=project_archive):  # 创建评论
        comment_id_change = {}
        for comment in Comment.objects.filter(owner_task=task, owner_project=project_archive):
            comment_object = Comment.objects.create(content=comment.content, time=comment.time,
                                                    owner=comment.owner,
                                                    owner_task=task_object, owner_project=project,
                                                    )

            comment_id_change['%s' % comment.id] = '%s' % comment_object.id

            if comment.parent_id != '0':
                Comment.objects.filter(id=comment_object.id).update(parent_id=comment_id_change[comment.parent_id])
            if comment.at_people:
                Comment.objects.filter(id=comment_object.id).update(at_people=comment.at_people)
            if comment.owner:
                Comment.objects.filter(id=comment_object.id).update(owner=comment.owner)
            if comment.author:
                Comment.objects.filter(id=comment_object.id).update(author=comment.author)

    if Attachment_file.objects.filter(owner=task, owner_project=project_archive):  # 创建文件附件

        for attachment_file in Attachment_file.objects.filter(owner=task, owner_project=project_archive):

            attachment_file_url = os.path.join(MEDIA_ROOT, str(attachment_file.url)).replace('\\', '/')
            attachment_file_copy = str(attachment_file.url).split('/')[0] + os.sep + \
                                   str(attachment_file.url).split('/')[1] + os.sep + str(time.time()) + \
                                   str(attachment_file.url).split('/')[2]

            attachment_file_object = Attachment_file.objects.create(url=attachment_file_copy,
                                                                    author=attachment_file.author,
                                                                    owner=task_object,
                                                                    owner_project=project)

            if int(attachment_file.owner_comment) != 0:
                Attachment_file.objects.filter(id=attachment_file_object.id).update(
                    owner_comment=comment_id_change[attachment_file.owner_comment])

            copy_attachment_file_url = os.path.join(MEDIA_ROOT, attachment_file_copy).replace('\\', '/')
            os.system('cp %s %s' % (attachment_file_url, copy_attachment_file_url))

            if attachment_file.name:
                Attachment_file.objects.filter(id=attachment_file_object.id).update(
                    name=attachment_file.name)

    if Attachment_video.objects.filter(owner=task, owner_project=project_archive):  # 创建视频附件

        for attachment_video in Attachment_video.objects.filter(owner=task, owner_project=project_archive):

            attachment_video_url = os.path.join(MEDIA_ROOT, str(attachment_video.url)).replace('\\', '/')
            attachment_video_copy = str(attachment_video.url).split('/')[0] + os.sep + \
                                    str(attachment_video.url).split('/')[1] + os.sep + str(time.time()) + \
                                    str(attachment_video.url).split('/')[2]

            attachment_video_object = Attachment_video.objects.create(url=attachment_video_copy,
                                                                      author=attachment_video.author,
                                                                      owner=task_object,
                                                                      owner_project=project)

            if int(attachment_video.owner_comment) != 0:
                Attachment_video.objects.filter(id=attachment_video_object.id).update(
                    owner_comment=comment_id_change[attachment_video.owner_comment])

            copy_attachment_video = os.path.join(MEDIA_ROOT, attachment_video_copy).replace('\\', '/')
            os.system('cp %s %s' % (attachment_video_url, copy_attachment_video))

            if attachment_video.name:
                Attachment_video.objects.filter(id=attachment_video_object.id).update(
                    name=attachment_video.name)

    if Attachment_image.objects.filter(owner=task, owner_project=project_archive):  # 创建图片附件

        for attachment_image in Attachment_image.objects.filter(owner=task, owner_project=project_archive):

            attachment_image_url = os.path.join(MEDIA_ROOT, str(attachment_image.url)).replace('\\', '/')

            attachment_image_copy = str(attachment_image.url).split('/')[0] + os.sep + \
                                    str(attachment_image.url).split('/')[1] + os.sep + str(time.time()) + \
                                    str(attachment_image.url).split('/')[2]

            attachment_image_object = Attachment_image.objects.create(url=attachment_image_copy,
                                                                      author=attachment_image.author,
                                                                      owner=task_object,
                                                                      owner_project=project)

            if int(attachment_image.owner_comment) != 0:
                Attachment_image.objects.filter(id=attachment_image_object.id).update(
                    owner_comment=comment_id_change[attachment_image.owner_comment])

            copy_attachment_image = os.path.join(MEDIA_ROOT, attachment_image_copy).replace('\\', '/')
            os.system('cp %s %s' % (attachment_image_url, copy_attachment_image))

            if attachment_image.name:
                Attachment_image.objects.filter(id=attachment_image_object.id).update(
                    name=attachment_image.name)

    if TaskList.objects.filter(onwer_task=task):  # 创建任务清单
        for tasklist in TaskList.objects.filter(onwer_task=task):
            TaskList.objects.create(title=tasklist.title, onwer_task=task_object,
                                    start_date=tasklist.start_date, end_date=tasklist.end_date,
                                    status=tasklist.status)

    return task_object


def movetask(request,parenttask,project_archive,project):           #跨项目移动任务单函数    2016-10-14 lizhiwen
    '''
    :param parenttask: 父任务对象
    :param project_archive: 当前项目对象
    :param project: 要复制到的项目对象
    '''
    selected_project_id = request.POST.get('selected_project')

    project_type = project.project_type

    milestone = project_type.milestone.filter(owner_project=selected_project_id, default=True)[0]
    priority = project_type.task_priority.filter(owner_project=selected_project_id, default=True)[0]
    component = project_type.task_component.filter(owner_project=selected_project_id, default=True)[0]
    type = project_type.task_type.filter(owner_project=selected_project_id, default=True)[0]
    version = project_type.task_version.filter(owner_project=selected_project_id, default=True)[0]
    status = project_type.task_status.all()[0]

    task_num = Taskorder.objects.filter(owner_project=project, parent=0).count()
    if task_num == 0:
        task_display_id = 1
    else:
        display_id_list = []
        for task_objects in Taskorder.objects.filter(owner_project=project, parent=0):
            display_id_list.append(int(task_objects.display_id))
        display_id_list.sort()
        task_display_id = display_id_list[-1] + 1


    Taskorder.objects.filter(owner_project=project_archive, id=parenttask.id).update(owner_project=project, type=type,
                                                                                     milestone=milestone,
                                                                                     priority=priority,
                                                                                     status=status, component=component,
                                                                                     version=version,
                                                                                     display_id=task_display_id)



    if Attachment_file.objects.filter(owner_project=project_archive, owner=parenttask):
        Attachment_file.objects.filter(owner=parenttask).update(owner_project=project)

    if Attachment_video.objects.filter(owner_project=project_archive, owner=parenttask):
        Attachment_video.objects.filter(owner=parenttask).update(owner_project=project)

    if Attachment_image.objects.filter(owner_project=project_archive, owner=parenttask):
        Attachment_image.objects.filter(owner=parenttask).update(owner_project=project)

    if Comment.objects.filter(owner_project=project_archive, owner_task=parenttask):
        Comment.objects.filter(owner_task=parenttask).update(owner_project=project)

    if Repository.objects.filter(owner_task=parenttask):
        Repository.objects.filter(owner_task=parenttask).update(project_id=project)

    if Message.objects.filter(owner_project=project_archive, owner_task=parenttask):
        Message.objects.filter(owner_task=parenttask).update(owner_project=project)

    if Taskorder.objects.filter(owner_project=project_archive, parent=parenttask.id):
        num = 0
        for child_task in Taskorder.objects.filter(owner_project=project_archive, parent=parenttask.id):
            num += 1
            child_display_id = str(Taskorder.objects.get(owner_project=project, id=parenttask.id).display_id) + '-' + str(num)

            Taskorder.objects.filter(owner_project=project_archive, id=child_task.id).update(owner_project=project, type=type, milestone=milestone, priority=priority,
                                                                                             status=status, component=component, version=version, display_id=child_display_id)

            if Attachment_file.objects.filter(owner_project=project_archive, owner=child_task):
                Attachment_file.objects.filter(owner=child_task).update(owner_project=project)

            if Attachment_video.objects.filter(owner_project=project_archive, owner=child_task):
                Attachment_video.objects.filter(owner=child_task).update(owner_project=project)

            if Attachment_image.objects.filter(owner_project=project_archive, owner=child_task):
                Attachment_image.objects.filter(owner=child_task).update(owner_project=project)

            if Comment.objects.filter(owner_project=project_archive, owner_task=child_task):
                Comment.objects.filter(owner_task=child_task).update(owner_project=project)

            if Repository.objects.filter(owner_task=child_task):
                Repository.objects.filter(owner_task=child_task).update(project_id=project)

            if Message.objects.filter(owner_project=project_archive, owner_task=child_task):
                Message.objects.filter(owner_task=child_task).update(owner_project=project)


@checkCdkey
@login_required
@views_permission
def task_contents(request,*args,**kwargs):     #任务单详情 
    project_archive = kwargs['project']  #项目归档判断
    staff_user = kwargs['staff_user']
    url = kwargs['project_id']
    id = kwargs['id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    #权限检查
    task_member_list = []
    try:
        task_object = Taskorder.objects.get(id=id)
    except:
        error = '未找到该任务单，非法操作！'
        return render_to_response('permission_notice.html', locals())
    if project_archive.is_check_permission:

        if len(task_object.owner.strip())>0 or len(task_object.task_team.all())>0:
            task_member_list.append(task_object.creator)
            try:
                task_member_list.append(User.objects.get(username=task_object.reporter))
            except:
                pass
            for user_name in task_object.owner.split(','):
                try:
                    task_member_list.append(User.objects.get(username=user_name))
                except:
                    pass
            for team in task_object.task_team.all():
                for member in team.member.all():
                    task_member_list.append(member)
            task_member_list = list(set(task_member_list))
            if staff_user not in task_member_list and staff_user.is_superuser != True:
                error = '您没有该任务单的操作权限！'
                return render_to_response('permission_notice.html', locals())
            else:
                pass
        else:
            pass
    else:
        pass
    #end 权限检查

    host=request.get_host()

    project_type = project_archive.project_type
    milestones = project_type.milestone.all()
    prioritys = project_type.task_priority.all()
    statuss = project_type.task_status.all()
    components = project_type.task_component.all()
    types = project_type.task_type.all()
    versions = project_type.task_version.all()

    user = User.objects.get(username=user_now)
    user_all_permissions = user_permissions(user)
    project_manage_permissions = Permission.objects.get(view_name='manage', project_id=url)

    manage_status = statuss.order_by('-value')[0]
    all_status = list(statuss)
    all_status.pop()
    all_statuss = all_status

    if user.is_superuser:
        manage = True
    else:
        if project_manage_permissions in user_all_permissions:
            manage = True

    owner_project = Project.objects.get(id=url)

    child_tasks = Taskorder.objects.filter(parent=id)
    child_tasks_num = child_tasks.count()

    task = Taskorder.objects.get(id=id)
    repository_set=Repository.objects.filter(project_id=url,owner_task=task)
    if repository_set:
        repo_name=repository_set[0].name
        host_name='svn://'+host+'/'+repo_name
    all_team = Task_team.objects.filter(owner_project=url)    #任务团队 liuluyang 2016/07/28
    unselected_team = list(all_team)
    for team in task.task_team.all():
        unselected_team.remove(team)

    #chatroom
    chatroomname = str(task.id) + task.summary  # 聊天室名称
    if len(ChatUser.objects.filter(creator=user_now))>0:
        chatuser = ChatUser.objects.filter(creator=user_now)[0]  # 聊天用户
        chatuser_username = chatuser.username
        chatuser_password = base64.decodestring(chatuser.password)
    chat_errors = ''
    if len(ChatUser.objects.filter(creator=user_now)) <= 0:
        chat_errors = '您未注册聊天账户，请先注册!'


    taskStart_date = task.start_date.astimezone(pytz.timezone('Asia/Shanghai'))
    taskEnd_date = task.end_date.astimezone(pytz.timezone('Asia/Shanghai'))

    start_date_Array = time.strptime(str(taskStart_date).split('+')[0].split('.')[0], '%Y-%m-%d %H:%M:%S')
    task_start_date = time.strftime("%Y/%m/%d %H:%M", start_date_Array)

    end_date_Array = time.strptime(str(taskEnd_date).split('+')[0].split('.')[0], '%Y-%m-%d %H:%M:%S')
    task_end_date = time.strftime("%Y/%m/%d %H:%M", end_date_Array)

    if Taskorder.objects.filter(id=task.parent).exists():
        parent_task = Taskorder.objects.get(id=task.parent)
    if Taskorder.objects.filter(parent=id).exists():
        child_task = Taskorder.objects.filter(parent=id)


    if task.owner.split(',') is not None and len(task.owner)>0:
        task_owners = []
        for task_owner in task.owner.split(','):
            if User.objects.filter(username=task_owner):
                task_owners.append(User.objects.get(username=task_owner))

    #@用户
    condition = Taskorder.objects.get(id=id)
    at_people_list =  []
    at_people_list.append(condition.creator.username)
    if condition.owner is not None and len(condition.owner.strip())>0:
        at_people_list.append(condition.owner)
    if condition.reporter is not None and len(condition.reporter.strip())>0:
        at_people_list.append(condition.reporter)
    at_people_list = list(set(at_people_list))


    try:
        at_people_list.remove('None')
        at_people_list.remove('')
    except:
        pass



    attachment_images = Attachment_image.objects.filter(owner=id,owner_project=url,owner_comment=0).order_by('-time') #前端调取评论内容
    attachment_files = Attachment_file.objects.filter(owner=id,owner_project=url,owner_comment=0).order_by('-time')
    attachment_videos = Attachment_video.objects.filter(owner=id,owner_project=url,owner_comment=0).order_by('-time')
    if task.task_image:
        file_num = attachment_images.count()+attachment_files.count()+attachment_videos.count()+1
    else:
        file_num = attachment_images.count()+attachment_files.count()+attachment_videos.count()
    comment_all = []

    comment_parent = Comment.objects.filter(owner_task=id,owner_project=url,parent_id=0).order_by('-time')
    comment_num = Comment.objects.filter(owner_task=id,owner_project=url,parent_id=0).count()
    for comments in comment_parent:
        comment_child = Comment.objects.filter(owner_project=url,owner_task=id,parent_id=comments.id)
        comment_image = Attachment_image.objects.filter(owner_project=url,owner=id,owner_comment=comments.id)
        comment_file = Attachment_file.objects.filter(owner_project=url,owner=id,owner_comment=comments.id)
        comment_video = Attachment_video.objects.filter(owner_project=url,owner=id,owner_comment=comments.id)
        comment_all.append({'comment_parent':comments,'comment_child':comment_child,'comment_image':comment_image,
                            'comment_file':comment_file,'comment_video':comment_video})

    author = User.objects.get(username=user_now)
    owner = Taskorder.objects.get(id =id)

    ###########################################################################################################################################
    if request.method == 'POST':
        judge = request.POST.get('judge')

        if judge=="copy_task":  #复制任务
            selected_project_id = request.POST.get('selected_project')
            if selected_project_id is None:
                return HttpResponseRedirect('/%s/task/%s/' % (url,id))
            project = Project.objects.get(id=selected_project_id)
            task = Taskorder.objects.get(id=id)


            task_num = Taskorder.objects.filter(owner_project=project_archive).count()
            if task_num == 0:
                display_id = 1
            else:
                display_id_list = []
                for task_objects in Taskorder.objects.filter(owner_project=project, parent=0):
                    display_id_list.append(int(task_objects.display_id))
                display_id_list.sort()
                display_id = display_id_list[-1] + 1


            if int(task.parent) != 0:
                parent_task_object = create_task(request,task=Taskorder.objects.get(id=task.parent), project=project, project_archive=project_archive,display_id=display_id,parent=0)
                task_number = 0

                for task_child in Taskorder.objects.filter(owner_project=project_archive,parent=Taskorder.objects.get(id=task.parent).id):

                    task_number += 1
                    child_display_id = '%s-%s' % (parent_task_object.display_id, task_number)
                    create_task(request,task=task_child, project=project, project_archive=project_archive,display_id=child_display_id,parent=parent_task_object.id)

            else:
                parent_task_object = create_task(request,task=task, project=project, project_archive=project_archive,display_id=display_id, parent=0)

                task_number = 0

                for task_child in Taskorder.objects.filter(owner_project=project_archive,parent=task.id):
                    task_number += 1
                    child_display_id = '%s-%s' % (parent_task_object.display_id, task_number)
                    create_task(request,task=task_child, project=project, project_archive=project_archive,display_id=child_display_id,parent=parent_task_object.id)

            #TaskList.objects.create(title=list_name,onwer_task=owner)
            return HttpResponseRedirect('/%s/kanban/'%project.id,locals())



        if judge == "move_task":  # 移动任务
            selected_project_id = request.POST.get('selected_project')
            if selected_project_id is None:
                return HttpResponseRedirect('/%s/task/%s/' % (url, id))
            project = Project.objects.get(id=selected_project_id)
            task = Taskorder.objects.get(id=id)


            task_num = Taskorder.objects.filter(owner_project=project).count()



            if task_num == 0:
                task_display_id = 1
            else:
                display_id_list = []
                for task_objects in Taskorder.objects.filter(owner_project=project, parent=0):
                    display_id_list.append(int(task_objects.display_id))
                display_id_list.sort()
                task_display_id = display_id_list[-1] + 1
                #task_display_id = int(Taskorder.objects.filter(owner_project=project, parent=0).order_by('-display_id')[0].display_id) + 1


            if int(task.parent) != 0:
                parent_task = Taskorder.objects.get(owner_project=project_archive,id=task.parent)

                movetask(request,parenttask=parent_task,project_archive=project_archive,project=project)

            else:
                parent_task = Taskorder.objects.get(owner_project=project_archive, id=task.id)

                movetask(request,parenttask=parent_task,project_archive=project_archive,project=project)
            return HttpResponseRedirect('/%s/kanban/'%project.id,locals())


        ###################################################################################################################################################


        if judge=="add_list":  #添加任务清单
            list_name=request.POST.get('list_name')
            TaskList.objects.create(title=list_name,onwer_task=owner)
            return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())


        if judge=="commit_list": #提交清单起始时间和状态
            list_id=request.POST.get('list_id')
            list_start_date=request.POST.get('list_start_date')
            list_end_date=request.POST.get('list_end_date')
            list_status=request.POST.get('list_status')
            list_start_time = datetime.strptime(list_start_date, '%Y/%m/%d %H:%M')
            list_end_time = datetime.strptime(list_end_date, '%Y/%m/%d %H:%M')
            tasklist=TaskList.objects.filter(id=list_id).update(start_date=list_start_time,status=list_status,end_date=list_end_time)

            return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
        if judge == 'attachment_remove':#附件删除
            image_url_delete = request.POST.get('img_url_delete')
            file_url_delete = request.POST.get('file_url_delete')
            video_url_delete = request.POST.get('video_url_delete')
            task_image_url_delete = request.POST.get('task_img_url_delete')

            if task_image_url_delete is not None and len(task_image_url_delete)>0:
                Taskorder.objects.get(id=id).task_image.delete()
                task_image_url = os.path.join(MEDIA_ROOT,task_image_url_delete.split('/',2)[-1]).replace('\\','/')
                if os.path.isfile(task_image_url):
                    os.remove(task_image_url)
                return HttpResponseRedirect('/%s/task/%s'%(url,id))

            if image_url_delete is not None and len(image_url_delete)>0:
                Attachment_image.objects.get(url=image_url_delete).delete()
                image_delete_url = os.path.join(MEDIA_ROOT,image_url_delete).replace('\\','/')
                if os.path.isfile(image_delete_url):
                    os.remove(image_delete_url)
                return HttpResponseRedirect('/%s/task/%s/'%(url,id))
            elif video_url_delete is not None and len(video_url_delete)>0:
                Attachment_video.objects.get(url=video_url_delete).delete()
                video_delete_url = os.path.join(MEDIA_ROOT,video_url_delete).replace('\\','/')
                if os.path.isfile(video_delete_url):
                    os.remove(video_delete_url)
                return HttpResponseRedirect('/%s/task/%s/'%(url,id))
            elif file_url_delete is not None and len(file_url_delete)>0:
                Attachment_file.objects.get(url=file_url_delete).delete()
                file_delete_url = os.path.join(MEDIA_ROOT,file_url_delete).replace('\\','/')
                if os.path.isfile(file_delete_url):
                    os.remove(file_delete_url)
                return HttpResponseRedirect('/%s/task/%s/'%(url,id))

        if judge == 'reply':
            comment = request.POST.get('comment')
            parent_id = request.POST.get('parent_id')
            reply = request.POST.get('reply')

            if reply is not None and len(reply)>0: #回复
                comment_object =  Comment.objects.create(content=comment,author=reply,parent_id=parent_id,owner=User.objects.get(username=user_now),
                                                         owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url))

                if user_now != reply:
                    if User.objects.filter(username=reply).exists():
                        message_2 = Message.objects.create(name='reply',classify='comment',reminder=User.objects.get(username=reply),promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                           owner_project=Project.objects.get(id=url),comment_id = comment_object.id)
                return HttpResponseRedirect('/%s/task/%s'%(url,id))

        comment_errors = []
        if judge == 'comment':
            comment = request.POST.get('comment')
            at_people = request.POST.getlist('at_people')
            at_team = request.POST.getlist('at_team')
            comment_filed = request.FILES.get('comment_attachment')

            if comment is not None and len(comment.strip()) > 0:   #评论
                if len(at_people) <= 0 and len(at_team)<=0:
                    comment_object = Comment.objects.create(content=comment,at_people=condition.creator.username,
                                                            owner=User.objects.get(username=user_now),
                                                            owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url))


                    if user_now != condition.creator.username:
                        message_2 = Message.objects.create(name='comment',classify='comment',reminder=condition.creator,
                                                           promulgator=user_now,owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url),comment_id = comment_object.id)
                    if comment_filed is not None:     #评论附件上传
                        comment_filed_name = comment_filed.name.split('.')[-1]

                        image_class = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
                        video_class = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
                        if len(comment_filed) > 0:
                            if comment_filed_name == 'tiff':
                                comment_errors.append('您上传的图片web不支持显示')
                                return render_to_response('task_content.html',locals())
                            elif comment_filed_name in image_class:
                                submit_attachment = Attachment_image(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                            elif comment_filed_name in video_class:
                                submit_attachment = Attachment_video(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                            else:
                                submit_attachment = Attachment_file(url=comment_filed,name=comment_filed.name,author=author,owner_comment=comment_object.id,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())


                    return HttpResponseRedirect('/%s/task/%s'%(url,id))

                else:
                    at_p = ''
                    for user_name in at_people:
                        at_p = at_p + user_name + ' '

                    for team_id in at_team:
                        try:
                            at_p = at_p + Task_team.objects.get(id=team_id).name + ' '
                        except:
                            pass
                    comment_object=Comment.objects.create(content=comment,at_people=at_p,owner=User.objects.get(username=user_now),
                                                          owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url))

                    at_message_list=[]
                    for user in at_people:
                        for user_name in user.split(','):
                            at_message_list.append(user_name)
                    at_message_list=list(set(at_message_list))
                    for user_name in at_message_list:
                        at_people = User.objects.get(username=user_name)
                        if user_now != user_name:
                            message_2 = Message.objects.create(name='comment',classify='comment',reminder=at_people,
                                                               promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                               owner_project=Project.objects.get(id=url),comment_id = comment_object.id)

                    at_team_list = []
                    for team_id in at_team:
                        try:
                            for member in Task_team.objects.get(id=team_id).member.all():
                                at_team_list.append(member)
                        except:
                            pass
                    at_team_list = list(set(at_team_list))
                    for user in at_team_list:
                        if user.username != user_now:
                            message_2 = Message.objects.create(name='team_comment', classify='team_comment', reminder=user,
                                                                   promulgator=user_now,
                                                                   owner_task=Taskorder.objects.get(id=id),
                                                                   owner_project=Project.objects.get(id=url),
                                                                   comment_id=comment_object.id)

                    if comment_filed is not None:     #评论附件上传
                        comment_filed_name = comment_filed.name.split('.')[-1]

                        image_class = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
                        video_class = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
                        if len(comment_filed) > 0:
                            if comment_filed_name == 'tiff':
                                comment_errors.append('您上传的图片web不支持显示')
                                return render_to_response('task_content.html',locals())
                            elif comment_filed_name in image_class:
                                submit_attachment = Attachment_image(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                            elif comment_filed_name in video_class:
                                submit_attachment = Attachment_video(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                            else:
                                submit_attachment = Attachment_file(url=comment_filed,name=comment_filed.name,author=author,owner_comment=comment_object.id,owner=owner,owner_project=owner_project)
                                submit_attachment.save()
                                return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                    return HttpResponseRedirect('/%s/task/%s'%(url,id))
            else:
                if comment_filed is not None:     #评论附件上传
                    comment_object = Comment.objects.create(content='',at_people=condition.creator.username,
                                                            owner=User.objects.get(username=user_now),
                                                            owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url))
                    if user_now != condition.creator.username:
                        message_2 = Message.objects.create(name='comment',classify='comment',reminder=condition.creator,
                                                           promulgator=user_now,owner_task=Taskorder.objects.get(id=id),owner_project=Project.objects.get(id=url),comment_id = comment_object.id)

                    comment_filed_name = comment_filed.name.split('.')[-1]

                    image_class = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
                    video_class = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
                    if len(comment_filed) > 0:
                        if comment_filed_name == 'tiff':
                            comment_errors.append('您上传的图片web不支持显示')
                            return render_to_response('task_content.html',locals())
                        elif comment_filed_name in image_class:
                            submit_attachment = Attachment_image(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                            submit_attachment.save()
                            return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                        elif comment_filed_name in video_class:
                            submit_attachment = Attachment_video(url=comment_filed,name=comment_filed.name,owner_comment=comment_object.id,author=author,owner=owner,owner_project=owner_project)
                            submit_attachment.save()
                            return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                        else:
                            submit_attachment = Attachment_file(url=comment_filed,name=comment_filed.name,author=author,owner_comment=comment_object.id,owner=owner,owner_project=owner_project)
                            submit_attachment.save()
                            return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                            #return HttpResponseRedirect('/%s/task/%s'%(url,id))
        delete_comment = request.POST.get('delete_comment')
        if judge =="delete_comment":
            #print delete_comment,'delete '
            Comment.objects.filter(id=delete_comment).delete()
            Comment.objects.filter(parent_id=delete_comment).delete()
            Message.objects.filter(comment_id=delete_comment).delete()


            return HttpResponseRedirect('/'+url+'/task/'+id,locals())



        #视频截屏
        screenshot_errors = []
        if judge == 'screenshot':
            screenshot_time = request.POST.get('screenshot_time')
            video_src = request.POST.get('video_src')
            #video_src.encode('utf8')
            video_path = os.path.join(MEDIA_ROOT,video_src).replace('\\','/')

            if len(screenshot_time)> 0:
                screenshot_storage_src = MEDIA_ROOT+os.sep+'attachment'+os.sep+'screenshot'
                #print screenshot_storage_src
                #screenshot_name = video_src.split('/')[-1].split('.')[0] + '-'+screenshot_time + '.jpg'

                video_src_split = video_src.split('/')[-1].split('.')
                video_src_split.pop()
                now_video_src = u''.join(video_src_split)
                screenshot_name = now_video_src + '-'+screenshot_time + '.jpg'

                import subprocess
                screenshot_storage = os.path.join(screenshot_storage_src,screenshot_name).replace('\\','/')
                screenshot_cmd = 'ffmpeg -ss %s -i %s -vframes 1 %s' %(screenshot_time,video_path,screenshot_storage)
                ffmpeg = subprocess.Popen(screenshot_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                #ffmpeg = os.system(screenshot_cmd)
                ff = ffmpeg.wait()
                if ff == 0:
                    #print screenshot_cmd
                    #print screenshot_name
                    #ss = open(MEDIA_ROOT+os.sep+"02.jpg", "rb")
                    #print ss.name

                    if Attachment_image.objects.filter(url='attachment/screenshot/%s'%screenshot_name,owner_comment=0,author=author,owner=owner,owner_project=owner_project).exists():
                        screenshot_errors.append('视频截屏图片已经存在')
                        return render_to_response('task_content.html',locals())
                    else:
                        submit_attachment = Attachment_image.objects.create(url='attachment/screenshot/%s'%screenshot_name,name=screenshot_name,owner_comment=0,author=author,owner=owner,owner_project=owner_project)

                    return HttpResponseRedirect('/'+url+'/task/'+id,locals())

            else:
                screenshot_errors.append('您的视频没有开始播放')
                return render_to_response('task_content.html',locals())

    change_task_errors = []
    if request.method == 'POST':  # 修改任务单
        judge = request.POST.get('judge')
        if judge == 'task_change':
            task_summary = request.POST.get('summary')
            type = request.POST.get('type')
            milestone = request.POST.get('milestone')
            component = request.POST.get('component')
            priority = request.POST.get('priority')
            version = request.POST.get('version')
            description = request.POST.get('content')

            task_image = request.FILES.get('task_image_url')
            start_date = request.POST.get('start_date')
            duration = request.POST.get('duration')
            end_date = request.POST.get('end_date')

            story_point = request.POST.get('story_point')

            if duration == 0:
                duration = 1
            if task_image is not None and len(task_image) > 0:
                if task.task_image:
                    remove_task_image = os.path.join(MEDIA_ROOT, str(task.task_image)).replace('\\', '/')
                    os.remove(remove_task_image)
                task.task_image = task_image
                task.save()

                message_image = []
                if Taskorder.objects.get(id=id).reporter:  # 图片消息
                    if user_now != Taskorder.objects.get(id=id).reporter:
                        message_image.append(Taskorder.objects.get(id=id).reporter)

                if Taskorder.objects.get(id=id).owner:
                    for user_name in Taskorder.objects.get(id=id).owner.split(','):
                        if user_now != user_name:
                            message_image.append(user_name)
                if Taskorder.objects.get(id=id).creator:
                    if user_now != Taskorder.objects.get(id=id).creator.username:
                        message_image.append(Taskorder.objects.get(id=id).creator.username)

                message_image_reminder = list(set(message_image))
                for reminder_user in message_image_reminder:
                    if User.objects.filter(username=reminder_user).exists():
                        message = Message.objects.create(name=task_image, classify='task_image',
                                                         reminder=User.objects.get(username=reminder_user),
                                                         promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                         owner_project=Project.objects.get(id=url))

                return HttpResponseRedirect('/%s/task/%s' % (url, id))

            if story_point is not None and len(story_point) > 0:
                if story_point != str(Taskorder.objects.get(id=id).storypoint):

                    message_story_point = []
                    if Taskorder.objects.get(id=id).reporter:  # 故事点消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_story_point.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_story_point.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_story_point.append(Taskorder.objects.get(id=id).creator.username)

                    message_story_point_reminder = list(set(message_story_point))
                    for reminder_user in message_story_point_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=story_point, classify='task_story_point',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(storypoint=story_point)
                return HttpResponseRedirect('/%s/task/%s' % (url, id))

            if start_date is not None and len(start_date) > 0:
                if start_date != Taskorder.objects.get(id=id).start_date:
                    start_date = datetime.strptime(start_date, '%Y/%m/%d %H:%M')
                    message_start_date = []
                    if Taskorder.objects.get(id=id).reporter:  # 起始时间消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_start_date.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_start_date.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_start_date.append(Taskorder.objects.get(id=id).creator.username)

                    message_start_date_reminder = list(set(message_start_date))
                    for reminder_user in message_start_date_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=start_date, classify='task_start_date',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(start_date=start_date)

                    # 更新甘特图持续时间
                    now_end_time = time.mktime(
                        time.strptime(str(Taskorder.objects.get(id=id).end_date).split('+')[0].split('.')[0], "%Y-%m-%d %H:%M:%S"))
                    now_start_time = time.mktime(
                        time.strptime(str(Taskorder.objects.get(id=id).start_date).split('+')[0].split('.')[0], "%Y-%m-%d %H:%M:%S"))
                    duration_timestamip = int(now_end_time) - int(now_start_time)
                    duration = duration_timestamip / 86400

                    if duration == 0:
                        duration = 1

                    Taskorder.objects.filter(id=id).update(duration=duration)
                return HttpResponseRedirect('/%s/task/%s' % (url, id))
            if end_date is not None and len(end_date) > 0:
                if end_date != Taskorder.objects.get(id=id).end_date:
                    now_end_date = end_date
                    end_date = datetime.strptime(end_date, '%Y/%m/%d %H:%M')
                    # print datetime.strptime(start_date,'%Y/%m/%d %H:%M')
                    message_end_date = []
                    if Taskorder.objects.get(id=id).reporter:  # 结束时间消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_end_date.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_end_date.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_end_date.append(Taskorder.objects.get(id=id).creator.username)

                    message_end_date_reminder = list(set(message_end_date))
                    for reminder_user in message_end_date_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=end_date, classify='task_end_date',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))

                    start_timestamp = time.mktime(
                        time.strptime(str(Taskorder.objects.get(id=id).start_date).split('+')[0].split('.')[0], "%Y-%m-%d %H:%M:%S"))
                    end_date_timestamp = time.mktime(time.strptime(str(end_date), "%Y-%m-%d %H:%M:%S"))
                    if end_date_timestamp < start_timestamp:
                        change_task = 'false'
                        task_end_date = now_end_date
                        # change_task_errors.append('完成时间小于开始时间')
                        return render_to_response('task_content.html', locals())
                    else:
                        Taskorder.objects.filter(id=id).update(end_date=end_date)

                    # 更新甘特图持续时间
                    now_end_time = time.mktime(
                        time.strptime(str(Taskorder.objects.get(id=id).end_date).split('+')[0].split('.')[0], "%Y-%m-%d %H:%M:%S"))
                    now_start_time = time.mktime(
                        time.strptime(str(Taskorder.objects.get(id=id).start_date).split('+')[0].split('.')[0], "%Y-%m-%d %H:%M:%S"))
                    duration_timestamip = int(now_end_time) - int(now_start_time)
                    duration = duration_timestamip / 86400

                    if duration == 0:
                        duration = 1

                    Taskorder.objects.filter(id=id).update(duration=duration)
                return HttpResponseRedirect('/%s/task/%s' % (url, id))

            if duration is not None:
                if duration != str(Taskorder.objects.get(id=id).duration):
                    message_duration = []
                    if Taskorder.objects.get(id=id).reporter:  # 持续时间消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_duration.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_duration.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_duration.append(Taskorder.objects.get(id=id).creator.username)

                    message_duration_reminder = list(set(message_duration))
                    for reminder_user in message_duration_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=duration, classify='task_duration',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    if duration == 0:
                        duration = 1
                    Taskorder.objects.filter(id=id).update(duration=duration)
                return HttpResponseRedirect('/%s/task/%s' % (url, id))

            if task_summary is not None and len(task_summary) > 0:

                if task_summary != Taskorder.objects.get(id=id).summary:

                    message_summary = []
                    if Taskorder.objects.get(id=id).reporter:  # 概述消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_summary.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_summary.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_summary.append(Taskorder.objects.get(id=id).creator.username)

                    message_summary_reminder = list(set(message_summary))
                    for reminder_user in message_summary_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=task_summary, classify='task_summary',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(summary=task_summary)
                if description is not None and len(description) > 0:
                    if description != Taskorder.objects.get(id=id).description:

                        message_description = []
                        if Taskorder.objects.get(id=id).reporter:  # 描述消息
                            if user_now != Taskorder.objects.get(id=id).reporter:
                                message_description.append(Taskorder.objects.get(id=id).reporter)

                        if Taskorder.objects.get(id=id).owner:
                            for user_name in Taskorder.objects.get(id=id).owner.split(','):
                                if user_now != user_name:
                                    message_description.append(user_name)
                        if Taskorder.objects.get(id=id).creator:
                            if user_now != Taskorder.objects.get(id=id).creator.username:
                                message_description.append(Taskorder.objects.get(id=id).creator.username)

                        message_description_reminder = list(set(message_description))
                        for reminder_user in message_description_reminder:
                            if User.objects.filter(username=reminder_user).exists():
                                message = Message.objects.create(name=description, classify='task_description',
                                                                 reminder=User.objects.get(username=reminder_user),
                                                                 promulgator=user_now,
                                                                 owner_task=Taskorder.objects.get(id=id),
                                                                 owner_project=Project.objects.get(id=url))
                        Taskorder.objects.filter(id=id).update(description=description)

            if type is not None and len(type) > 0:
                if type != str(Taskorder.objects.get(id=id).type.id):

                    message_type = []
                    if Taskorder.objects.get(id=id).reporter:  # 任务单类型消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_type.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_type.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_type.append(Taskorder.objects.get(id=id).creator.username)

                    message_type_reminder = list(set(message_type))
                    for reminder_user in message_type_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=Type.objects.get(id=type).name, classify='task_type',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(type=Type.objects.get(id=type))
                return HttpResponseRedirect('/%s/task/%s' % (url, id))
            if milestone is not None and len(milestone) > 0:
                if milestone != str(Taskorder.objects.get(id=id).milestone.id):

                    message_milestone = []
                    if Taskorder.objects.get(id=id).reporter:  # 里程碑消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_milestone.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_milestone.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_milestone.append(Taskorder.objects.get(id=id).creator.username)

                    message_milestone_reminder = list(set(message_milestone))
                    for reminder_user in message_milestone_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=Milestone.objects.get(id=milestone).name,
                                                             classify='task_milestone',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(milestone=Milestone.objects.get(id=milestone))
                return HttpResponseRedirect('/%s/task/%s' % (url, id))
            if component is not None and len(component) > 0:
                if component != str(Taskorder.objects.get(id=id).component.id):

                    message_component = []
                    if Taskorder.objects.get(id=id).reporter:  # 组件消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_component.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_component.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_component.append(Taskorder.objects.get(id=id).creator.username)

                    message_component_reminder = list(set(message_component))
                    for reminder_user in message_component_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=Component.objects.get(id=component).name,
                                                             classify='task_component',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(component=Component.objects.get(id=component))
                return HttpResponseRedirect('/%s/task/%s' % (url, id))
            if priority is not None and len(priority) > 0:
                if priority != str(Taskorder.objects.get(id=id).priority.id):

                    message_priority = []
                    if Taskorder.objects.get(id=id).reporter:  # 优先级消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_priority.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_priority.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_priority.append(Taskorder.objects.get(id=id).creator.username)

                    message_priority_reminder = list(set(message_priority))
                    for reminder_user in message_priority_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=Priority.objects.get(id=priority).name,
                                                             classify='task_priority',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(priority=Priority.objects.get(id=priority))

            if version is not None and len(version) > 0:
                if version != str(Taskorder.objects.get(id=id).version.id):

                    message_version = []
                    if Taskorder.objects.get(id=id).reporter:  # 版本消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_version.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_version.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_version.append(Taskorder.objects.get(id=id).creator.username)

                    message_version_reminder = list(set(message_version))
                    for reminder_user in message_version_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=Versions.objects.get(id=version).name,
                                                             classify='task_version',
                                                             reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now, owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))
                    Taskorder.objects.filter(id=id).update(version=Versions.objects.get(id=version))
                return HttpResponseRedirect('/%s/task/%s' % (url, id))

            task = Taskorder.objects.get(id=id)
            return HttpResponseRedirect('/%s/task/%s' % (url, id))


        owner_errors = []
        if judge == 'task_update':
            task_owner_name = request.POST.get('owner')
            task_reporter = request.POST.get('reporter')
            status = request.POST.get('status')
            task_team = request.POST.getlist('task_team')

            if task_owner_name != Taskorder.objects.get(id=id).owner:
                if task_owner_name.split(',') is not None and len(task_owner_name)>0:
                    task_owners = ''
                    for task_owner in task_owner_name.split(','):
                        if User.objects.filter(username=task_owner):
                            task_owners = task_owners + task_owner + ','
                    owner_list=list(task_owners)
                    if len(owner_list)>0:
                        owner_list.pop()
                    owner = "".join(owner_list)
                    Taskorder.objects.filter(id=id).update(owner=owner)

                    message_owner = []
                    if Taskorder.objects.get(id=id).reporter: #属主消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_owner.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        if user_now != Taskorder.objects.get(id=id).owner:
                            if user_now.split(',') is not None and len(user_now)>0:
                                for task_owner in user_now.split(','):
                                    if task_owner != user_now:
                                        if User.objects.filter(username=task_owner):
                                            message_owner.append(task_owner)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_owner.append(Taskorder.objects.get(id=id).creator.username)

                    message_owner_reminder = list(set(message_owner))
                    for reminder_user in message_owner_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=task_owner_name,classify='task_owner',reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))


                            #return HttpResponseRedirect('/%s/task/%s'%(url,id))
                elif task_owner_name == '':
                    Taskorder.objects.filter(id=id).update(owner=task_owner_name)
                else:
                    owner_errors.append('您输入的属主不存在')
                    return render_to_response('task_content.html',locals())

            if task_reporter != Taskorder.objects.get(id=id).reporter:
                if User.objects.filter(username=task_reporter):
                    Taskorder.objects.filter(id=id).update(reporter=task_reporter)

                    message_reporter =[]
                    if Taskorder.objects.get(id=id).reporter: #审核人消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_reporter.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        for user_name in Taskorder.objects.get(id=id).owner.split(','):
                            if user_now != user_name:
                                message_reporter.append(user_name)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_reporter.append(Taskorder.objects.get(id=id).creator.username)

                    message_reporter_reminder = list(set(message_reporter))
                    for reminder_user in message_reporter_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=task_reporter,classify='task_reporter',reminder=User.objects.get(username=reminder_user),
                                                             promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                             owner_project=Project.objects.get(id=url))

                elif task_reporter == '':
                    Taskorder.objects.filter(id=id).update(reporter=task_reporter)
                    #return HttpResponseRedirect('/%s/task/%s'%(url,id))
                else:
                    owner_errors.append('您输入的审核人不存在')
                    return render_to_response('task_content.html',locals())

            if status != str(Taskorder.objects.get(id=id).status.id):
                add_content = Comment(content=u'任务单状态被%s修改为%s'%(user_now,Status.objects.get(id=status).name),owner=User.objects.get(username=user_now),owner_task=Taskorder.objects.get(id=id),owner_project=owner_project)
                add_content.save()

                #根据状态修改开始结束时间

                start_date_Array = datetime.strptime(str(datetime.now()).split('.')[0], '%Y-%m-%d %H:%M:%S')
                if str(statuss[1].id) == status:
                    duration = Taskorder.objects.get(id=id).duration
                    end_date = datetime.strptime(str(timedelta(days=duration)+datetime.now()).split('.')[0], '%Y-%m-%d %H:%M:%S')
                    Taskorder.objects.filter(id=id).update(start_date=start_date_Array,end_date=end_date)
                if str(statuss.order_by('-value')[0].id) == status:
                    Taskorder.objects.filter(id=id).update(end_date=start_date_Array)
                    Taskorder.objects.filter(id=id).update(progress=1)
                Taskorder.objects.filter(id=id).update(status=Status.objects.get(id=status))

                #更新甘特图持续时间
                now_end_time = time.mktime(time.strptime(str(Taskorder.objects.get(id=id).end_date).split('+')[0].split('.')[0],"%Y-%m-%d %H:%M:%S"))
                now_start_time = time.mktime(time.strptime(str(Taskorder.objects.get(id=id).start_date).split('+')[0].split('.')[0],"%Y-%m-%d %H:%M:%S"))
                duration_timestamip= int(now_end_time) - int(now_start_time)
                duration = duration_timestamip / 86400

                if duration == 0:
                    duration = 1

                Taskorder.objects.filter(id=id).update(duration=duration)

                message_status = []
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
                    if User.objects.filter(username=reminder_user).exists():
                        message = Message.objects.create(name=Status.objects.get(id=status).name,classify='task_status',reminder=User.objects.get(username=reminder_user),
                                                         promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                         owner_project=Project.objects.get(id=url))
            #团队
            team_list_id = []
            for team in task.task_team.all():
                team_list_id.append(str(team.id))
            if task_team!=team_list_id :               #如果团队有变动
                for now_id in task_team:
                    if now_id not in team_list_id and Task_team.objects.filter(id=now_id).exists():
                        for member in Task_team.objects.get(id=now_id).member.all():
                            if member.username!=user_now:
                                message = Message.objects.create(name=Task_team.objects.get(id=now_id).name,classify='task_team',reminder=member,
                                                                     promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                                     owner_project=Project.objects.get(id=url))

                for team in task.task_team.all():
                    task.task_team.remove(team)
                for team_id in task_team:
                    task.task_team.add(Task_team.objects.get(id=team_id))

            return HttpResponseRedirect('/%s/task/%s'%(url,id))


        if judge == 'change_parent_task':
            task_id = request.POST.get('selected_task')
            change = request.POST.get('change')
            clear = request.POST.get('clear')
            if change and task_id:
                if Taskorder.objects.get(id=task_id) in list(Taskorder.objects.filter(parent=id)):
                    error_change_parent = '子任务单不能作为父任务!'
                    return render_to_response('task_content.html', locals())
                elif Taskorder.objects.get(id=task_id)==task:
                    error_change_parent = '该任务单不能作为父任务!'
                    return render_to_response('task_content.html', locals())
                else:
                    Taskorder.objects.filter(id=id).update(parent=task_id)
            if clear:
                Taskorder.objects.filter(id=id).update(parent=0)

            return HttpResponseRedirect('/%s/task/%s' % (url, id))



    #清单列表
    lists_task=TaskList.objects.filter(onwer_task=owner)

    lists=[]
    for list1 in lists_task:
        listStart_date = list1.start_date.astimezone(pytz.timezone('Asia/Shanghai'))
        listEnd_date = list1.end_date.astimezone(pytz.timezone('Asia/Shanghai'))
        start_date_list = time.strptime(str(listStart_date).split('+')[0].split('.')[0], '%Y-%m-%d %H:%M:%S')
        end_date_list = time.strptime(str(listEnd_date).split('+')[0].split('.')[0], '%Y-%m-%d %H:%M:%S')
        start_time = time.strftime("%Y/%m/%d %H:%M", start_date_list)
        end_time = time.strftime("%Y/%m/%d %H:%M", end_date_list)
        lists.append({'id':list1.id,'title':list1.title,'onwer_task':list1.onwer_task,'status':list1.status,'start_date':start_time,'end_date':end_time})
    list_complete=TaskList.objects.filter(onwer_task=owner,status=True)
    list_num=len(lists)
    if list_num!=0:
        num=int(float(len(list_complete))/float(list_num)*100)  #清单完成进度
    return render_to_response('task_content.html',locals())

@checkCdkey
@login_required
@views_permission
def task_attachment_upload(request,*args,**kwargs):
    url = kwargs['project_id']
    id = kwargs['id']
    user_now = request.session.get('USERNAME',False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    owner_project = Project.objects.get(id=url)
    author = User.objects.get(username=user_now)
    owner = Taskorder.objects.get(id =id)
    errors=[]
    if request.method == 'POST':
        file_url = request.FILES.get('file_url')

        #print file_url
        if file_url is not None:     #附件上传
            file_last = file_url.name.split('.')[-1]
            #print file_last
            image_format = ['bmp','pcx','gif','jpeg','jpg','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','png','hdri','raw','ico']
            video_format = ['rm','rmvb','mp4','mov','mtv','dat','wmv','avi','3gp','amv','dmv']
            file_format = ['doc','txt','html','bmp','rar','zip','exe','pdf','xls',]
            if len(file_last) > 0:
                if file_last == 'tiff':
                    errors.append('您上传的图片web不支持显示')
                elif file_last in image_format:
                    #print file_last
                    if Attachment_image.objects.filter(name=file_url.name,owner_comment=0,author=author,owner=owner,owner_project=owner_project).exists():
                        return HttpResponseRedirect('/')  #lly 2016/08/31
                    submit_attachment = Attachment_image(url=file_url,name=file_url.name,owner_comment=0,author=author,owner=owner,owner_project=owner_project)
                    submit_attachment.save()
                    '''
                    message_image = []
                    if Taskorder.objects.get(id=id).reporter: #图片附件消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_image.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        if user_now != Taskorder.objects.get(id=id).owner:
                            message_image.append(Taskorder.objects.get(id=id).owner)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_image.append(Taskorder.objects.get(id=id).creator.username)

                    message_image_reminder = list(set(message_image))
                    for reminder_user in message_image_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=file_url,classify='task_attachment_image',reminder=User.objects.get(username=reminder_user),
                                                         promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                         owner_project=Project.objects.get(id=url))
                    '''

                    return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                elif file_last in video_format:
                    if Attachment_video.objects.filter(name=file_url.name,owner_comment=0,author=author,owner=owner,owner_project=owner_project).exists():
                        return HttpResponseRedirect('/') #lly 2016/08/31
                    submit_attachment = Attachment_video(url=file_url,name=file_url.name,author=author,owner_comment=0,owner=owner,owner_project=owner_project)
                    submit_attachment.save()
                    '''
                    message_image = []
                    if Taskorder.objects.get(id=id).reporter: #视频附件消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_image.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        if user_now != Taskorder.objects.get(id=id).owner:
                            message_image.append(Taskorder.objects.get(id=id).owner)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_image.append(Taskorder.objects.get(id=id).creator.username)

                    message_image_reminder = list(set(message_image))
                    for reminder_user in message_image_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=file_url,classify='task_attachment_video',reminder=User.objects.get(username=reminder_user),
                                                         promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                         owner_project=Project.objects.get(id=url))
                    '''
                    return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
                else:
                    if Attachment_file.objects.filter(name=file_url.name,owner_comment=0,author=author,owner=owner,owner_project=owner_project).exists():
                        return HttpResponseRedirect('/') #lly 2016/08/31
                    submit_attachment = Attachment_file(url=file_url,name=file_url.name,author=author,owner_comment=0,owner=owner,owner_project=owner_project)
                    submit_attachment.save()
                    '''
                    message_image = []
                    if Taskorder.objects.get(id=id).reporter: #文件附件消息
                        if user_now != Taskorder.objects.get(id=id).reporter:
                            message_image.append(Taskorder.objects.get(id=id).reporter)

                    if Taskorder.objects.get(id=id).owner:
                        if user_now != Taskorder.objects.get(id=id).owner:
                            message_image.append(Taskorder.objects.get(id=id).owner)
                    if Taskorder.objects.get(id=id).creator:
                        if user_now != Taskorder.objects.get(id=id).creator.username:
                            message_image.append(Taskorder.objects.get(id=id).creator.username)

                    message_image_reminder = list(set(message_image))
                    for reminder_user in message_image_reminder:
                        if User.objects.filter(username=reminder_user).exists():
                            message = Message.objects.create(name=file_url,classify='task_attachment_file',reminder=User.objects.get(username=reminder_user),
                                                         promulgator=user_now,owner_task=Taskorder.objects.get(id=id),
                                                         owner_project=Project.objects.get(id=url))
                    '''
                    return HttpResponseRedirect('/%s/task/%s'%(url,id),locals())
    return render_to_response('task_content.html',locals())
