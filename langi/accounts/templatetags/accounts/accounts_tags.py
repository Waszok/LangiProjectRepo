from django import template

register = template.Library()


@register.filter(name='getMessage')
def getMessage(value):
    for field in value:
        for error in field.errors:
            print(error)
            return error
    return ''
