from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=20, default="", null=True, blank=True,)
    body = models.TextField(max_length=200, default="", null=True, blank=True,)

    def __str__(self):
        return self.title