#coding:utf-8
from django.conf.urls import include, url
from views import *
from darkwarrior.settings import MEDIA_ROOT

from tests import *
from permission_update import *
from ajax_views import *
from member_team import *
from svn_views import *
from task_content_views import *
from calendar_views import *
from time_coord import *
from HR_views import *
urlpatterns = [
    url(r'^create_Leave_application/$',create_Leave_application,{'views_permission':'newtask'}),
    url(r'^create_leave/$',create_leave,{'views_permission':'newtask'}),
    url(r'^newtask/(?P<parent_task>\d+)/$',hr_new_child_task,{'views_permission':'newtask'}),
    url(r'^gantt/$',hr_gantt,{'views_permission':'gantt'}),
    url(r'^kanban/$',hr_kanban,{'views_permission':'kanban'}),
    url(r'^loading_kanban/(?P<present_tasks>.+)/$',hr_kanban,{'views_permission':'kanban'}),
    url(r'^task/(?P<id>\d+)/$', hr_task_contents,{'views_permission': 'task_content'}),

    url(r'^attendance/$',attendance,{'views_permission':'attendance'}),
    url(r'^attendance_statistic/$',attendance_statistic,{'views_permission':'attendance'}),
    url(r'^CompanyPersonnel/$',company_personnel,{'views_permission':'CompanyPersonnel'}),
    url(r'^view_calendar/$', hr_view_calendar, {'views_permission': 'calendar'}),  # 日历

]