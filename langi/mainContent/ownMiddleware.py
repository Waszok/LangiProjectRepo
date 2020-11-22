from django.utils import translation
from django.conf import settings


class OwnMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response
        self.is_logged = False

    def __call__(self, request):
        if not request.path.startswith('/api/') and not request.path.startswith('/ajax/'):
            response = self.get_response(request)
            if request.user.is_authenticated:
                self.is_logged = True
                user = request.user
                language_code = user.profile.language
                language_code = language_code

                translation.activate(language_code)

                request.session[translation.LANGUAGE_SESSION_KEY] = language_code
                request.COOKIES[settings.LANGUAGE_COOKIE_NAME] = language_code
                request.META['HTTP_ACCEPT_LANGUAGE'] = language_code
                request.LANGUAGE_CODE = language_code
                request.session['django_language'] = language_code
                
                response = self.get_response(request)
                translation.deactivate()
                return response
            if not request.user.is_authenticated:
                self.is_logged = False
            return response
        else:
            response = self.get_response(request)
            return response

