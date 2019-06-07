#coding:utf-8
from django.conf.urls import include, url
from django.contrib import admin
from padlist.views import *

urlpatterns = [
    url(r'^show/$',show,name="show"),
    url(r'^create_pad/$', create_pad, name="create_pad"),
]