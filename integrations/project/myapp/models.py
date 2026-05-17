from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    roll_no = models.CharField(max_length=20)
    course = models.CharField(max_length=50)

    def __str__(self):
        return self.name