from django.urls import path
from .views import generate_image
# generate_audio

urlpatterns = [
    path('generate-image/', generate_image, name='generate_image'),
    # path('generate_audio/', generate_audio, name='generate_audio'),
]