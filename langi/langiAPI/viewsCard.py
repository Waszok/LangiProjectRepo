from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CardSerializer, CardUpdateSerializer

from .models import Card

import datetime
import random


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardList(request, pk):
    try:
        cards = Card.objects.filter(deck_id=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardListPart(request, pk, sn):
    try:
        cards = Card.objects.filter(deck_id=pk)
        today = datetime.date.today()
        actualCards = []
        for card in cards:
            date_difference = card.repeat_date - today
            if date_difference.days <= 0:
                actualCards.append(card)

        numberOfCards = len(actualCards)
        numberToDrawn = int(sn)
        if numberOfCards < numberToDrawn:
            numberToDrawn = numberOfCards
        
        cardsToShow = random.sample(list(actualCards), numberToDrawn)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CardSerializer(cardsToShow, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardListAll(request, pk):
    try:
        cards = Card.objects.filter(deck_id=pk)
        content = []
        for card in cards:
            json = {'id': card.pk, 'text_front': card.text_front, 'text_back': card.text_back, 
            'image_front': card.image_front, 'image_back': card.image_back}
            content.append(json)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(content)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardListAllActivity(request, pk):
    try:
        cards = Card.objects.filter(deck_id=pk)
        content = []
        for card in cards:
            json = {'id': card.pk, 'text_front': card.text_front, 'text_back': card.text_back, 
            'image_front': card.image_front, 'image_back': card.image_back, 
            'sumAnswers': card.sumAnswers, 'allAnswers': card.allAnswers}
            content.append(json)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(content)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardsForGames(request, pk, sn):
    try:
        cards = Card.objects.filter(deck_id=pk)
        numberOfCards = len(cards)
        
        numberToDrawn = int(sn)
        if numberOfCards < numberToDrawn:
            numberToDrawn = numberOfCards
        
        drawnNumbers = random.sample(range(numberOfCards), numberToDrawn)
        answerNumber = -1
        if numberToDrawn > 0:
            answerNumber = random.randint(0, numberToDrawn - 1)
        content = []
        for number in drawnNumbers:
            json = {'text_front': cards[number].text_front, 'text_back': cards[number].text_back, 
            'image_front': cards[number].image_front, 'image_back': cards[number].image_back}
            content.append(json)
        content.append({'answer': answerNumber})
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(content)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardInfo(request, pk):
    try:
        card = Card.objects.get(id=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CardSerializer(card, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def cardUpdateLearn(request, pk):
    try:
        card = Card.objects.get(id=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CardUpdateSerializer(instance=card, data=request.data)

    if serializer.is_valid():
        serializer.save(id=pk)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def cardCreate(request, pk):
    serializer = CardSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(deck_id=pk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get number of flashcards in selected deck
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def cardNumbers(request, pk):
    try:
        cards = Card.objects.filter(deck_id=pk)
        today = datetime.date.today()
        actualCards = []
        for card in cards:
            date_difference = card.repeat_date - today
            if date_difference.days <= 0:
                actualCards.append(card)
      
        allCards = len(cards)
        todayCards = len(actualCards)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    content = {'all_cards': allCards, 'today_cards': todayCards}
    return Response(content)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def cardDelete(request, pk):
    try:
        card = Card.objects.get(id=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    card.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
