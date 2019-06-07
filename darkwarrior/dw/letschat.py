# encoding:utf-8
import pymongo
from pymongo import MongoClient

#任务单关联xmpp,xmpp中room创建
class Letschat:
    roomObjectId="" #房间ID
    taskId=""   #任务单ID
    taskSummary=""  #任务单描述
    collectionRooms={}

    def __init__(self,taskID,taskSummary):
        conn = MongoClient('localhost', 27017)
        db = conn.letschat
        self.collectionRooms = db.rooms
        self.taskID=taskID
        self.taskSummary=taskSummary
    def createRoom(self,taskID,taskSummary):
        """
        :param taskID: 任务单ID
        :param taskSummary: 任务单描述
        :return: rooms
        """
        chatRoom = self.taskID + self.taskSummary           #根据任务ID和名称新建一个chat room
        roomsList=[]
        for room in self.collectionRooms.find():
            roomsList.append(room['name'])
        if chatRoom not in roomsList:
            self.collectionRooms.insert({'name':chatRoom,'slug':chatRoom,'description':chatRoom})
        return self.collectionRooms
    def findRoom(self,taskID,taskSummary):
        """
        :param taskID: 任务单ID
        :param taskSummary: 任务单描述
        :return: romm id
        """
        chatRoom = self.taskID + self.taskSummary
        self.roomObjectId=self.collectionRooms.find_one({'name':chatRoom})['_id']

        return self.roomObjectId

class FindLetchat():
    collectionMessages = {}
    def __init__(self):
        conn = MongoClient('localhost', 27017)
        db = conn.letschat

        self.collectionMessages=db.messages

    def findNumMessage(self,lasttime):
        '''
        :param lasttime:上次查看的时间
        :return: num 距离上次查看后的消息数量
        '''
        num=self.collectionMessages.find({'posted':{"$gt":lasttime}}).count()
        return num
