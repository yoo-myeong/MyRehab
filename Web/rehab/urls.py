from django.urls import path
from . import views

app_name = 'rehab'

urlpatterns = [
    path('', views.index, name=''),
    path('index/', views.index, name='index'),
    path('select/', views.select, name='select'),
    path('manage/', views.my_manage, name='my_manage'),
    path('rehab/', views.rehab, name='Rehab'),
    path('game_list/', views.game_list, name='game_list'),
    path('gyro/', views.gyro, name='gyro'),
    path('rythm/', views.rythm, name='rythm'),
]