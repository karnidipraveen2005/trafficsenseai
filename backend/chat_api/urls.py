from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.health, name='chat-health'),
    path('message/', views.message, name='chat-message'),
    path('history/', views.history, name='chat-history'),
]
