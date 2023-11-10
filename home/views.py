from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'frontend/index.html')

def lessons(request):
    return render(request, 'frontend/lessons.html')

def assignments(request):
    return render(request, 'frontend/assignments.html')

def news(request):
    return render(request, 'frontend/news.html')

def contact(request):
    return render(request, 'frontend/contact.html')

