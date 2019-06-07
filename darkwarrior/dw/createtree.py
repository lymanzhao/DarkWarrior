#coding:utf-8
import os
def mkdir(path):
    #print path.split(os.sep).pop()
    file = ['ddb','doc','txt','wps','xls','ppt','rar','html','pdf','dwg','exe','jpg','png','bmp','swf','fla']
    if path.split(os.sep)[-1].split('.')[-1] in file:

        folderList = path.split(os.sep)
        folderList.pop()
        folder = '/'.join(folderList)
        #判断文件上层目录是否存在
        if not os.path.exists(folder):
            os.makedirs(folder)
        isExists = os.path.exists(path)

        # 判断是否存在
        if not isExists:
            #  如果不存在则创建文件
            file = open(path, 'w')
            file.close()
        else:
            error = path + u' 文件已经存在'

    else:
        # 去除首位空格
        path = path.strip()
        # 去除尾部 \ 符号
        path = path.rstrip("\\")

        isExists = os.path.exists(path)

        # 判断目录是否存在
        if not isExists:
            os.makedirs(path)
        else:
            error = path + u' 目录已存在'



#mkpath="d:\\qttc\\web\ss.ddb"

#mkdir(mkpath)


	

