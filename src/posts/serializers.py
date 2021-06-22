from rest_framework import serializers

from .models import Post


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
