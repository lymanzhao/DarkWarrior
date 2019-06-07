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
from effects_views import *
urlpatterns = [
    url(r'^kanban/$',effects_kanban,{'views_permission':'kanban'}),
    url(r'^loading_kanban/(?P<present_tasks>.+)/$',effects_kanban,{'views_permission':'kanban'}),
    url(r'^task/(?P<id>\d+)/$', effects_task_contents,{'views_permission': 'task_content'}),
    url(r'^newshot/$',effects_newshot,{'views_permission':'newtask'}),
    url(r'^newtask/(?P<parent_task>\d+)/$',effects_new_child_task,{'views_permission':'newtask'}),
    url(r'^gantt/$',effects_gantt,{'views_permission':'gantt'}),
    url(r'^gallery/$', gallery,{'views_permission': 'project_index'}),                           # 故事板模式 lly 2016/10/26
    url(r'^loading_gallery/(?P<present_tasks>.+)/(?P<page_num>.+)/$',gallery,{'views_permission':'project_index'}),        #故事板模式loading 2016/10/27 刘禄扬
    url(r'^view_calendar/$', effects_view_calendar, {'views_permission': 'calendar'}),  # 日历
]