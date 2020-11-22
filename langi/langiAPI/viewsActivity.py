from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UpdateActivityLearnSerializer, UpdateActivitySnakeSerializer, UpdateActivityDDSerializer

from .models import Activity, Deck


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def activityListLearn(request, pk):
    try:
        activity = Activity.objects.filter(deck_id=pk)
        json = {'snake_score': activity[0].snake_score, 'drag_drop_score': activity[0].drag_drop_score,
        'again': activity[0].again, 'very_hard': activity[0].very_hard, 
        'hard': activity[0].hard, 'medium': activity[0].medium, 'easy': activity[0].easy}
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(json)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def activityListGame(request, pk):
    try:
        activity = Activity.objects.filter(deck_id=pk)
        json = {'snake_score': activity[0].snake_score, 'drag_drop_score': activity[0].drag_drop_score}
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(json)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def activityCreate(request, pk):
    deck = Deck.objects.get(id=pk)
    activity = Activity(deck=deck)
    activity.save()
    return Response({"message": "ok"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def activityUpdateLearn(request, pk):
    try:
        activity = Activity.objects.filter(deck_id=pk)
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UpdateActivityLearnSerializer(instance=activity[0], data=request.data)

    if serializer.is_valid():
        serializer.save(deck_id=pk)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def activityUpdateSnake(request, pk):
    try:
        activity = Activity.objects.filter(deck_id=pk)
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UpdateActivitySnakeSerializer(instance=activity[0], data=request.data)

    if serializer.is_valid():
        serializer.save(deck_id=pk)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def activityUpdateDD(request, pk):
    try:
        activity = Activity.objects.filter(deck_id=pk)
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UpdateActivityDDSerializer(instance=activity[0], data=request.data)

    if serializer.is_valid():
        serializer.save(deck_id=pk)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)