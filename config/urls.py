from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('rehab.urls')),
    path('common/', include('common.urls')),
]
