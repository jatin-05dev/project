from django.shortcuts import render
from django.shortcuts import render
from .serializers import UserSerializers
from rest_framework import viewsets
from .models import User
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializers