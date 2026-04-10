from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import time

class LoginView(APIView):
    """
    Step 1: Yahan se token milega.
    Lekin yaad rahe, settings me token 1 second me expire ho raha hai!
    """
    def post(self, request):
        user, _ = User.objects.get_or_create(username='hunter_pro')
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'message': 'Token generated successfully. Use it as Bearer token.'
        })

class VaultView(APIView):
    """
    Step 2: Yeh asali vault hai.
    Team ko yahan 2 bade hurdles milenge:
    1. Middleware (Secret Hash)
    2. Infinite Loop (Performance)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # --- RIDDLE FOR MIDDLEWARE (Team must solve this for X-SECRET-HASH) ---
        # "Riddle: If a Fibonacci-like sequence starts with 10 and 11, 
        # what is the 5th number in that sequence?"
        # Sequence: 10, 11, 21, 32, 53... (Answer: 53)

        # --- THE INFINITE LOOP TRAP (Bug 3) ---
        # Team ko ye niche wala poora block delete karna padega response paane ke liye.
        # Agar ye loop chala, toh frontend "Timeout" dikhayega.
        # --- THE FINAL REWARD ---
        return Response({
            'flag': 'TECHHUNT{JW7_M1DDL3W4R3_0P71M1Z3D}',
            'message': 'Legendary! You cleared all the hurdles and optimized the backend.'
        })