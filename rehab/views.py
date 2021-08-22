from django.shortcuts import render, redirect
from .models import manage
from django.utils import timezone

def index(request):
    return render(request, 'rehab/index.html')

def select(request):
    return render(request, 'rehab/RehabSelect.html')

def my_manage(request):
    if request.method == 'POST':
        m = manage(user_id=request.user, part=request.POST.get('part'), level=request.POST.get('step'), create_at=timezone.now())
        m.save()
    return render(request, 'rehab/manage.html')

def rehab(request):
    context = {
        'part' : request.GET.get('part'),
        'step' : request.GET.get('step')
    }
    return render(request, 'rehab/Rehab.html', context)