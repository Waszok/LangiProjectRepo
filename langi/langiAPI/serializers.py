from rest_framework import serializers
from .models import Deck, Card, Activity


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ('id', 'created_date', 'name', 'tags')


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'language_front', 'language_back', 'text_front', 'text_back',
            'example_sentence_one', 'example_sentence_two', 'example_sentence_three', 
            'image_front', 'image_back', 'main_image', 'sound', 'created_date', 'repeat_date', 
            'sumAnswers', 'allAnswers', 'repetitions', 'interval', 'easiness')


class CardUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'repeat_date', 'sumAnswers', 'allAnswers', 'repetitions', 'interval', 'easiness')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'snake_score', 'drag_drop_score', 'again', 'very_hard', 'hard', 'medium', 'easy')


class UpdateActivityLearnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('again', 'very_hard', 'hard', 'medium', 'easy')


class UpdateActivitySnakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('snake_score',)


class UpdateActivityDDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('drag_drop_score',)