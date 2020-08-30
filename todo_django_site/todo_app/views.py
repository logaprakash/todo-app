from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from todo_app.models import Bucket, Todo
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def get_buckets(request):
    if request.method == 'GET':
        bucket_list = Bucket.objects.all()
        logger.error(bucket_list)
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
                    "text":todo.todo_text,
                    "is_checked":todo.is_checked
                }
                response["todo_list"].append(todo)
            responseList.append(response)

        return Response(responseList)

@api_view(['DELETE'])
def delete_bucket(request):
    if request.method == 'DELETE':
        data = request.data.dict()
        bucket = Bucket.objects.get(pk=data["bucket_id"])
        bucket.delete()
        # todo_list = Todo.objects.filter(bucket_id=data["bucket_id"])
        # for todo in todo_list:
        #     todo.delete()
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
        logger.error(request.POST)
        responseList = []
        return Response(responseList)


