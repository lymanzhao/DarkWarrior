#coding:utf8
from django.db import models
from datetime import datetime

# class List(models.Model):
#    name = models.CharField(max_length=50,verbose_name="pad名称")
#     summary = models.TextField(verbose_name="摘要")
#
#     def __unicode__(self):
#         return self.name

#版本
class Versions(models.Model):
    name = models.CharField(max_length=20, verbose_name='版本名称')
    time = models.DateTimeField(verbose_name='发布时间', auto_now=True)
    description = models.CharField(max_length=500, verbose_name='版本描述')
    owner_project = models.CharField(max_length=20, verbose_name='所属剧本', blank=True, null=True, default=0)
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '版本'
        verbose_name_plural = '剧本版本'

#优先级
class Priority(models.Model):
    name = models.CharField(max_length=100, verbose_name='优先级名称')
    value = models.IntegerField(verbose_name='优先级排序', default=0)
    owner_project = models.CharField(max_length=20, verbose_name='所属剧本', blank=True, null=True, default=0)
    color = models.CharField(max_length=20, verbose_name='背景色', blank=True, default='5B9BE0')
    textColor = models.CharField(max_length=20, verbose_name='字体色', blank=True, default='ffffff')
    default = models.BooleanField(verbose_name="默认选项", default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = '笔记优先级'
        verbose_name_plural = '笔记优先级'
        ordering = ['value']


#里程碑
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