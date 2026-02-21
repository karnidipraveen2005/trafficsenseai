from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts_api.urls')),
    path('api/accounts/', include('accounts_api.urls')),
    path('api/chat/', include('chat_api.urls')),
]
