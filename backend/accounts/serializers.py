from django.contrib.auth.models import User
from rest_framework import serializers

# we use the default django user model for the registration
class UserSerializer(serializers.ModelSerializer):
    # password will be only worked with post and put request (Not with the GET)
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data): # comes with the ModelSerializer
        # objects.create_user automatically hash the password. objects.create saves the password in a plain text
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        # or we can use  user = User.objects.create_user(**validated_data) if we have required fields
    
        return user