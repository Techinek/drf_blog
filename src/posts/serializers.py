from rest_framework import serializers

from .models import Post, Author


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for authors of posts"""
    username = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ('username',)

    def get_username(self, obj):
        return obj.author.username


class PostSerializer(serializers.ModelSerializer):
    """Serializer for posts"""

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'published_date',
            'updated',
            'author',
        )


class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating posts"""

    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'author',
        )
