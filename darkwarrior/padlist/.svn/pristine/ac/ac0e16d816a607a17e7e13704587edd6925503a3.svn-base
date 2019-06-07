#coding:utf8
from django.shortcuts import render_to_response
import urllib2
import json
from datetime import datetime
from django.shortcuts import render,render_to_response,HttpResponseRedirect,HttpResponse
from dw.models import *
import time
'''
def index(request):
    context = {}
    #Pad名称
    page_padname = urllib2.urlopen('http://59.110.45.134:9001/api/1.2.1/listAllPads?apikey=078bc3b1b6093668f9210ab634a2c61f360e2457de03fb87394869def92a75ea').read()
    padIDs = json.loads(page_padname)['data']['padIDs']
    context['padIDs'] = padIDs
    authors = []
    context['authors'] = authors

    return render_to_response('index.html',context)
'''

def show(request):
    response = urllib2.urlopen('http://filmind.cn:9001/api/1.2.1/listAllPads?apikey=078bc3b1b6093668f9210ab634a2c61f360e2457de03fb87394869def92a75ea')
    jsonData = json.load(response)
    padIDs = jsonData['data']['padIDs']
    return render_to_response('show.html', locals())


def create_pad(request):
    return render_to_response('create_pad.html')