from django.urls import include, path 
from django.conf.urls import url
from rest_framework import routers
from todo_app import views


urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^get_buckets', views.get_buckets, name='get_buckets'),
    url(r'^save_bucket', views.save_bucket, name='save_bucket'),
    url(r'^insert_bucket', views.insert_bucket, name='insert_bucket')

]

