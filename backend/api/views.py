from huggingface_hub import InferenceClient
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer, GeneratedArtSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status, generics, permissions
from django.conf import settings
from io import BytesIO
import base64
from PIL import Image
from django.views.decorators.csrf import csrf_exempt
from .models import GeneratedArt

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])  # Allow unauthenticated access
def generate_image(request):
    client = InferenceClient("stabilityai/stable-diffusion-3.5-large", token=settings.HF_API_KEY)
    prompt = request.data.get('prompt')
    
    if not prompt:
        return Response({'error': 'No prompt provided'}, status=400)
    
    try:
        width = 1280   # Width in pixels (16 units)
        height = 720  # Height in pixels (9 units)
        
        # Generate the image with specified dimensions
        image = client.text_to_image(prompt, width=width, height=height)
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        return Response({'image': img_str})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


# @api_view(['POST'])
# def generate_audio(request): Waiting for TTA api to become available

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] # Allow anyone to register

class LoginView(TokenObtainPairView): # Use TokenObtainPairView for login and token generation
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny] # Allow anyone to login

class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]  # Require authentication to logout

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserArtsListCreateView(generics.ListCreateAPIView):
    serializer_class = GeneratedArtSerializer
    permission_classes = [permissions.IsAuthenticated] # Require authentication to save art

    def get_queryset(self):
        # Return only the logged-in user's arts
        return GeneratedArt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user to the currently authenticated user when saving art
        serializer.save(user=self.request.user)