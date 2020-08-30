from django.contrib import admin


from todo_app.models import Bucket,Todo
admin.site.register(Bucket)
admin.site.register(Todo)