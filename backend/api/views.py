from huggingface_hub import InferenceClient
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from io import BytesIO
import base64
from PIL import Image
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
@csrf_exempt
def generate_image(request):
    client = InferenceClient("stabilityai/stable-diffusion-3.5-large", token=settings.HF_API_KEY)
    prompt = request.data.get('prompt')
    
    if not prompt:
        return Response({'error': 'No prompt provided'}, status=400)
    
    try:
        image = client.text_to_image(prompt)
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        return Response({'image': img_str})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


# @api_view(['POST'])
# def generate_audio(request):
