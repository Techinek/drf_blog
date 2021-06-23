from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView
)
from rest_framework.permissions import AllowAny

from .models import Author, Post
from .serializers import (
    PostSerializer,
    PostCreateSerializer,
    AuthorSerializer)


def home(request):
    return render(request, 'index.html')


def post_detail(request, pk):
    return render(request, 'post_detail.html')


class AuthorDetailView(RetrieveAPIView):
    """View to render authors"""

    permission_classes = (AllowAny,)
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class PostListView(ListAPIView):
    """View to render posts"""

    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostCreateView(CreateAPIView):
    """View to create posts"""

    permission_classes = (AllowAny,)
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()


class PostDetailView(RetrieveAPIView):
    """View to display a single post"""

    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostUpdateView(UpdateAPIView):
    """View to update a single post"""

    permission_classes = (AllowAny,)
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()
