#coding:utf8
from django.shortcuts import  *
from models import *
import time


def update_permission_list(request):
    t0 = time.clock()
    base_permission = Base_permission.objects.all()
    projects = Project.objects.all()


    #print permission_project_id
    #is_update = []
    #is_add = []
    base_permission_views_name = []
    base_permission_label_control =[]

    for i in base_permission:
        #print len(i.view_name)
        if len(i.view_name.strip())>0:
            base_permission_views_name.append(i.view_name)
        else:
            base_permission_label_control.append(i.label_control)

    #print base_permission_views_name
    #print base_permission_label_control


    ########################################################
    permission_project_id = []
    for i in Permission.objects.all():
        if len(i.project_id.strip())>0:
            permission_project_id.append(i.project_id)

    permission_project_id=list(set(permission_project_id))
    project_id_list = []
    for i in projects:
        project_id_list.append(str(i.id))
    #print project_id_list
    for i in permission_project_id:
        if i not in project_id_list:
            #print i
            Permission.objects.filter(project_id=i).delete()        #删除遗留的项目权限
    ##########################################################
    for project in projects:

        project_permission_list = Permission.objects.filter(project_id = project.id)
        project_view_name = []
        project_label_control = []


        for i in project_permission_list:
            if len(i.view_name.strip())>0:
                project_view_name.append(i.view_name)
            else:
                project_label_control.append(i.label_control)

        #print project_view_name
        #print project_label_control



        if len(project_permission_list)>0:
            #is_update.append(project)

            for view_name in base_permission_views_name:              #添加views权限
                permission_desc = Base_permission.objects.get(view_name = view_name).description
                if view_name not in project_view_name:
                    #print view_name,project.id,project.project_name

                    #print permission_desc
                    permission = Permission(project_id=project.id,view_name=view_name,description=project.project_name+' | '+permission_desc)
                    permission.save()
                else:

                    Permission.objects.filter(project_id=project.id,view_name=view_name).update(description=project.project_name+' | '+permission_desc)
                    if len(Permission.objects.filter(project_id=project.id,view_name=view_name))>=2:

                        for i in Permission.objects.filter(project_id=project.id,view_name=view_name)[1:]:
                            i.delete()


            for i in project_view_name:                                #删除views权限
                if i not in base_permission_views_name:
                    #print i
                    Permission.objects.filter(project_id=project.id,view_name=i).delete()
            ######################################################################################
            for label_control in base_permission_label_control:              #添加label权限
                permission_desc = Base_permission.objects.get(label_control = label_control).description
                if label_control not in project_label_control:
                    #print view_name,project.id,project.project_name

                    #print permission_desc
                    permission = Permission(project_id=project.id,label_control=label_control,description=project.project_name+' | '+permission_desc)
                    permission.save()
                else:

                    Permission.objects.filter(project_id=project.id,label_control=label_control).update(description=project.project_name+' | '+permission_desc)
                    if len(Permission.objects.filter(project_id=project.id,label_control=label_control))>=2:

                        for i in Permission.objects.filter(project_id=project.id,label_control=label_control)[1:]:
                            i.delete()

            for i in project_label_control:                                #删除label权限
                if i not in base_permission_label_control:
                    #print i
                    Permission.objects.filter(project_id=project.id,label_control=i,view_name='').delete()



        else:
            #is_add.append(project)
            #print project.id
            #base_permission = Base_permission.objects.all()
            #project_id = Project.objects.get(project_name=name).id
            for i in base_permission:
                if len(i.view_name.strip())>0:

                    permission = Permission(project_id=project.id,view_name=i.view_name,description=project.project_name+' | '+i.description)
                    permission.save()
                else:
                    permission = Permission(project_id=project.id,label_control=i.label_control,description=project.project_name+' | '+i.description)
                    permission.save()
                    #return HttpResponse('发现了没有添加权限的项目，并且该项目权限添加完毕！')


    t = time.clock()-t0




    return HttpResponse('权限列表更新完成！'+'用时'+str(t)+'秒')


