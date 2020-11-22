from django.urls import path

from . import views

app_name = 'mainContent'

urlpatterns = [
    path('', views.homePage, name='home'),
    path('decks/', views.deckPage, name='decks'),
    path('addCard/', views.addCardPage, name='addCard'),
    path('learn/', views.learnPage, name='learn'),
    path('games/', views.gamesPage, name='games'),
    path('about/', views.aboutPage, name='about'),
    path('ajax/change-language', views.changeLanguage, name='change-language'),
    path('ajax/change-theme', views.changeTheme, name='change-theme'),
    path('ajax/import-textFile', views.importTextFile, name='import-textFile'),
    path('ajax/import-imgFile', views.importImgFile, name='import-imgFile'),
]
