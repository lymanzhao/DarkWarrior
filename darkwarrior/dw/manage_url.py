from django.conf.urls import include, url
from manage_views import *

urlpatterns = [
    url(r'^$',manage),
    url(r'^user/$',user),
    url(r'^project_members/$',project_member),
    url(r'^user/(?P<user_id>\d+)/$',user_content),
    url(r'^permission/$',permission),
    url(r'^group/$',group),
    url(r'^group/(?P<group_id>\d+)/$',group_content),
    url(r'^add_group/$',add_group),
    url(r'^add_group_user/(?P<group_id>\d+)/$',add_group_user),
    url(r'^project_type/$',project_type),
    url(r'^project_type/(?P<base>\d*)$',project_type),           #lly 2016/11/03
    url(r'^project_type_import/$',project_type_import),
    url(r'^add_project_type/$',add_project_type),
    url(r'^add_project_type/(?P<base>\d*)$',add_project_type),   #lly 2016/11/03

    url(r'^task_grade/$',task_grade),
    url(r'^project_type_edit/(?P<project_type_id>\d+)/$',project_type_edit),   #lly 2016/10/21
    url(r'^project_interface_edit/(?P<project_type_id>\d+)/$',project_interface_edit),   #lly 2016/11/02

    url(r'^project_change/$',project_change),
    url(r'^delete_project/(?P<delect_project_id>\d+)/$',delete_project),
    url(r'^application_record/$',application_record),

    url(r'^task_team/$',task_team),
    url(r'^add_task_team/$',add_task_team),
    url(r'^task_team/(?P<task_team_id>\d+)/$',task_team_change),
    

    #url(r'^logo/$',manage_logo),
    #url(r'^change_company_name/$',change_company_name),
    #url(r'^login_title/$',login_title),

    url(r'^department/$',department),
    url(r'^createtree/$',createtree),
    url(r'^file_type/$', file_type),
    url(r'^file_select/$', file_select),
]
