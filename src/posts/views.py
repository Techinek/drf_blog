from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Author, Post
from .serializers import PostSerializer, PostCreateSerializer


def home(request):
    return render(request, 'index.html')

def post_detail(request, pk):
    return render(request, 'post_detail.html')


class PostListView(ListAPIView):
    """View to render posts"""

    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()



class PostCreateView(CreateAPIView):
    """View to create posts"""

    permission_classes = (AllowAny, )
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()


class PostDetailView(RetrieveAPIView):
    """View to display a single post"""

    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()

