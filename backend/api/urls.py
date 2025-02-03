from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('generate-image/', views.generate_image, name='generate_image'),
    # path('generate_audio/', generate_audio, name='generate_audio'),
    path('register/', views.RegisterView.as_view(), name='register'), # Registration endpoint
    path('login/', views.LoginView.as_view(), name='login'),       # Login endpoint (token obtain)
    path('logout/', views.LogoutView.as_view(), name='logout'),     # Logout endpoint (token blacklist)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Token refresh endpoint (from simplejwt)
    path('user-arts/', views.UserArtsListCreateView.as_view(), name='user-arts'),
    path('user/', views.UserDetailView.as_view(), name='user_detail'),
    path('user-arts/<int:pk>/delete/', views.UserArtDestroyView.as_view(), name='art-delete'),

]

