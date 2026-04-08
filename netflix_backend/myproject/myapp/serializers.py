from rest_framework import serializers
from .models import Content

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'
        # Jo fields compulsory nahi hain unhe extra_kwargs mein dal do
        extra_kwargs = {
            'trailer_url': {'required': False, 'allow_blank': True},
            'category': {'required': False, 'allow_blank': True},
        }

from .models import Plan

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'