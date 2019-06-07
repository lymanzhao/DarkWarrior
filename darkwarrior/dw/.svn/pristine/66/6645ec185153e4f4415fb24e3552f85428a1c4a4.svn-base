#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
import time
from darkwarrior.settings import MEDIA_ROOT,EMAIL_HOST_USER
from django.contrib.auth.hashers import make_password,check_password
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from decorator import *
import subprocess
from django.core.paginator import Paginator

from django.test import TestCase

# Create your tests here.
import socket
import uuid
def test(request):
    mymac=uuid.UUID(int = uuid.getnode()).hex[-12:]

    #myname = socket.getfqdn(socket.gethostname())
    sys = os.name
    if sys == 'nt':
        myname = os.getenv('computername')
    elif sys == 'posix':
        try:
            host = os.popen('echo $HOSTNAME')
            myname = host.read()
        except:
            pass

    #nameMac = myname + mymac
    a = '2017-11-7 10:30:30'
    cdkey_time = int(time.mktime(time.strptime(a,'%Y-%m-%d %H:%M:%S')))

    #nameMacTime = nameMac[:10] + str(mytime) + nameMac[10:]
    nameMacTime = myname + mymac + str(cdkey_time)
    CDKEY= base64.encodestring(nameMacTime)

    sss = base64.decodestring(CDKEY) 

    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    ss = open(path+os.sep+"cdkey.txt").read()
    CDKEYDECODE = base64.decodestring(ss)

    checkMac = CDKEYDECODE.find(mymac)
    checkHostname = CDKEYDECODE.find(myname)
    #ss = Taskorder.objects.all()
    #for i in ss:
        #Taskorder.objects.filter(id=i.id).update(display_id=i.id)


    return render_to_response('test.html',locals())
