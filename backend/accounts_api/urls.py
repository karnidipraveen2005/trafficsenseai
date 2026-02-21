from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.health, name='auth-health'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/', views.profile, name='profile'),
    path('logout/', views.logout, name='logout'),
]
