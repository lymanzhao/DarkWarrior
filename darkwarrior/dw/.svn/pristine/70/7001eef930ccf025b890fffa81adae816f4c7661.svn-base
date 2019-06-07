# coding:utf-8
from django.shortcuts import render, render_to_response, HttpResponseRedirect, HttpResponse
from models import *
import re, os
from datetime import datetime
import time
# from django.contrib.auth.decorators import login_required
from darkwarrior.settings import MEDIA_ROOT, EMAIL_HOST_USER
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from decorator import *
import subprocess
from django.core.paginator import Paginator


# 查看所有代码版本库
@checkCdkey
@login_required
@views_permission
def view_svn(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']
    project_id = Project.objects.get(id=url)
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    # if User.objects.get(username=user_now).is_superuser:
    #    admin = True
    user = User.objects.get(username=user_now)
    erros = []
    repository_list = []  # 版本库列表
    repoUser_list = []  # 版本库用户列表

    if request.path == "/%s/owner_svn/" % url:  # 项目版本库，不是属于任务单的版本库
        repository_set = Repository.objects.filter(project_id=project_id, owner_user=user)
        host = request.get_host()  # 主机名
        for repo in repository_set:
            repoUsers = RepositoryUser.objects.filter(repository_name=Repository.objects.get(name=repo.name))
            host_name = 'svn://' + host + '/' + repo.name
            repository_list.append({'name': repo.name, 'creator': repo.creator, 'host_name': host_name, 'id': repo.id})
            if len(repoUsers) > 0:
                for repoUser in repoUsers:
                    repoUser_list.append({'username': repoUser.username, 'passwd': repoUser.passwd,
                                          'reponame': repoUser.repository_name.name})
        return render_to_response('owner_svn.html', locals())
    else:  # 属于任务单的版本库
        repository_set = Repository.objects.filter(project_id=project_id)
        host = request.get_host()

        for repo in repository_set:
            host_name = 'svn://' + host + '/' + repo.name
            repository_list.append({'name': repo.name, 'creator': repo.creator, 'host_name': host_name, 'id': repo.id})

        if len(repository_set) <= 0:
            erros.append('该项目还没有版本库，请先建立版本库')
            return HttpResponseRedirect('/%s/create_repository/' % url, locals())
        if request.path != "/%s/svn/" % url:  # 任务单关联版本库
            id = kwargs['id']
            task = Taskorder.objects.get(id=id)
            repository_set = Repository.objects.filter(project_id=project_id, owner_task=task)
            if len(repository_set) > 0:
                erros.append('已创建版本库')
                if template.name == 'effects':
                    return HttpResponseRedirect('/%s/effects/task/%s/' % (url, id), locals())
                else:
                    return HttpResponseRedirect('/%s/task/%s/' % (url, id), locals())
    return render_to_response('view_svn.html', locals())


# 列出版本库中的文件
@checkCdkey
@login_required
@views_permission
def svn(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']
    project_id = Project.objects.get(id=url)
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    # if User.objects.get(username=user_now).is_superuser:
    #    admin = True
    path = kwargs['path']
    list = []  # 存放文件
    name = kwargs['name']  # 文件名
    if path:
        path1 = name
        path2 = path
        path = path1 + '/' + path2  # 路径
        # 命令执行结果得到一组数组
        rs = 1
        str = re.search(r'[\w]+\.+[\w]+', path, re.I)  # 匹配文件
        if not str:
            cmd = 'svn --username admin --password Dark2016 list svn://127.0.0.1/%s' % path
            try:
                p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                for line in p.stdout.readlines():
                    line = line.replace('/', '')
                    list.append(line)
                retval = p.wait()

            except:
                list.append('没有文件了')

        else:
            #   cmd='svn cat svn://127.0.0.1/%s'%path
            list.append('已到达底层，没有文件了')

    else:
        rs = 0
        path = name
        cmd = 'svn --username admin --password Dark2016 list svn://127.0.0.1/%s' % path
        folder_path = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        for line in folder_path.stdout.readlines():
            line = line.replace('/', '')
            # list.append(line.encode('gbk'))
            list.append(line)
        retval = folder_path.wait()
    return render_to_response('svn.html', locals())


# 查看版本日志
@checkCdkey
@login_required
@views_permission
def svn_log(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断
    url = kwargs['project_id']
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    try:
        url = kwargs['project_id']
        user_now = request.session.get('USERNAME', False)
        user_head_portrait = User.objects.get(username=user_now).head_portrait
        # if User.objects.get(username=user_now).is_superuser:
        #    admin = True
        project_id = Project.objects.get(id=url)
        name = kwargs['name']
        respository = Repository.objects.get(project_id=project_id, name=name)
        respository_name = respository.name
        list = []  # 日志字符
        lists = []  # 日志字符分割后，存放字典的列表
        cmd = "svn --username admin --password Dark2016 log svn://127.0.0.1/%s" % respository_name
        result = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        for i in result.stdout.readlines():  # i:日志信息
            i = i.decode('utf-8')
            list.append(i)
        for i in range(1, len(list), 4):  # i:list索引
            dict = {'info': list[i], 'commit': list[i + 2]}  # info提交信息，commit提交者
            lists.append(dict)
        paginator = Paginator(lists, 20)
        try:
            page = int(request.GET.get('page', '1'))
        except ValueError:
            page = 1
        try:
            lists = paginator.page(page)
        except:
            list = paginator.page(paginator.num_pages)
            retval = result.wait()
        return render_to_response('svn_log.html', locals())
    except:
        if request.path != "/%s/svn_log/":  # 在任务单中查看版本库日志时，没有版本库的跳转
            id = kwargs('id')
            return HttpResponseRedirect('/%s/task/%s/create_repository/' % (url, id))
        return HttpResponseRedirect('/%s/create_repository/' % url, locals())


# 查看版本最近修改
@checkCdkey
@login_required
@views_permission
def svn_recent_changes(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断
    url = kwargs['project_id']
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None
    try:
        url = kwargs['project_id']
        user_now = request.session.get('USERNAME', False)
        user_head_portrait = User.objects.get(username=user_now).head_portrait
        # if User.objects.get(username=user_now).is_superuser:
        #    admin = True
        project_id = Project.objects.get(id=url)
        name = kwargs['name']
        respository = Repository.objects.get(project_id=project_id, name=name)
        respository_name = respository.name
        list = []  # 日志字符
        lists = []  # 日志字符分割后，存放字典的列表
        cmd = "svn --username admin --password Dark2016 log -r HEAD svn://127.0.0.1/%s" % respository_name
        result = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        for i in result.stdout.readlines():  # i:日志信息
            i = i.decode('utf-8')
            list.append(i)
        for i in range(1, len(list), 4):  # i:list索引
            dict = {'info': list[i], 'commit': list[i + 2]}  # info提交信息，commit提交者
            lists.append(dict)
        retval = result.wait()
        return render_to_response('svn_recent_changes.html', locals())
    except:
        if request.path != "/%s/svn_recent_changes/":  # 在任务单中查看版本库最近修改日志时，没有版本库的跳转
            id = kwargs('id')
            return HttpResponseRedirect('/%s/task/%s/create_repository/' % (url, id))
        return HttpResponseRedirect('/%s/create_repository/' % url, locals())


# 创建版本库
@checkCdkey
@login_required
@views_permission
def create_repository(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait

    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    errors = []

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    if request.path != "/%s/create_repository/" % (url):  # 任务单关联版本库
        id = kwargs['id']
        repo = Repository.objects.filter(id=id)
        if len(repo) > 1:
            errors.append('已存在库')
            return render_to_response('create_repository.html', locals())
    if request.method == "POST":
        name = request.POST.get('name', '')
        name = name.encode('utf-8')
        description = request.POST.get('description', '')
        if name is not None and len(name) > 0:
            project_id = Project.objects.get(id=url)
            creator = User.objects.get(username=user_now)
            is_repository = Repository.objects.filter(name=name)  # 此版本库是否存在
            is_project = Repository.objects.filter(project_id=project_id)  # 版本库是否属于本项目
            re_name = re.search(r'^[a-zA-Z0-9_]+$', str(name), re.I)  # 版本库命名正则匹配
            if not re_name:
                errors.append('版本库名格式不正确，只允许字母、数字、下划线，不允许中文及其他字符')
                return render_to_response('create_repository.html', locals())
            if len(is_repository) > 0:
                errors.append('版本库名已存在，请重新输入')
                return render_to_response('create_repository.html', locals())

            # 服务器上创建版本库
            if os.path.exists('/var/www/svn'):
                pass
            else:
                os.mkdir('/var/www/svn')
            p = subprocess.Popen("svnadmin create /var/www/svn/%s" % name, shell=True, stdout=subprocess.PIPE,
                                 stderr=subprocess.STDOUT)
            reval = p.wait()
            # 在数据库中添加数据
            repository = Repository(name=name, project_id=project_id, description=description, creator=creator)
            if request.path != "/%s/create_repository/" % (url):  # 任务单关联版本库
                id = kwargs['id']
                task = Taskorder.objects.get(id=id)
                repository = Repository(name=name, project_id=project_id, description=description, creator=creator,
                                        owner_task=task)
            repository.save()
            errors.append('创建成功')

            # 修改配置文件
            file = open("/var/www/svn/%s/conf/svnserve.conf" % name, "r")
            content = file.read()
            file.close()
            pos = content.find('[sasl]')
            if pos != -1:
                content = content[:pos] + "anon-access = read" + '\n' + 'auth-access = write' + '\n' \
                          + 'password-db = passwd' + '\n' + 'authz-db = authz' + '\n' + content[pos:]
                file = open("/var/www/svn/%s/conf/svnserve.conf" % name, "r+")
                file.write(content)
                file.close()
            file_authz = open('/var/www/svn/%s/conf/authz' % name, 'a+')
            content_authz = '[/]' + '\n' + '* = ' + '\n'
            file_authz.write(content_authz)
            file_authz.close()
            # 修改配置文件，添加默认的账户，用户名密码
            file_passwd = open('/var/www/svn/%s/conf/passwd' % name, 'a+')
            username = "admin"
            passwd = "Dark2016"
            content_passwd = '%s = %s' % (username, passwd) + '\n'
            file_passwd.writelines(content_passwd)
            file_passwd.close()
            # 增加默认用户权限
            file_authz = open('/var/www/svn/%s/conf/authz' % name, 'a+')
            content_authz = '%s = r' % username + '\n'
            file_authz.write(content_authz)
            file_authz.close()
            if request.path != "/%s/create_repository/" % (url):
                id = kwargs['id']
                if template.name == 'effects':
                    return HttpResponseRedirect('/%s/effects/task/%s/' % (url, id), locals())
                else:
                    return HttpResponseRedirect('/%s/task/%s/' % (url, id), locals())
            return HttpResponseRedirect('/%s/svn/' % url)
        else:
            errors.append('版本库名不能为空')
            return render_to_response('create_repository.html', locals())
    return render_to_response('create_repository.html', locals())


# 删除版本库
@checkCdkey
@login_required
@views_permission
def delete_repository(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    name = kwargs['name']
    respository = Repository.objects.get(project_id=url, name=name)
    name = respository.name
    respository.delete()  # 从数据库删除数据
    p = subprocess.Popen('rm -rf /var/www/svn/%s' % name, shell=True, stdout=subprocess.PIPE,
                         stderr=subprocess.STDOUT)  # 从服务地本地删除版本库
    p.wait()
    if request.path != "/%s/delete_repository/%s/" % (url, name):  # 属于任务单的版本库
        id = kwargs['id']
        return HttpResponseRedirect('/%s/task/%s/svn/' % (url, id))
    return HttpResponseRedirect('/%s/svn/' % url)


# 注册svn用户
@checkCdkey
@login_required
@views_permission
def register_svn(request, *args, **kwargs):
    project_archive = kwargs['project']  # 项目归档判断

    url = kwargs['project_id']
    user_now = request.session.get('USERNAME', False)
    user_head_portrait = User.objects.get(username=user_now).head_portrait
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None

    if User.objects.get(username=user_now).is_superuser:
        admin = True
    name = kwargs['name']
    errors = []
    user = User.objects.get(username=user_now)
    if request.method == "POST":
        username = request.POST.get('svn_username', '')
        username = username.encode('utf-8')

        passwd = request.POST.get('svn_password', '')
        passwd = passwd.encode('utf-8')
        passwd2 = request.POST.get('svn_password2', '')
        passwd2 = passwd2.encode('utf-8')

        if username is not None and len(username) > 0:
            if passwd is not None and len(passwd) > 0:
                re_username = re.search(r'^[\w]+$', str(username), re.I)
                re_passwd = re.search(r'^[\w]+$', str(passwd), re.I)
                project_id = Project.objects.get(id=url)
                repository = Repository.objects.get(name=name, project_id=project_id)
                is_repository = RepositoryUser.objects.filter(repository_name=repository, username=username)
                if len(is_repository):
                    errors.append('用户名已存在，请重新输入')
                    return render_to_response('register_svn.html', locals())
                if not re_username:
                    errors.append('用户名只允许字母、数字、下划线')
                    return render_to_response('register_svn.html', locals())
                if not re_passwd:
                    errors.append('密码只允许字母、数字、下划线')
                    return render_to_response('register_svn.html', locals())
                if passwd != passwd2:
                    errors.append('两次密码输入不一致，请重新输入')
                    return render_to_response('register_svn.html', locals())

                # 修改配置文件，添加用户名密码
                file_passwd = open('/var/www/svn/%s/conf/passwd' % name, 'a+')
                content_passwd = '%s = %s' % (username, passwd) + '\n'
                file_passwd.writelines(content_passwd)
                file_passwd.close()
                # 添加权限
                file_authz = open('/var/www/svn/%s/conf/authz' % name, 'a+')
                content_authz = '%s = rw' % username + '\n'
                file_authz.write(content_authz)
                file_authz.close()

                repositoryUser = RepositoryUser(username=username, passwd=passwd, project_id=project_id,
                                                repository_name=repository, owner_user=user)
                repositoryUser.save()
                Repository.objects.get(project_id=project_id, name=name).owner_user.add(user)
                errors.append('注册成功')
                if request.path != "/%s/register_svn/%s/" % (url, name):
                    id = kwargs['id']
                    return HttpResponseRedirect('/%s/task/%s/svn/' % (url, id))

                return HttpResponseRedirect('/%s/svn/' % url)

            else:
                errors.append('版本库密码不能为空')
                return render_to_response('register_svn.html', locals())
        else:
            errors.append('版本库用户名不能为空')
            return render_to_response('register_svn.html', locals())
    return render_to_response('register_svn.html', locals())


