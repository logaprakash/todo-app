from rest_framework import serializers

from todo_app.models import Bucket,Todo

class BucketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bucket
        fields = ('bucket_id', 'bucket_name')

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('todo_id', 'todo_text','is_checked','bucket')