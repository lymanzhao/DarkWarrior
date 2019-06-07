#coding:utf-8

from django.conf.urls import url

from wiki_views import *


urlpatterns = [

    url(r'^(?P<project_id>\d+)/create_wiki/$',create_wiki,{'views_permission':'create_wiki'}),
    url(r'^(?P<project_id>\d+)/wiki/$',wiki,{'views_permission':'project_index'}),
    url(r'^(?P<project_id>\d+)/wiki_index/$',wiki_index,{'views_permission':'project_index'}),
    url(r'^(?P<project_id>\d+)/wiki_index/(?P<wiki_id>\d+)/$',wiki_content,{'views_permission':'wiki_content'}),#6/08
    url(r'^(?P<project_id>\d+)/wiki_index/(?P<wiki_id>\d+)/edit/$',wiki_edit,{'views_permission':'wiki_edit'}),#6/08
    url(r'^(?P<project_id>\d+)/wiki_index/(?P<wiki_id>\d+)/delete/$',wiki_delete,{'views_permission':'wiki_delete'}), #6/12
    url(r'^(?P<project_id>\d+)/wiki_index/(?P<wiki_id>\d+)/wiki_attachment_upload/$',wiki_attachment_upload,{'views_permission':'wiki_edit'}), #liuluyang 2016/08/09

        ]
