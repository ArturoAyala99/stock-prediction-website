from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
class RegisterView(generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes is used to restrict the permission for this view
    permission_classes = [] #allow any to this view

# only the login users can see this protected view
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated] # allow only the login users

    def get(self, data):
        response = {
            'status': 'request was allowed'
        }

        return Response(response)