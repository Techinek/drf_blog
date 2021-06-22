from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Author(models.Model):
    """Model for binding posts with authors"""
    author = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username


class Post(models.Model):
    """Model for creating posts"""
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
