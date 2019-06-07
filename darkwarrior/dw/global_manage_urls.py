from django.conf.urls import include, url
from global_manage_views import *

urlpatterns = [
    url(r'^$', global_manage),
    url(r'^user/$',global_user),
    url(r'^user/(?P<user_id>\d+)/$', global_user_content),
    url(r'^permission/$', global_permission),
    url(r'^group/$', global_group),
    url(r'^group/(?P<group_id>\d+)/$', global_group_content),
    url(r'^add_group/$', global_add_group),
    url(r'^add_group_user/(?P<group_id>\d+)/$', global_add_group_user),
    url(r'^project_type/$', global_project_type),
    url(r'^add_project_type/$', global_add_project_type),
    url(r'^project_type_edit/(?P<project_type_id>\d+)/$', global_project_type_edit),
    url(r'^project_interface_edit/(?P<project_type_id>\d+)/$', global_project_interface_edit),
    url(r'^task_grade/$', global_task_grade),
    url(r'^logo/$', global_manage_logo),
    url(r'^change_company_name/$', global_change_company_name),
    url(r'^login_title/$', global_login_title),

]
