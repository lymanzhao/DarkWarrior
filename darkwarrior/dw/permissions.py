#coding:utf8
def user_permissions(user): #用户所有权限.
    '''
    :param user:  用户对象
    :return:    用户所有权限
    '''
    user_permissions = user.user_permission.all()

    for group in user.group.all():
        user_permissions = list(group.group_permission.all())+list(user_permissions)
    user_all_perssions = list(set(user_permissions))

    return user_all_perssions