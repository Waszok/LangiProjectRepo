from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True, help_text='Required. Inform a valid email address.', )
    language = forms.CharField()
    agreement = forms.BooleanField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'language', 'agreement']

    def clean_email(self):
        email = self.cleaned_data.get("email")
        user_count = User.objects.filter(email=email).count()
        if user_count > 0:
            raise forms.ValidationError(_("User with this email address already exists."))
        return email

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs.pop("autofocus", None)
        # add custom error messages
        self.fields['agreement'].error_messages.update({
            'required': _('You must accept the Terms & Conditions'),
        })

        self.fields['username'].error_messages.update({
            'required': _('All fields are required.'),
            'invalid': _('Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.'),
            'max_length': _('The username cannot contain more than 150 characters.'),
            'unique': _('A user with that username already exists.'),
        })
        self.fields['email'].error_messages.update({
            'required': _('All fields are required.'),
            'invalid': _('Enter a valid email address.'),
        })
        self.fields['password1'].error_messages.update({
            'required': _('All fields are required.'),
        })
        self.fields['password2'].error_messages.update({
            'required': _('All fields are required.'),
        })

        self.error_messages.update({
            'password_mismatch': _('The two password fields didn’t match.'),
        })

        self.fields['username'].help_text = _('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.')
        self.fields['password1'].help_text = _("Your password can't be too similar to your other personal information. Your password must contain at least 8 characters. Your password can't be a commonly used password. Your password can't be entirely numeric.")


class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs.pop("autofocus", None)
        # add custom error messages
        self.error_messages.update({
            'invalid_login': _('Please enter valid login details.'),
        })


class EmailValidationOnForgotPassword(PasswordResetForm):
    def clean_email(self):
        email = self.cleaned_data['email']
        if not User.objects.filter(email__iexact=email, is_active=True).exists():
            msg = _('There is no user registered with the specified email address.')
            self.add_error('email', msg)
        return email

    def __init__(self, *args, **kwargs):
        super(EmailValidationOnForgotPassword, self).__init__(*args, **kwargs)

        self.fields['email'].widget.attrs.pop("autofocus", None)
        # add custom error messages
        self.fields['email'].error_messages.update({
            'required': _('Please enter email address.'),
            'invalid': _('Enter a valid email address.'),
        })


class PasswordValidationOnForgotPassword(SetPasswordForm):
    def __init__(self, *args, **kwargs):
        super(PasswordValidationOnForgotPassword, self).__init__(*args, **kwargs)

        self.error_messages.update({
            'password_mismatch': _('The two password fields didn’t match.'),
        })

        self.fields['new_password1'].error_messages.update({
            'required': _('All fields are required.'),
        })
        self.fields['new_password2'].error_messages.update({
            'required': _('All fields are required.'),
        })

        self.fields['new_password1'].help_text = _("Your password can't be too similar to your other personal information. Your password must contain at least 8 characters. Your password can't be a commonly used password. Your password can't be entirely numeric.")
