from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User

# Create your views here.
class RegisterView(generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes is used to restrict the permission for this view
    permission_classes = [] #allow any to this view