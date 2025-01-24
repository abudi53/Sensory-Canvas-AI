from huggingface_hub import InferenceClient
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from io import BytesIO
import base64
import requests
from django.http import HttpResponse



@api_view(['POST'])
def generate_image(request):
    client = InferenceClient("black-forest-labs/FLUX.1-dev", token=settings.HF_API_KEY)
    image = client.text_to_image("Astronaut riding a horse")
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    return Response({'image': img_str})

# @api_view(['POST'])
# def generate_audio(request):
