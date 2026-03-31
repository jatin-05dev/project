from rest_framework import serializers
from .models import User


# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ["id", "name", "email", "contact", "age"]


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

 