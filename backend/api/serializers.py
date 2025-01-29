from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import GeneratedArt

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email') # Include fields you want to expose
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2') # Remove password2 before creating user
        user = User.objects.create_user(**validated_data) # Use create_user for password hashing
        return user


class LoginSerializer(TokenObtainPairSerializer):
    pass 

class GeneratedArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedArt
        fields = ('id', 'prompt', 'image_base64', 'sound_url', 'created_at') 
        read_only_fields = ('id', 'created_at', 'user') 