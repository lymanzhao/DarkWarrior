#coding:utf-8
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from models import *
import re,os
from datetime import datetime
import time
#from django.contrib.auth.decorators import login_required
from darkwarrior.settings import MEDIA_ROOT,EMAIL_HOST_USER
from django.contrib.auth.hashers import make_password,check_password
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from decorator import *
import subprocess
from django.core.paginator import Paginator


def cdkey_past_dut(request):
    return render_to_response('cdkey_past_due.html')

def usecdkey(request):
    return render_to_response('use_cdkey.html')
def cdkey(request):
    if request.method == 'POST':
        cdkey = request.POST.get('cdkey')
        path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        open(path+os.sep+"cdkey.txt",'w').write(cdkey)
        return HttpResponseRedirect('/')
    return render_to_response('cdkey.html')
