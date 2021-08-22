from django.shortcuts import render, redirect
from .models import manage
from django.utils import timezone

def index(request):
    return render(request, 'rehab/index.html')

def select(request):
    return render(request, 'rehab/RehabSelect.html')

def my_manage(request):
    return render(request, 'rehab/manage.html')

def rehab(request):
    m = manage(user_id = request.user , part = request.GET.get('part'), level = request.GET.get('step'), create_at = timezone.now())
    m.save()
    context = {
        'part' : request.GET.get('part'),
        'level' : request.GET.get('step')
    }
    return render(request, 'rehab/Rehab.html', context)