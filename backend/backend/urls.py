from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def root_api_view(request):
    return JsonResponse({"message": "Welcome to the Sensory Canvas AI API!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/', root_api_view, name='api-root'), 
    path('', root_api_view, name='site-root'), 
]
