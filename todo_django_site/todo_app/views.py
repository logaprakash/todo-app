from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from todo_app.models import Bucket, Todo
import logging
import json

logger = logging.getLogger(__name__)


@api_view(['GET'])
def get_buckets(request):
    if request.method == 'GET':
        bucket_list = Bucket.objects.all()
        responseList = []
        for bucket in bucket_list:
            response = {
                "bucket_id":bucket.bucket_id,
                "bucket_name":bucket.bucket_name,
                "todo_list":[]
            }
            todo_list =Todo.objects.filter(bucket_id =bucket.bucket_id)
            for todo in todo_list:
                todo = {
                    "todo_id":todo.todo_id,
                    "todo_text":todo.todo_text,
                    "is_checked":todo.is_checked
                }
                response["todo_list"].append(todo)
            responseList.append(response)
        logger.error(responseList)
        return Response(responseList)

@api_view(['DELETE'])
def delete_bucket(request):
    if request.method == 'DELETE':
        data = request.data.dict()
        bucket = Bucket.objects.get(pk=data["bucket_id"])
        bucket.delete()
        return Response("Deleted")

@api_view(['DELETE'])
def delete_todo_from_bucket(request):
    if request.method == 'DELETE':
        data = request.data.dict()
        todo = Todo.objects.get(pk=data["todo_id"])
        todo.delete()
        return Response("Deleted")

@api_view(['POST'])
def insert_bucket(request):
    if request.method == 'POST':
        data = request.data.dict()
        Bucket.objects.create(bucket_name=data["bucket_name"])
        return Response("Bucket added")

@api_view(['POST'])
def insert_todo_to_bucket(request):
    if request.method == 'POST':
        data = request.data.dict()
        bucket = Bucket.objects.get(bucket_id=data["bucket_id"])
        Todo.objects.create(todo_text=data["todo_text"],is_checked=False,bucket=bucket)        
        return Response("Todo added to bucket")

@api_view(['POST'])
def save_bucket(request):
    if request.method == 'POST':
        data = request.data.dict()
        data_todo_list = json.loads(data["todo_list"])
       
        todo_dict = {}
        for todo in data_todo_list:
            todo_dict[todo["todo_id"]] = todo
        logger.error(todo_dict)
        todo_list =Todo.objects.filter(bucket_id =data["bucket_id"])
        for todo in todo_list:
            if todo.todo_id in todo_dict:
                todo_obj = Todo.objects.get(pk=todo.todo_id)
                if "todo_text" in todo_dict[todo.todo_id]:
                    todo_obj.todo_text = todo_dict[todo.todo_id]["todo_text"]
                if "is_checked" in todo_dict[todo.todo_id]:
                    todo_obj.is_checked = todo_dict[todo.todo_id]["is_checked"]
                todo_obj.save()
        return Response("Saved Bucket")


