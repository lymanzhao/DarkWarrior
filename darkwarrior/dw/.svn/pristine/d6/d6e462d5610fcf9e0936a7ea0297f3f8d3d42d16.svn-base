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
from chat_views import *
from index import global_calendar,global_gantt,global_report

urlpatterns = [
    url(r'^', include('dw.wiki_urls')),
    url(r'^global_manage/',include('dw.global_manage_urls'),{'views_permission':'manage'}),
    url(r'^(?P<project_id>\d+)/manage/', include('dw.manage_url'), {'views_permission': 'manage'}), #项目管理

    url(r'^(?P<project_id>\d+)/effects/', include('dw.effects_urls'), {'views_permission': 'effects'}),


    url(r'^(?P<project_id>\d+)/HR/', include('dw.HR_urls'), {'views_permission': 'HR'}),

    url(r'^test/$',test),
    url(r'^login/$',login),
    url(r'^logout/$',userlogout),
    url(r'^registration/$',registration),
    url(r'^403/$',permission_403),

    url(r'^global_gantt/$',global_gantt,{'views_permission':'manage'}),  #首页企业
    url(r'^global_view_calendar/$',global_calendar,{'views_permission':'manage'}),
    url(r'^global_report/$',global_report,{'views_permission':'manage'}),

    url(r'^password_reset/$', password_reset, name='password_reset'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        password_reset_confirm, name='password_reset_confirm'),

    url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':MEDIA_ROOT}),
    url(r'^download/media/(?P<path>.*)$', 'dw.download.serve', {'document_root':MEDIA_ROOT}),

    url(r'^password_change/$',password_change),
    url(r'^$',index),
    url(r'^create_project/$',create_project),
    url(r'^personal_settings/$',personal_settings),
    url(r'^personal_log/$',personal_log,{'views_permission':'project_index'}),
    url(r'^loading_personal_timeline/(?P<loading_index>\d+)/(?P<loading_num>\d+)/(?P<user_id>\d+)/$',loading_personal_timeline,{'views_permission':'project_index'}),


    url(r'^(?P<project_id>\d+)/$',kanban,{'views_permission':'project_index'}),
    url(r'^(?P<project_id>\d+)/many_change/$',many_change,{'views_permission':'many_change'}),
    url(r'^(?P<project_id>\d+)/kanban/$',kanban,{'views_permission':'kanban'}),
    url(r'^(?P<project_id>\d+)/query/$',query,{'views_permission':'query'}),

    url(r'^(?P<project_id>\d+)/shot_query/$',shot_query,{'views_permission':'query'}), #lizhiwen 2016/9/22

    url(r'^(?P<project_id>\d+)/newtask/$',newtask,{'views_permission':'newtask'}),
    url(r'^(?P<project_id>\d+)/newtask/(?P<parent_task>\d+)/$',new_child_task,{'views_permission':'newtask'}),
    url(r'^(?P<project_id>\d+)/newshot/$',newshot,{'views_permission':'newtask'}),
    url(r'^(?P<project_id>\d+)/newassets/$',newassets,{'views_permission':'newtask'}),

    url(r'^(?P<project_id>\d+)/roadmap/$',roadmap,{'views_permission':'roadmap'}),

    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/$',task_contents,{'views_permission':'task_content'}),

    #url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/time_coord_task_contents/$',time_coord_task_contents,{'views_permission':'task_content'}), #lizhiwen 2016/9/24

    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/create_repository/$',create_repository,{'views_permission':'task_content'}),#任务单关联版本库
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/svn/$',view_svn,{'views_permission':'task_content'}),
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/svn/(?P<name>\w+)/(?P<path>.*|\w+.*)',svn,{'views_permission':'task_content'}),
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/svn_log/(?P<name>\w+)/$',svn_log,{'views_permission':'task_content'}),
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/svn_recent_changes/(?P<name>\w+)/$',svn_recent_changes,{'views_permission':'task_content'}),
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/delete_repository/(?P<name>\w+)/$',delete_repository,{'views_permission':'task_content'}),
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/register_svn/(?P<name>\w+)/$',register_svn,{'views_permission':'task_content'}),

    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/attachment_upload/$',task_attachment_upload,{'views_permission':'task_content'}),

    url(r'^(?P<project_id>\d+)/svn/$',view_svn,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/svn/(?P<name>\w+)/(?P<path>.*|\w+.*)',svn,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/svn_log/(?P<name>\w+)/$',svn_log,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/svn_recent_changes/(?P<name>\w+)/$',svn_recent_changes,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/delete_repository/(?P<name>\w+)/$',delete_repository,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/create_repository/$',create_repository,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/register_svn/(?P<name>\w+)/$',register_svn,{'views_permission':'svn'}),
    url(r'^(?P<project_id>\d+)/owner_svn/$',view_svn,{'views_permission':'svn'}),

    url(r'^update_permission_list/$',update_permission_list),                                         #更新权限列表
    url(r'^(?P<project_id>\d+)/message_2/$',message_2),                                               #消息列表
    url(r'^(?P<project_id>\d+)/judgment_message/$',judgment_message),                                 #消息通知
    url(r'^search_people/$',search_people),                                                           #搜索用户
    url(r'^(?P<project_id>\d+)/search_parent_task/$',search_parent_task),                              #搜索父任务单

    url(r'^(?P<project_id>\d+)/search_project/$',search_project),

    url(r'^company_name/$',get_company_name,),                                                         #获取公司名称
    url(r'^sites_logo/$',get_sites_logo,),                                                             #获取站点logo
    url(r'^(?P<project_id>\d+)/application/$',application),                                            #申请加入项目
    url(r'^(?P<project_id>\d+)/check_application/(?P<application_people>.*)',check_application,{'views_permission':'manage'}), #审核用户申请  刘禄扬
    url(r'^(?P<project_id>\d+)/project_members/$',project_members,{'views_permission':'project_index'}),                       #项目成员 2016/08/16 刘禄扬
    url(r'^(?P<project_id>\d+)/member_kanban/(?P<member_id>\d+)/$',kanban,{'views_permission':'project_index'}),                 #成员看板 2016/09/05 刘禄扬
    url(r'^(?P<project_id>\d+)/member_calendar/(?P<member_id>\d+)/$',member_calendar,{'views_permission':'project_index'}),      #成员日程 2016/09/06 刘禄扬
    url(r'^(?P<project_id>\d+)/member_gantt/(?P<member_id>\d+)/$',member_gantt,{'views_permission':'project_index'}),            #成员甘特图 2016/09/05 刘禄扬
    url(r'^(?P<project_id>\d+)/member_log/(?P<member_id>\d+)/$',member_log,{'views_permission':'project_index'}),                #成员日志 2016/08/16 刘禄扬
    url(r'^(?P<project_id>\d+)/timeline/$',timeline,{'views_permission':'project_index'}),                                     #时间线  2016/08/17  刘禄扬
    url(r'^(?P<project_id>\d+)/loading_timeline/(?P<loading_index>\d+)/(?P<loading_num>\d+)/$',loading_timeline,{'views_permission':'project_index'}), #时间线loading 2016/08/18  刘禄扬
    url(r'^(?P<project_id>\d+)/loading_kanban/(?P<present_tasks>.+)/$',kanban,{'views_permission':'kanban'}),                  #看板loading 2016/08/23 刘禄扬

    url(r'(?P<project_id>\d+)/view_calendar/$',view_calendar,{'views_permission':'calendar'}),#日历
    #url(r'(?P<project_id>\d+)/create_calendar/$',create_calendar,{'views_permission':'calendar'}),
   # url(r'(?P<project_id>\d+)/modify_calendar/$',modify_calendar,{'views_permission':'calendar'}),
   # url(r'(?P<project_id>\d+)/delete_calendar/$',delete_calendar,{'views_permission':'calendar'}),

    url(r'^(?P<project_id>\d+)/gantt/$',gantt,{'views_permission':'gantt'}),

    #url(r'^(?P<project_id>\d+)/time_coord/$',time_coord), #test################################################# 时光坐标插入xlcel数据


    url(r'^links/$',link,name='link'),
    url(r'^change_attachment_name/$',change_attachment_name,name='change_attachment_name'),                         #添加附件备注 刘禄扬 2016/08/31
    url(r'^make_attachment_message/$',make_attachment_message,name='make_attachment_message'),                      #添加 附件上传消息 刘禄扬 2016/10/13
    url(r'^(?P<project_id>\d+)/project_teams/$',project_teams,{'views_permission':'project_index'}),                #项目团队 2016/09/07 刘禄扬
    url(r'^(?P<project_id>\d+)/team_kanban/(?P<team_id>\d+)',team_kanban,{'views_permission':'project_index'}),     #团队看板 2016/09/07 刘禄扬
    url(r'^(?P<project_id>\d+)/team_calendar/(?P<team_id>\d+)',team_calendar,{'views_permission':'project_index'}),  #团队日程 2016/09/08 刘禄扬
    url(r'^(?P<project_id>\d+)/team_gantt/(?P<team_id>\d+)',team_gantt,{'views_permission':'project_index'}),        #团队甘特图 2016/09/08 刘禄扬
    url(r'^(?P<project_id>\d+)/team_log/(?P<team_id>\d+)',team_log,{'views_permission':'project_index'}),            #团队日志 2016/09/12 刘禄扬
    url(r'^(?P<project_id>\d+)/loading_team_log/(?P<loading_index>\d+)/(?P<loading_num>\d+)/(?P<team_id>\d+)/$',loading_team_log,{'views_permission':'project_index'}),  #团队log loading 2016/09/12
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/update_image/$',update_image,{'views_permission':'task_content'}),    #wpaint
    url(r'^(?P<project_id>\d+)/task/(?P<id>\d+)/(?P<wpaint_image>.*|\w+.*)/wpaint/$',wpaint,{'views_permission':'task_content'}),  #wpaint
    url(r'^(?P<project_id>\d+)/update_status_kanban/$',update_status_kanban,{'views_permission':'kanban'}),           #2016/09/21 刘禄扬
    url(r'^archive/$',archive_page),                                                                                   #2016/11/22 刘禄扬

    url(r'^(?P<project_id>\d+)/report/$',report,{'views_permission':'query'}), #报表1
    url(r'^(?P<project_id>\d+)/project_members_report/(?P<member_id>\d+)/$',project_members_report,{'views_permission':'project_index'}), #项目成员报表
    url(r'^(?P<project_id>\d+)/kanban/UpdateTaskForProject/$', updateTaskForProject,{'views_permission': 'project_index'}),  # 任务单跨项目

   # url(r'^(?P<project_id>\d+)/chat_register/$', chat_register),#聊天用户注册
]
