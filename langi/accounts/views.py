from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages

from .forms import SignUpForm, LoginForm
from django.utils.translation import gettext as _
from .utilitySet import getLanguageCode

LANGUAGE_QUERY_PARAMETER = 'language'


def signUpPage(request):
    if request.user.is_authenticated:
        return redirect('mainContent:home')
    else:
        if request.method == 'POST':
            form = SignUpForm(request.POST)
            if form.is_valid():
                user = form.save()
                user.refresh_from_db()
                user.profile.language = getLanguageCode(form.cleaned_data.get('language'))
                user.profile.agreement = form.cleaned_data.get('agreement')
                user.save()
                username = form.cleaned_data.get('username')
                messages.success(request, _(f"New account was successfully created: {username}"))
                return redirect('accounts:login')
            else:
                for msg in form.error_messages:
                    messages.error(request, f"{msg}:{form.error_messages[msg]}")
        else:
            form = SignUpForm()
        context = {'form': form}
        return render(request, 'accounts/signup.html', context)


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('mainContent:home')
    else:
        if request.method == 'POST':
            form = LoginForm(request, request.POST)
            if form.is_valid():
                username = form.cleaned_data.get('username')
                raw_password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=raw_password)
                if user is not None:
                    login(request, user)
                    return redirect('mainContent:home')
                else:
                    messages.error(request, _("Invalid username or password."))
            else:
                messages.error(request, _("Invalid username or password."))
        else:
            form = LoginForm()
        context = {'form': form}
        return render(request, 'accounts/login.html', context)


def logoutUser(request):
    logout(request)
    messages.info(request, "Logged out successfully.")
    return redirect('accounts:login')


def termsPage(request):
    return render(request, 'accounts/terms.html')


def privacyPage(request):
    return render(request, 'accounts/privacy.html')
