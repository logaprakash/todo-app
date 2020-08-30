from django.db import models

class Bucket(models.Model):
    bucket_id = models.AutoField(primary_key=True)
    bucket_name = models.CharField(max_length=60)

    def __str__(self):
        return self.bucket_name


class Todo(models.Model):
    todo_id = models.AutoField(primary_key=True)
    todo_text = models.CharField(max_length=512)
    is_checked = models.BooleanField(default=False)
    bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE)

    def __str__(self):
        return self.todo_text
