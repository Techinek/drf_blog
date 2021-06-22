from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """Serializer for posts"""
    author = serializers.SerializerMethodField()

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

    def get_author(self, obj):
        return obj.author.author.username
