from rest_framework import serializers


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    phone = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=128, write_only=True)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)


class ProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120, required=False)
    phone = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(min_length=8, max_length=128, required=False, write_only=True)
