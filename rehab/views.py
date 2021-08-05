from django.shortcuts import render, redirect

def index(request):
    return render(request, 'rehab/index.html')

def select(request):
    return render(request, 'rehab/RehabSelect.html')

def manage(request):
    return render(request, 'rehab/manage.html')

def rehab(request):
    return render(request, 'rehab/Rehab.html')