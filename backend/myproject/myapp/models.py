from django.db import models

# Create your models here.
class User(models.Model):
    name=models.CharField(max_length=23)
    age=models.IntegerField()
    city=models.CharField(max_length=23)
    contact=models.CharField(max_length=23)


