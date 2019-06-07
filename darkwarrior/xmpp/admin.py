from django.contrib import admin
from .models import XMPPAccount, XMPPAutoJoin
# Register your models here.
class XMPPAccountAdmin(admin.ModelAdmin):
    list_display = ('id','user','jid')
class XMPPAutoJoinAdmin(admin.ModelAdmin):
    list_display = ('id','account','jid')
admin.register(XMPPAccount,XMPPAccountAdmin)
admin.register(XMPPAutoJoin,XMPPAutoJoinAdmin)