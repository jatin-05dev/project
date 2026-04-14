from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Marks
from .serializers import (
    UserSerializer,
    SignupSerializer,
    LoginSerializer,
    MarksSerializer
)


# SIGNUP API
class SignupAPI(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User created",
                "user_id": user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# LOGIN API
class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                user = User.objects.get(email=email, password=password)
                print("Hint :- are you sure about you are on righjt")
                return Response({
                    "message": "Login successful",
                    "user_id": user.id,
                    "user_name": user.name,
                    "user_email": user.email
                })

            except User.DoesNotExist:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# HOME / PROFILE API
class HomeAPI(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            marks = Marks.objects.filter(user=user)

            return Response({
                "user": UserSerializer(user).data,
                "marks": MarksSerializer(marks, many=True).data
            })

        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )


# ADD MARKS API
class AddMarksAPI(APIView):
    def post(self, request):
        user_id = request.data.get('user')
        subject = request.data.get('subject')
        marks_value = request.data.get('marks')

        try:
            user = User.objects.get(id=user_id)

            mark = Marks.objects.create(
                user=user,
                subject=subject,
                marks=marks_value
            )

            return Response({
                "message": "Marks added",
                "data": MarksSerializer(mark).data
            })

        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )