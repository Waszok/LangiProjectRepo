from django.urls import path
from . import views, viewsCard, viewsActivity

app_name = 'langiAPI'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('deck-list/', views.deckList, name='deck-list'),
    path('deck-info/<str:pk>/', views.deckInfo, name='deck-info'),
    path('deck-create/', views.deckCreate, name='deck-create'),
    path('deck-update/<str:pk>/', views.deckUpdate, name='deck-update'),
    path('deck-delete/<str:pk>/', views.deckDelete, name='deck-delete'),
    path('card-list/<str:pk>/', viewsCard.cardList, name='card-list'),
    path('card-info/<str:pk>/', viewsCard.cardInfo, name='card-info'),
    path('card-create/<str:pk>/', viewsCard.cardCreate, name='card-create'),
    path('card-number/<str:pk>/', viewsCard.cardNumbers, name='card-number'),
    path('card-list-part/<str:pk>/<str:sn>', viewsCard.cardListPart, name='card-list-part'),
    path('card-for-games/<str:pk>/<str:sn>', viewsCard.cardsForGames, name='card-for-games'),
    path('card-list-all/<str:pk>/', viewsCard.cardListAll, name='card-list-all'),
    path('card-list-all-activity/<str:pk>/', viewsCard.cardListAllActivity, name='card-list-all-activity'),
    path('card-delete/<str:pk>/', viewsCard.cardDelete, name='card-delete'),
    path('card-update-learn/<str:pk>/', viewsCard.cardUpdateLearn, name='card-update-learn'),
    path('activity-create/<str:pk>/', viewsActivity.activityCreate, name='activity-create'),
    path('activity-list-learn/<str:pk>/', viewsActivity.activityListLearn, name='activity-list-learn'),
    path('activity-list-game/<str:pk>/', viewsActivity.activityListGame, name='activity-list-game'),
    path('activity-update-learn/<str:pk>/', viewsActivity.activityUpdateLearn, name='activity-update-learn'),
    path('activity-update-snake/<str:pk>/', viewsActivity.activityUpdateSnake, name='activity-update-snake'),
    path('activity-update-dd/<str:pk>/', viewsActivity.activityUpdateDD, name='activity-update-dd'),
]
