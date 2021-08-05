from django.urls import path
from . import views

app_name = 'rehab'

urlpatterns = [
    path('', views.index, name=''),
    path('index/', views.index, name='index'),
    path('select/', views.select, name='select'),
    path('manage/', views.manage, name='manage'),
    path('rehab/', views.rehab, name='Rehab'),
]