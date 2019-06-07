from django.contrib import admin

#coding:utf8
from django.contrib import admin
from models import *

class TypeAdmin(admin.ModelAdmin):
    list_display = ('id','name','value','owner_project','default')

class PriorityAdmin(admin.ModelAdmin):
    list_display = ('id','name','value','owner_project','default')

class StatusAdmin(admin.ModelAdmin):
    list_display = ('id','name','value','owner_project')

class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('id','name','due','description','owner_project','default')

class VersionsAdmin(admin.ModelAdmin):
    list_display = ('id','name','time','description','owner_project','default')

class ComponentAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','owner_project','default')

#class TaskorderAdmin(admin.ModelAdmin):
    #list_display = ('id','time','owner','creator','task_image','reporter','priority','summary','milestone','description','owner_project','read_status')

class TaskorderAdmin(admin.ModelAdmin):
    list_display = ('id','display_id','type','time','owner','creator','reporter','priority','summary','parent','roll','scene','take',
                     'progress','sortorder','milestone','start_date','duration','end_date','predict_start_date','predict_duration','predict_end_date','owner_project')

class Attachment_imageAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project','owner_comment')

class Attachment_fileAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project','owner_comment')
class Attachment_videoAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project','owner_comment')

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','project_name','project_name','project_description','due_time','project_status','create_time','creator','is_check_permission')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','content','at_people','author','time','owner','parent_id','owner_task','owner_project')

class WikiAdmin(admin.ModelAdmin):
    list_display=('id','creator','title','create_time','content','owner')

class UserAdmin(admin.ModelAdmin):
    list_display = ('id','username','last_login','is_superuser','name','email','entry_time',
                    'is_staff','is_active','date_joined','gender','position','address','phone')

class PermissionAdmin(admin.ModelAdmin):
    list_display = ('id','project_id','view_name','label_control','description')
class GroupAdmin(admin.ModelAdmin):
    list_display = ('id','name')
class Base_permissionAdmin(admin.ModelAdmin):
    list_display = ('id','view_name','description')
class Project_typeAdmin(admin.ModelAdmin):
    #list_display = ('id','priority','type','component','milestone','version','status')
    list_display = ('id','name','owner','creator')

class Project_indexAdmin(admin.ModelAdmin):
    list_display=('id','creator','create_time','content','owner')

class RepositoryAdmin(admin.ModelAdmin):
    list_display=('id','name','description','project_id','creator')

class RepositoryUserAdmin(admin.ModelAdmin):
    list_display=('id','username','passwd','project_id','repository_name')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('id','name','reminder','owner_task','classify','owner_project','promulgator','status','time')



class Gantt_linksAdmin(admin.ModelAdmin):
    list_display = ('id','source','target','type')
class Gantt_typeAdmin(admin.ModelAdmin):
    list_display = ('id','type','gantt_color','gantt_textColor','gantt_progressColor','owner_project')

class Task_teamAdmin(admin.ModelAdmin):
    list_display = ('id','name','create_time','owner_project')

class Scheduler_typeAdmin(admin.ModelAdmin):
    list_display=('id','type','owner_project','scheduler_color','scheduler_text_color')

#liuluyang 2016/08/09
class Wiki_attachment_imageAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project')
class Wiki_attachment_fileAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project')
class Wiki_attachment_videoAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','owner','owner_project')

class LogoAdmin(admin.ModelAdmin):
    list_display=('id','logo','creator')

class TaskListAdmin(admin.ModelAdmin):
    list_display=('id','title','onwer_task','start_date','status')

class ChatUserAdmin(admin.ModelAdmin):
    list_display=('id','username','password')

admin.site.register(Wiki_attachment_video,Wiki_attachment_videoAdmin)
admin.site.register(Wiki_attachment_file,Wiki_attachment_fileAdmin)
admin.site.register(Wiki_attachment_image,Wiki_attachment_imageAdmin)
#liuluyang 2016/08/09 end

class Company_nameAdmin(admin.ModelAdmin):        #liuluyang 2016/09/06
    list_display = ('id','name','time','update_user','owner_project')

class Login_titleAdmin(admin.ModelAdmin):
    list_display = ('id','title','time','update_user','owner_project')

class Production_processAdmin(admin.ModelAdmin):
    list_display = ('id','name','grade','progress','verifier','owner','owner_task')

class TemplateAdmin(admin.ModelAdmin):
    list_display = ('id','name','display','description','owner_project')

class TaskgradeAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','owner_project')


class Project_type_importAdmin(admin.ModelAdmin):
    list_display = ('id','url','time','name','author','example')
class CompanyDepartmentlAdmin(admin.ModelAdmin):
    list_display = ('id','company','name','owner_project','create_time')

class AttendanceAdmin(admin.ModelAdmin):
    list_display= ('id','name','clock_in','clock_out','date','owner_project')

admin.site.register(Attendance,AttendanceAdmin)
admin.site.register(CompanyDepartment,CompanyDepartmentlAdmin)
admin.site.register(Project_type_import,Project_type_importAdmin)
admin.site.register(Taskgrade,TaskgradeAdmin)
admin.site.register(Template,TemplateAdmin)

admin.site.register(Production_process,Production_processAdmin)
admin.site.register(Login_title,Login_titleAdmin)
admin.site.register(Company_name,Company_nameAdmin)

admin.site.register(Task_team,Task_teamAdmin)
admin.site.register(Gantt_links,Gantt_linksAdmin)
admin.site.register(Message,MessageAdmin)
admin.site.register(Project_index,Project_indexAdmin)
admin.site.register(Attachment_video,Attachment_videoAdmin)
admin.site.register(Project_type,Project_typeAdmin)
admin.site.register(Base_permission,Base_permissionAdmin)
admin.site.register(Group,GroupAdmin)
admin.site.register(Permission,PermissionAdmin)
admin.site.register(User,UserAdmin)
admin.site.register(Wiki,WikiAdmin)
admin.site.register(Comment,CommentAdmin)
admin.site.register(Attachment_file,Attachment_fileAdmin)
admin.site.register(Project,ProjectAdmin)
admin.site.register(Attachment_image,Attachment_imageAdmin)
admin.site.register(Taskorder,TaskorderAdmin)
admin.site.register(Component,ComponentAdmin)
admin.site.register(Versions,VersionsAdmin)
admin.site.register(Milestone,MilestoneAdmin)
admin.site.register(Status,StatusAdmin)
admin.site.register(Type,TypeAdmin)
admin.site.register(Priority,PriorityAdmin)
admin.site.register(Repository,RepositoryAdmin)
admin.site.register(RepositoryUser,RepositoryUserAdmin)
admin.site.register(Gantt_type,Gantt_typeAdmin)
admin.site.register(Scheduler_type,Scheduler_typeAdmin)
admin.site.register(Logo,LogoAdmin)
admin.site.register(TaskList,TaskListAdmin)
admin.site.register(ChatUser,ChatUserAdmin)
# Register your models here.

