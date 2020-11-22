from django.db import models
from django.contrib.auth import get_user_model
from datetime import date
import uuid

from django.db.models.signals import post_delete
from django.dispatch import receiver


class Deck(models.Model):
    author = models.ForeignKey(
      get_user_model(),
      on_delete=models.CASCADE
    )
    created_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    tags = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.name


def upload_img_path(instance, filename):
    return 'user_{0}/deck_{1}/images/{2}'.format(instance.deck.author.id, instance.deck.id, uuid.uuid4())


def upload_sound_path(instance, filename):
    return 'user_{0}/deck_{1}/sounds/{2}'.format(instance.deck.author.id, instance.deck.id, uuid.uuid4())


class Card(models.Model):
    language_front = models.CharField(max_length=5, blank=True)
    language_back = models.CharField(max_length=5, blank=True)
    text_front = models.TextField(blank=True)
    text_back = models.TextField(blank=True)
    example_sentence_one = models.TextField(blank=True)
    example_sentence_two = models.TextField(blank=True)
    example_sentence_three = models.TextField(blank=True)
    image_front = models.TextField(blank=True)
    image_back = models.TextField(blank=True)
    main_image = models.FileField(blank=True, null=True, upload_to=upload_img_path)
    sound = models.FileField(blank=True, null=True, upload_to=upload_sound_path)
    created_date = models.DateTimeField(auto_now_add=True)
    repeat_date = models.DateField(default=date.today)
    sumAnswers = models.FloatField(default=0.0)
    allAnswers = models.FloatField(default=0.0)
    repetitions = models.IntegerField(default=0)
    interval = models.IntegerField(default=1)
    easiness = models.FloatField(default=2.5)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)


@receiver(post_delete, sender=Card)
def submission_delete(sender, instance, **kwargs):
    instance.main_image.delete(False)
    instance.sound.delete(False)


class Activity(models.Model):
    snake_score = models.IntegerField(default=0)
    drag_drop_score = models.IntegerField(default=0)
    again = models.IntegerField(default=0)
    very_hard = models.IntegerField(default=0)
    hard = models.IntegerField(default=0)
    medium = models.IntegerField(default=0)
    easy = models.IntegerField(default=0)
    deck = models.OneToOneField(
        Deck,
        on_delete=models.CASCADE,
        primary_key=True,
    )

