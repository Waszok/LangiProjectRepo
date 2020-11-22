from django import template

register = template.Library()


@register.filter(name='getUsername')
def getUsername(value):
    if len(value) > 10:
        return value[0:7] + '...'
    return value
