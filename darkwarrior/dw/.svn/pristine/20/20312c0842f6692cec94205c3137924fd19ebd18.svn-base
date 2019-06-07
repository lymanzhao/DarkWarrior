# coding:utf8
from django.db import models
from datetime import datetime
import os
from django.utils.timezone import now


class Base_permission(models.Model):
    view_name = models.CharField(max_length=50, blank=True, verbose_name='views名称')
    description = models.CharField(max_length=50, blank=True, verbose_name='权限描述')

    def __unicode__(self):
        return self.description

    class Meta:
        verbose_name_plural = '基础权限'


class Permission(models.Model):
    project_id = models.CharField(max_length=5, blank=True, verbose_name='所属项目id', default=0)
    view_name = models.CharField(max_length=50, blank=True, verbose_name='views名称')
    label_control = models.CharField(max_length=50, blank=True, verbose_name='按钮权限')
    name = models.CharField(max_length=30, blank=True, verbose_name='权限名称')
    description = models.CharField(max_length=50, blank=True, verbose_name='权限描述')

    def __unicode__(self):
        return self.description

    class Meta:
        verbose_name = '权限'
        verbose_name_plural = '权限列表'


class Group(models.Model):
    name = models.CharField(max_length=50, verbose_name='名称', unique=True)
    group_permission = models.ManyToManyField(Permission, blank=True, verbose_name='用户权限')
    owner_project_id = models.CharField(max_length=10, verbose_name='所属项目id', default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '组'
        verbose_name_plural = '组'


class User(models.Model):
    username = models.CharField(max_length=50, verbose_name='用户名', unique=True)
    password = models.CharField(max_length=100, verbose_name='密码')
    last_login = models.DateTimeField(verbose_name='最后登录时间', default=datetime.now(), blank=True, null=True)
    is_superuser = models.BooleanField(verbose_name='是否超级管理', default=False)
    name = models.CharField(max_length=100, verbose_name='姓名', blank=True)
    email = models.EmailField(verbose_name='邮箱地址')
    is_staff = models.BooleanField(verbose_name='是否职员', default=False)
    number = models.CharField(max_length=50, verbose_name='编号', blank=True)
    entry_time = models.DateField(verbose_name='入职时间', default=now().date())
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    date_joined = models.DateTimeField(verbose_name='注册时间', auto_now=True)
    head_portrait = models.ImageField(verbose_name='头像', upload_to='user/head_portrait', blank=True)
    gender = models.CharField(max_length=20, verbose_name='性别', blank=True)
    position = models.CharField(max_length=50, verbose_name='职位', blank=True)
    address = models.CharField(max_length=200, verbose_name='家庭住址', blank=True)
    phone = models.CharField(max_length=50, verbose_name='电话号码', blank=True)
    user_permission = models.ManyToManyField(Permission, blank=True, verbose_name='用户权限')
    group = models.ManyToManyField(Group, blank=True, verbose_name='组', default=(1,))

    def __unicode__(self):
        return self.username

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'


class CompanyDepartment(models.Model):
    company = models.CharField(max_length=50, verbose_name='公司')
    name = models.CharField(max_length=50, verbose_name='部门')
    personnel = models.ManyToManyField(User, verbose_name='姓名')
    owner_project = models.CharField(max_length=50, verbose_name='所属项目')
    create_time = models.DateTimeField(default=datetime.now())

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '公司部门'
        verbose_name_plural = '公司部门'


class Attendance(models.Model):
    name = models.CharField(max_length=50, verbose_name='姓名')
    department = models.CharField(max_length=50, verbose_name='部门')
    clock_in = models.DateTimeField(verbose_name='上班时间')
    clock_out = models.DateTimeField(verbose_name='下班时间')
    date = models.DateField(verbose_name='日期', default=now().date())
    owner_project = models.CharField(max_length=50, verbose_name='所属项目')

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '考勤'
        verbose_name_plural = '考勤'


class Company_name(models.Model):  # liuluyang 2016/09/06
    name = models.CharField(max_length=100, verbose_name='公司名称')
    time = models.DateTimeField(verbose_name='更新时间', default=datetime.now())
    update_user = models.ForeignKey(User, verbose_name='创建人', to_field='username')
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '公司名称'
        verbose_name_plural = '公司名称'


class Login_title(models.Model):  # lizhiwen 2016/9/14
    title = models.CharField(max_length=100, verbose_name='登陆页面标题')
    time = models.DateTimeField(verbose_name='更新时间', default=datetime.now())
    update_user = models.ForeignKey(User, verbose_name='创建人', to_field='username')
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, default=0)

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = '登陆页面标题'
        verbose_name_plural = '登陆页面标题'


class Type(models.Model):
    name = models.CharField(max_length=100, verbose_name='任务单类型名称')
    value = models.IntegerField(verbose_name='任务单类型排序', default=0)
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)
    color = models.CharField(max_length=20, verbose_name='任务栏背景色', blank=True, default='5B9BE0')  # 2016/11/02
    textColor = models.CharField(max_length=20, verbose_name='文本颜色', blank=True, default='ffffff')  # 2016/11/02
    progressColor = models.CharField(max_length=20, verbose_name='进度条透明度', blank=True, default=38)  # 2016/11/02
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '任务单类型'
        verbose_name_plural = '任务单类型'
        ordering = ['value']


class Priority(models.Model):
    name = models.CharField(max_length=100, verbose_name='优先级名称')
    value = models.IntegerField(verbose_name='优先级排序', default=0)
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)
    color = models.CharField(max_length=20, verbose_name='背景色', blank=True, default='5B9BE0')
    textColor = models.CharField(max_length=20, verbose_name='字体色', blank=True, default='ffffff')
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '任务单优先级'
        verbose_name_plural = '任务单优先级'
        ordering = ['value']


class Status(models.Model):
    name = models.CharField(max_length=20, verbose_name='状态名称')
    value = models.IntegerField(verbose_name='状态排序', default=0)
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '任务单状态'
        verbose_name_plural = '任务单状态'
        ordering = ['value']


class Milestone(models.Model):
    name = models.CharField(max_length=100, verbose_name='里程碑名称')
    due = models.DateTimeField(verbose_name='预期完成时间', default=datetime.now())
    description = models.CharField(max_length=500, verbose_name='里程碑描述')
    milestone_status = models.CharField(max_length=50, verbose_name='里程碑状态', default='进行中')
    complete_time = models.DateTimeField(verbose_name='实际完成时间', default=datetime.now())
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '里程碑'
        verbose_name_plural = '里程碑'


class Versions(models.Model):
    name = models.CharField(max_length=20, verbose_name='版本名称')
    time = models.DateTimeField(verbose_name='发布时间', auto_now=True)
    description = models.CharField(max_length=500, verbose_name='版本描述')
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '版本'
        verbose_name_plural = '任务单版本'


class Component(models.Model):
    name = models.CharField(max_length=20, verbose_name='组件名称')
    description = models.CharField(max_length=500, verbose_name='组件描述')
    owner_project = models.CharField(max_length=20, verbose_name='所属项目', blank=True, null=True, default=0)
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '组件'
        verbose_name_plural = '任务单组件'


class Template(models.Model):
    name = models.CharField(max_length=50, verbose_name='模版名称')
    display = models.CharField(max_length=50, verbose_name='模版显示名称')
    description = models.TextField(verbose_name='模版说明')
    owner_project = models.CharField(max_length=50, verbose_name='所属项目id', default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '项目模版'


class Taskgrade(models.Model):
    name = models.CharField(max_length=50, verbose_name='等级名称')
    description = models.TextField(verbose_name='等级说明')
    owner_project = models.CharField(max_length=50, verbose_name='所属项目id', default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '任务等级'


class Project_type(models.Model):
    name = models.CharField(max_length=50, verbose_name='项目类型名称')
    task_type = models.ManyToManyField(Type, verbose_name='任务单类型名称')
    task_priority = models.ManyToManyField(Priority, verbose_name='任务单优先级名称')
    task_version = models.ManyToManyField(Versions, verbose_name='任务单版本名称')
    task_component = models.ManyToManyField(Component, verbose_name='任务单组件名称')
    task_status = models.ManyToManyField(Status, verbose_name='任务单状态名称')
    milestone = models.ManyToManyField(Milestone, verbose_name='里程碑名称')
    creator = models.CharField(max_length=50, verbose_name='创建人', blank=True, null=True)
    owner = models.CharField(max_length=30, verbose_name='所属项目id', default=0)

    gantt_skin = models.CharField(verbose_name='甘特图皮肤', max_length=50, blank=True,
                                  default='dhtmlxgantt_terrace.css')  # 2016/11/02
    scheduler_skin = models.CharField(max_length=100, verbose_name="日历皮肤", blank=True,
                                      default='dhtmlxscheduler.css')  # 2016/11/02
    gantt_task_height = models.IntegerField(verbose_name='甘特图任务单高度', blank=True, default=28)  # 2016/11/02
    gantt_row_height = models.IntegerField(verbose_name='甘特图任务栏高度', blank=True, default=38)  # 2016/11/02

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '项目类型'


class Project(models.Model):
    project_name = models.CharField(max_length=100, verbose_name='项目名称')
    project_logo = models.ImageField(upload_to='project_logo', verbose_name='项目logo', blank=True)
    project_type = models.ForeignKey(Project_type, verbose_name='项目类型')
    project_description = models.CharField(max_length=2000, verbose_name='项目描述')
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now=True)
    due_time = models.DateTimeField(verbose_name='预计完成时间', default=datetime.now())
    complete_time = models.DateTimeField(verbose_name='实际完成时间', default=datetime.now())
    project_status = models.CharField(max_length=50, verbose_name='项目状态', default='进行中')
    creator = models.ForeignKey(User, verbose_name='创建人', to_field='username')
    is_archive = models.BooleanField(verbose_name='是否归档', default=False)
    is_check_permission = models.BooleanField(verbose_name='是否检查权限', default=True)

    gantt_skin = models.CharField(verbose_name='甘特图皮肤', max_length=50, blank=True)  # 2016/07/20//废除
    gantt_task_height = models.IntegerField(verbose_name='甘特图任务单高度', blank=True, default=28)  # 2016/07/27//废除
    gantt_row_height = models.IntegerField(verbose_name='甘特图任务栏高度', blank=True, default=38)  # 2016/07/27//废除

    scheduler_skin = models.CharField(max_length=100, verbose_name="日历皮肤", blank=True)  # //废除

    class Meta:
        verbose_name = '项目'
        verbose_name_plural = '项目'

    def __unicode__(self):
        return self.project_name


class Gantt_type(models.Model):  # 2016/07/25 liuluyang//废除
    type = models.ForeignKey(Type, verbose_name='任务类型')
    gantt_color = models.CharField(max_length=20, verbose_name='任务栏背景色', blank=True)
    gantt_textColor = models.CharField(max_length=20, verbose_name='文本颜色', blank=True)
    gantt_progressColor = models.CharField(max_length=20, verbose_name='进度条颜色', blank=True)
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')

    class Meta:
        verbose_name_plural = '甘特图样式'


class Task_team(models.Model):  # liuluyang 2016/07/28
    name = models.CharField(max_length=20, verbose_name='团队名称')
    member = models.ManyToManyField(User, verbose_name='队员')
    team_logo = models.FileField(upload_to='attachment/team_logo', verbose_name='团队logo', blank=True)
    introduction = models.CharField(max_length=140, verbose_name='团队简介', blank=True)
    create_time = models.DateTimeField(default=datetime.now())
    owner_project = models.CharField(max_length=20, verbose_name='所属项目id', default=0)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '任务团队'


class Production_process(models.Model):  # 时光坐标插入xlcel数据
    name = models.CharField(max_length=100, verbose_name='名称', blank=True)
    grade = models.CharField(max_length=50, verbose_name='等级', blank=True)
    progress = models.CharField(max_length=50, verbose_name='进度', blank=True, default=0)
    verifier = models.CharField(max_length=50, verbose_name='审核人', blank=True)
    owner = models.CharField(max_length=100, verbose_name='人员', blank=True)
    owner_task = models.CharField(max_length=50, verbose_name='所属任务单id', blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '制作流程'


class Project_type_import(models.Model):  # 项目类型导入
    url = models.FileField(upload_to='project_type_import', verbose_name='文件存放地址')
    time = models.DateTimeField(verbose_name='上传时间', auto_now=True)
    name = models.CharField(max_length=500, verbose_name='附件名称')
    author = models.CharField(max_length=50, verbose_name='上传者')
    example = models.BooleanField(verbose_name='例子', default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = '项目类型导入'


class Taskorder(models.Model):
    type = models.ForeignKey(Type, verbose_name='任务类型')
    component = models.ForeignKey(Component, verbose_name='组件名称', blank=True, null=True)
    priority = models.ForeignKey(Priority, verbose_name='优先级', blank=True, null=True)
    version = models.ForeignKey(Versions, verbose_name='版本', blank=True, null=True)
    milestone = models.ForeignKey(Milestone, verbose_name='里程碑', blank=True, null=True)
    status = models.ForeignKey(Status, verbose_name='状态')
    creator = models.ForeignKey(User, verbose_name='创建人', blank=True, to_field='username')

    display_id = models.CharField(max_length="100", verbose_name='前端显示id', blank=True)
    time = models.DateTimeField(verbose_name='创建时间', auto_now=True)
    task_image = models.ImageField(upload_to='task_image', verbose_name='任务单图片', blank=True)
    owner = models.CharField(max_length=50, verbose_name='属主', blank=True)
    reporter = models.CharField(max_length=50, verbose_name='审核人', blank=True)

    progress_task = models.IntegerField(verbose_name='任务单进度百分比', default=0)
    summary = models.CharField(max_length=100, verbose_name='任务概述')
    description = models.TextField(max_length=500, verbose_name='任务描述')
    read_status = models.CharField(max_length=20, verbose_name='读取状态', default='未读')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目id')

    text = models.CharField(max_length=255, verbose_name='内容', blank=True)
    start_date = models.DateTimeField(verbose_name='实际起始时间', default=datetime.now())
    duration = models.FloatField(verbose_name='实际持续时间', default=1)
    end_date = models.DateTimeField(verbose_name='实际结束时间', default=datetime.now())

    predict_start_date = models.DateTimeField(verbose_name='预计起始时间', default=datetime.now())
    predict_duration = models.FloatField(verbose_name='预计持续时间', default=1)
    predict_end_date = models.DateTimeField(verbose_name='预计结束时间', default=datetime.now())

    progress = models.FloatField(verbose_name='进展', default=0)
    sortorder = models.IntegerField(verbose_name='排序次序', default=0)
    parent = models.IntegerField(verbose_name='父id', default=0)

    storypoint = models.FloatField(verbose_name='故事点', default=0)

    color = models.CharField(max_length=20, verbose_name='任务栏背景色', blank=True)  # 2016/07/20//废除
    textColor = models.CharField(max_length=20, verbose_name='文本颜色', blank=True)  # 2016/07/20//废除
    progressColor = models.CharField(max_length=20, verbose_name='进度条颜色', blank=True)  # 2016/07/20//废除

    task_team = models.ManyToManyField(Task_team, verbose_name='任务团队', blank=True)  # 2016/07/28

    time_length = models.IntegerField(verbose_name='时长(帧)', blank=True, default=0)  # time_coord
    notes = models.CharField(max_length=500, verbose_name='备注', blank=True)
    production_process = models.ManyToManyField(Production_process, verbose_name='制作流程', blank=True)
    grade = models.CharField(max_length=100, verbose_name="等级", blank=True)

    roll = models.CharField(max_length=500, verbose_name='卷', blank=True)
    scene = models.IntegerField(verbose_name="场号", blank=True, default=0)
    take = models.IntegerField(verbose_name="次数", blank=True, default=0)

    def __unicode__(self):
        return self.summary

    class Meta:
        verbose_name = '任务单'
        verbose_name_plural = '任务单'


class Scheduler_type(models.Model):
    type = models.ForeignKey(Type, verbose_name='任务单类型')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')
    scheduler_color = models.CharField(max_length=100, verbose_name='任务背景色', blank=True)
    scheduler_text_color = models.CharField(max_length=100, verbose_name="任务文本颜色", blank=True)

    class Meta:
        verbose_name = '日历样式'
        verbose_name_plural = '日历样式'


class Gantt_links(models.Model):
    source = models.IntegerField(verbose_name='来源')
    target = models.IntegerField(verbose_name='目标')
    type = models.CharField(max_length=20, verbose_name='类型')

    class Meta:
        verbose_name_plural = '甘特链接'


class Attachment_file(models.Model):
    url = models.FileField(upload_to='attachment/file', verbose_name='文件存放地址')
    time = models.DateTimeField(verbose_name='上传时间', auto_now=True)
    name = models.CharField(max_length=500, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Taskorder, verbose_name='所属任务单id')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目id')
    owner_comment = models.CharField(max_length=20, verbose_name='所属评论id', blank=True, default=0)

    class Meta:
        verbose_name = '文件附件'
        verbose_name_plural = '文件附件'


class Attachment_video(models.Model):
    url = models.FileField(upload_to='attachment/video', verbose_name='视频存放地址')
    time = models.DateTimeField(verbose_name='上传时间', auto_now=True)
    name = models.CharField(max_length=500, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Taskorder, verbose_name='所属任务单id')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目id')
    owner_comment = models.CharField(max_length=20, verbose_name='所属评论id', blank=True, default=0)

    class Meta:
        verbose_name = '视频附件'
        verbose_name_plural = '视频附件'


class Attachment_image(models.Model):
    url = models.ImageField(upload_to='attachment/imges', verbose_name='图片存放地址')
    time = models.DateTimeField(verbose_name='上传时间', auto_now=True)
    name = models.CharField(max_length=500, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Taskorder, verbose_name='所属任务单id')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目id')
    owner_comment = models.CharField(max_length=20, verbose_name='所属评论id', blank=True, default=0)

    class Meta:
        verbose_name = '图片附件'
        verbose_name_plural = '图片附件'


class Comment(models.Model):
    content = models.TextField(verbose_name='评论内容')
    author = models.CharField(max_length=50, verbose_name='回复人', blank=True)
    at_people = models.CharField(max_length=50, verbose_name='@人', blank=True)
    time = models.DateTimeField(verbose_name='评论时间', auto_now=True)
    owner = models.ForeignKey(User, verbose_name='评论者')
    owner_task = models.ForeignKey(Taskorder, verbose_name='所属任务单')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目id')
    parent_id = models.CharField(max_length=20, verbose_name='父id', default=0)

    class Meta:
        verbose_name = '评论'
        verbose_name_plural = '任务单评论'


class Wiki(models.Model):
    creator = models.ForeignKey(User, verbose_name='创建人')
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now=True)
    title = models.CharField(max_length=200, verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    owner = models.ForeignKey(Project, verbose_name='所属项目')

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = '维基'
        verbose_name_plural = '维基'


class Wiki_attachment_file(models.Model):  # liuluyang 2016/08/09
    url = models.FileField(upload_to='attachment/wiki/file', verbose_name='文件存放地址')
    time = models.DateTimeField(verbose_name='上传时间', default=datetime.now())
    name = models.CharField(max_length=50, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Wiki, verbose_name='所属维基')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')

    class Meta:
        verbose_name = '文件附件'
        verbose_name_plural = '维基文件附件'


class Wiki_attachment_video(models.Model):  # liuluyang 2016/08/09
    url = models.FileField(upload_to='attachment/wiki/video', verbose_name='视频存放地址')
    time = models.DateTimeField(verbose_name='上传时间', default=datetime.now())
    name = models.CharField(max_length=50, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Wiki, verbose_name='所属维基')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')

    class Meta:
        verbose_name = '视频附件'
        verbose_name_plural = '维基视频附件'


class Wiki_attachment_image(models.Model):  # liuluyang 2016/08/09
    url = models.ImageField(upload_to='attachment/wiki/imges', verbose_name='图片存放地址')
    time = models.DateTimeField(verbose_name='上传时间', default=datetime.now())
    name = models.CharField(max_length=50, verbose_name='附件名称')
    author = models.ForeignKey(User, verbose_name='上传者')
    owner = models.ForeignKey(Wiki, verbose_name='所属维基')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')

    class Meta:
        verbose_name = '图片附件'
        verbose_name_plural = '维基图片附件'


class Project_index(models.Model):
    creator = models.ForeignKey(User, verbose_name='创建人')
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now=True)
    content = models.TextField(verbose_name='内容')
    owner = models.ForeignKey(Project, verbose_name='所属项目')

    class Meta:
        verbose_name_plural = '项目首页'


class Repository(models.Model):
    name = models.CharField(max_length=200, verbose_name="版本库名称", unique=True)
    project_id = models.ForeignKey(Project, verbose_name="所属项目ID")
    description = models.TextField(verbose_name="版本库说明", blank=True, null=True)
    creator = models.CharField(max_length=200, verbose_name="版本库创建人")
    owner_task = models.ForeignKey(Taskorder, verbose_name='所属任务单', blank=True, null=True)
    owner_user = models.ManyToManyField(User, verbose_name="已注册系统用户", blank=True)

    class Meta:
        verbose_name_plural = "源码版本库"

    def __unicode__(self):
        return self.name


class RepositoryUser(models.Model):
    username = models.CharField(max_length=200, verbose_name="版本库用户名")
    passwd = models.CharField(max_length=200, verbose_name="版本库密码")
    project_id = models.ForeignKey(Project, verbose_name="所属项目ID")
    repository_name = models.ForeignKey(Repository, verbose_name="版本库名")
    owner_user = models.ForeignKey(User, verbose_name="已注册系统用户", blank=True, null=True)

    class Meta:
        verbose_name_plural = "版本库用户"


class Message(models.Model):
    name = models.CharField(max_length=20, verbose_name='消息标题')
    classify = models.CharField(max_length=20, verbose_name='消息分类')

    reminder = models.ForeignKey(User, verbose_name='提示人')
    promulgator = models.CharField(max_length=20, verbose_name='发布者')
    comment_id = models.CharField(max_length=20, verbose_name='评论ID', default=0)
    time = models.DateTimeField(auto_now=True, verbose_name='发布时间')
    owner_task = models.ForeignKey(Taskorder, verbose_name='所属任务单')
    owner_project = models.ForeignKey(Project, verbose_name='所属项目')
    status = models.BooleanField(verbose_name='消息状态', default=False)

    class Meta:
        verbose_name_plural = '消息列表'


class Logo(models.Model):
    logo = models.ImageField(upload_to='project_logo', verbose_name='项目全局logo')
    creator = models.ForeignKey(User, verbose_name='上传者')

    class Meta:
        verbose_name_plural = '项目全局LOGO'


class TaskList(models.Model):
    title = models.CharField(max_length=200, verbose_name='清单标题')
    onwer_task = models.ForeignKey(Taskorder, verbose_name='所属任务单')
    start_date = models.DateTimeField(verbose_name='开始时间', default=datetime.now())
    end_date = models.DateTimeField(verbose_name='结束时间', default=datetime.now())
    status = models.BooleanField(verbose_name='完成', default=False)

    class Meta:
        verbose_name_plural = '任务清单'

class ChatUser(models.Model):
    username = models.CharField(max_length=200, verbose_name='聊天用户名', unique=True)
    password = models.CharField(max_length=200, verbose_name='密码')
    creator = models.CharField(max_length=200, verbose_name='创建者', null=True, blank=True)

    class Meta:
        verbose_name_plural = '聊天用户'
# Create your models here.


