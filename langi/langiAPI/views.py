from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import DeckSerializer

from .models import Deck


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'ListDeck': '/deck-list/',
        'DeckInfo': '/deck-info/<str:pk>/',
        'CreateDeck': '/deck-create/',
        'UpdateDeck': '/deck-update/<str:pk>/',
        'DeleteDeck': '/deck-delete/<str:pk>/',
        'ListCard': '/card-list/<str:pk>/',
        'CardInfo': '/card-info/<str:pk>/',
        'CreateCard': '/card-create/<str:pk>/',
        'CardsNumber': '/card-number/<str:pk>/',
        'ListCardPart': '/card-list-part/<str:pk>/<str:sn>',
        'ListCardGames': '/card-for-games/<str:pk>/<str:sn>',
        'ListAllCard': '/card-list-all/<str:pk>/',
        'ListAllCardActivity': '/card-list-all-activity/<str:pk>/',
        'DeleteCard': '/card-delete/<str:pk>/',
        'UpdateCardLearn': '/card-update-learn/<str:pk>/',
        'ListLearnActivity': '/activity-list-learn/<str:pk>/',
        'ListGameActivity': '/activity-list-game/<str:pk>/',
        'ActivityCreate': '/activity-create/<str:pk>/',
        'ActivityUpdateLearn': '/activity-update-learn/<str:pk>/',
        'ActivityUpdateSnake': '/activity-update-snake/<str:pk>/',
        'ActivityUpdateDD': '/activity-update-dd/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def deckList(request):
    try:
        decks = Deck.objects.filter(author=request.user)
    except Deck.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DeckSerializer(decks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def deckInfo(request, pk):
    try:
        deck = Deck.objects.get(id=pk)
    except Deck.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DeckSerializer(deck, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def deckCreate(request):
    serializer = DeckSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def deckUpdate(request, pk):
    try:
        deck = Deck.objects.get(id=pk)
    except Deck.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DeckSerializer(instance=deck, data=request.data)

    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def deckDelete(request, pk):
    try:
        deck = Deck.objects.get(id=pk)
    except Deck.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    deck.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
