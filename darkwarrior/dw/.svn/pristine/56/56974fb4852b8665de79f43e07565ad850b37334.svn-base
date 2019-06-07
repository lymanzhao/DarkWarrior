#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import base64
import subprocess
from decorator import *

#聊天用户注册
@checkCdkey
@login_required
@views_permission
def chat_register(request,*args,**kwargs):
    url=kwargs['project_id']
    user_now = request.session.get('USERNAME')
    try:
        template = Template.objects.get(owner_project=url)
    except:
        template = None
    errors = []
    if len(ChatUser.objects.filter(creator=user_now))>0:
        errors.append('你已注册聊天系统的账户，请直接登陆')
        return render_to_response('chat_register.html', locals())
    else:
        if request.method=="POST":
            username=request.POST.get('username')
            password=request.POST.get('password')
            repassword=request.POST.get('repassword')
            xmpp_server='59.110.45.134'
            if(len(ChatUser.objects.filter(username=username))>0):
                errors.append('注册失败，此用户名已注册')
                return render_to_response('chat_register.html', locals())
            if password=="" or repassword=="" or username=="":
                errors.append('有未填写项')
                return render_to_response('chat_register.html', locals())
            if password!=repassword:
                errors.append('两次密码输入不一致，请重新输入')
                return render_to_response('chat_register.html', locals())
            try:
                try:
                    cmd="prosodyctl register %s %s %s"%(username,xmpp_server,password)
                    sub=subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
                    sub.wait()
                except:
                    errors.append('注册失败')
                password2=base64.encodestring(password)
                print password2
                ChatUser.objects.create(username=username,password=password2,creator=user_now)
                errors.append('注册成功')
            except:
                errors.append('注册失败')
        return render_to_response('chat_register.html',locals())