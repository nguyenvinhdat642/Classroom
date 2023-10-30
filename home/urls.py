from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('assignments/', views.assignments),
    path('lessons/', views.lessons),
    path('news/', views.news),    
    path('contact/', views.contact)
]
