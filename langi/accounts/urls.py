from django.urls import path
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy
from .forms import EmailValidationOnForgotPassword, PasswordValidationOnForgotPassword

from . import views

app_name = 'accounts'

urlpatterns = [
    # path('', views.test, name='home'),
    path('signup/', views.signUpPage, name='signup'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('tc/', views.termsPage, name='terms'),
    path('privacy/', views.privacyPage, name='privacy'),

    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='accounts/password_reset_form.html', success_url=reverse_lazy('accounts:password_reset_done'), form_class=EmailValidationOnForgotPassword), name='password_reset'),

    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='accounts/password_reset_done.html'), name='password_reset_done'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='accounts/password_reset_confirm.html', success_url=reverse_lazy('accounts:password_reset_complete'), form_class=PasswordValidationOnForgotPassword), name='password_reset_confirm'),

    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_complete.html'), name='password_reset_complete'),
]
