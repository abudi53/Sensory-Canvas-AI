# api/models.py
from django.db import models
from django.contrib.auth.models import User

class GeneratedArt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='generated_arts')
    prompt = models.TextField()
    image_base64 = models.TextField() 
    sound_url = models.URLField(blank=True, null=True) # Or FileField, waiting for TTA API
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Art by {self.user.username} - Prompt: {self.prompt[:50]}..."