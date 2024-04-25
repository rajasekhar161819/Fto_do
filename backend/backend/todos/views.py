from django.shortcuts import render
from rest_framework import generics, permissions
from .permissions import IsAuthorOrReadOnly
from .models import Todo
from .serilizers import TodoSerializer
# Create your views here.

class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = (IsAuthorOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
