from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django_otp.plugins.otp_totp.models import TOTPDevice

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('/') 
        else:
            messages.error(request, 'Invalid login credentials.')

    return render(request, 'frontend/login.html')

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            totp_device = TOTPDevice.objects.create(user=user, confirmed=True)
            totp_device.save()
            otp_code = totp_device.generate_token()
            print(f"OTP Code: {otp_code}")
            return redirect('/login')  # Thay 'your_dashboard_url' bằng URL của trang dashboard của bạn

    return render(request, 'frontend/register.html')
