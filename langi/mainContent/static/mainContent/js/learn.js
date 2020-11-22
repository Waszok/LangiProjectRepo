var flashcardText = document.querySelector('.learn-flashcard-text');

var backButtons = document.querySelector('.buttons-back');
var frontButtons = document.querySelector('.buttons-front');

var extraContentShowed = true;
var sentencesShowed = true;

var learnFrontText = document.getElementById('learn-flashcard-front-text');
var learnBackText = document.getElementById('learn-flashcard-back-text');

var learnFrontTextContent = document.getElementById('learn-flashcard-contentText-front');
var learnBackTextContent = document.getElementById('learn-flashcard-contentText-back');

var front = true;


$(document).ready(function () {
    if (flashcardText != null && backButtons != null && learnBackText != null) {
        flashcardText.setAttribute("style", "max-height:150px");
        backButtons.setAttribute("style", "display:none");
        learnBackText.setAttribute("style", "display:none");
        learnBackTextContent.setAttribute("style", "display:none");
    }
    //Show/hide flashcard image and audio mechanism
    $('.show-img-audio').on('click', function (event) {
        var imgAndAudio = document.querySelector('.img-and-audio');

        if (extraContentShowed) {
            imgAndAudio.classList.add('flashcard-hide');

            var flashcardText = document.querySelector('.learn-flashcard-text');
            flashcardText.setAttribute("style", "max-height:250px");

            if (front === false) {
                learnFrontTextContent.setAttribute("style", "display:none");
            }

            extraContentShowed = false;
        }
        else {
            imgAndAudio.classList.remove('flashcard-hide');
            var flashcardText = document.querySelector('.learn-flashcard-text');
            flashcardText.setAttribute("style", "max-height:150px");

            if (front === false) {
                learnFrontTextContent.setAttribute("style", "display:none");
            }

            extraContentShowed = true;
        }
    });


    //Show/hide example sentences
    $('.show-sentences').on('click', function (event) {
        var sentencesContainer = document.querySelector('.learn-flashcard-sentences');

        if (sentencesShowed) {
            sentencesContainer.classList.add('sentences-hide');
            sentencesShowed = false;
        }
        else {
            sentencesContainer.classList.remove('sentences-hide');
            sentencesShowed = true;
        }
    });

    //Show back side of flashcard
    $('#show-answer').on('click', function (event) {
        if (front) {
            toBack();
        }
        else {
            toFront();
        }
    });


    $('body').keyup(function (e) {
        if (e.keyCode == 32) {
            if (front) {
                toBack();
            }
            else {
                toFront();
            }
        }
        else if (e.keyCode == 39) {
            nextFlashcard();
        }
        else if (e.keyCode == 49) {
            if (front === false)
                nextFlashcardProcess(1);
        }
        else if (e.keyCode == 50) {
            if (front === false)
                nextFlashcardProcess(2);
        }
        else if (e.keyCode == 51) {
            if (front === false)
                nextFlashcardProcess(3);
        }
        else if (e.keyCode == 52) {
            if (front === false)
                nextFlashcardProcess(4);
        }
        else if (e.keyCode == 53) {
            if (front === false)
                nextFlashcardProcess(5);
        }
    });

});

function toBack() {
    learnFrontText.setAttribute("style", "display:none");
    learnBackText.setAttribute("style", "display:block");

    frontButtons.setAttribute("style", "display:none");
    backButtons.setAttribute("style", "display:flex");

    learnFrontTextContent.setAttribute("style", "display:none");
    learnBackTextContent.setAttribute("style", "display:block");

    front = false;
}

function toFront() {
    learnBackText.setAttribute("style", "display:none");
    learnFrontText.setAttribute("style", "display:block");

    frontButtons.setAttribute("style", "display:flex");
    backButtons.setAttribute("style", "display:none");

    learnBackTextContent.setAttribute("style", "display:none");
    learnFrontTextContent.setAttribute("style", "display:block");

    front = true;
}


var actualLearnDeckId = -1
var allLearnFlashcards = [];
var currentDisplayedCard = 0;

//Activity
var again = 0
var veryHard = 0
var hard = 0
var medium = 0
var easy = 0

//LEARN OBJECTS (TEXT FRONT/BACK, EXAMPLE SENTENCES, EXAMPLE IMAGE, AUDIO)
var learnFrontTextContent = document.getElementById('learn-flashcard-contentText-front');
var learnBackTextContent = document.getElementById('learn-flashcard-contentText-back');

var learnSentencesContainer = document.getElementById('learn-flashcard-sentences');

var learnExampleImage = document.getElementById('learn-example-img');
var learnAudioObject = document.getElementById('flashcard-audio');
var learnPlayerObject = document.getElementById('flashcard-player');

//FIRST LOAD FLASHCARD
async function loadFlashcardsToLearn() {
    deckList = await getDecks();
    actualLearnDeckId = await getAllUserDecks(deckList);
    allLearnFlashcards = await getAllFlashcardsConnectedWithDeck(actualLearnDeckId, 10);

    displayFlashcard(allLearnFlashcards[0]);
}

loadFlashcardsToLearn();


/////////////////////-------------------------DISPLAY FALSCARD IN LEARN FRONT-------------------------/////////////////
function displayFlashcard(card) {
    while (learnSentencesContainer.firstChild) {
        learnSentencesContainer.removeChild(learnSentencesContainer.lastChild);
    }

    if (card != undefined && card != null) {
        //FROT AND BACK
        if (card['image_front'] != "") {
            var img = `<img class="learn-falshcard-im" src="${card['image_front']}"></img>`
            learnFrontTextContent.innerHTML = img;
        }
        else {
            learnFrontTextContent.innerHTML = card['text_front']
        }

        if (card['image_back'] != "") {
            var img = `<img class="learn-falshcard-im" src="${card['image_back']}"></img>`
            learnBackTextContent.innerHTML = img;
        }
        else {
            learnBackTextContent.innerHTML = card['text_back']
        }

        //EXAMPLE SENTENCES
        if (card['example_sentence_one'] != "") {
            var exSentence = `<div class="learn-flashcard-sentence">${card['example_sentence_one']}</div><hr>`
            learnSentencesContainer.innerHTML += exSentence
        }
        if (card['example_sentence_two'] != "") {
            var exSentence = `<div class="learn-flashcard-sentence">${card['example_sentence_two']}</div><hr>`
            learnSentencesContainer.innerHTML += exSentence
        }
        if (card['example_sentence_three'] != "") {
            var exSentence = `<div class="learn-flashcard-sentence">${card['example_sentence_three']}</div>`
            learnSentencesContainer.innerHTML += exSentence
        }

        //EXAMPLE IMAGE
        if (card['main_image'] != null && card['main_image'] != "") {
            learnExampleImage.src = card['main_image'];
        }
        else {
            learnExampleImage.src = "../static/mainContent/images/emptyImage.png"
        }

        //VOICE SOUND
        if (card['sound'] != null && card['sound'] != "") {
            learnAudioObject.removeAttribute('src');
            learnAudioObject.src = card['sound'];
            learnPlayerObject.classList.remove('unactive-player');
        }
        else {
            learnPlayerObject.classList.add('unactive-player');
            learnAudioObject.removeAttribute('src');
        }
    }
    else {
        learnFrontTextContent.innerHTML = translateJsText('no card');
        learnBackTextContent.innerHTML = translateJsText('no card');

        learnExampleImage.src = "../static/mainContent/images/emptyImage.png"

        learnPlayerObject.classList.add('unactive-player');
    }
}

//NEXT FLASHCARD PROCESS
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function nextFlashcardProcess(answer) {
    if (allLearnFlashcards.length > 0) {
        loadActivityData(answer)
    }
}

//Load activity
function loadActivityData(answer) {
    if (actualLearnDeckId != -1) {
        var url = `http://127.0.0.1:8000/api/activity-list-learn/${actualLearnDeckId}/`;

        fetch(url)
            .then(response => response.json())
            .then(function (data) {
                again = data['again'];
                veryHard = data['very_hard'];
                hard = data['hard'];
                medium = data['medium'];
                easy = data['easy'];


                calculateSuperMemo2Algorithm(allLearnFlashcards[currentDisplayedCard], answer)
                nextFlashcard();
            })
    }
}

//NEXT FLASHCARD SKIP
async function nextFlashcard() {
    var actCommonDeckId = localStorage.getItem("selectedCommonDeckId");
    if (actCommonDeckId != actualLearnDeckId) {
        loadFlashcardsToLearn();
        toFront()
    }
    else {
        if (allLearnFlashcards.length > 1) {
            currentDisplayedCard++;

            if (currentDisplayedCard >= allLearnFlashcards.length) {
                currentDisplayedCard = 0;
            }

            if (currentDisplayedCard === parseInt(allLearnFlashcards.length / 2)) {
                newFlashcardsTmp = await getAllFlashcardsConnectedWithDeck(actualLearnDeckId, 5);
                allLearnFlashcards.splice(0, currentDisplayedCard)
                allLearnFlashcards.push.apply(allLearnFlashcards, newFlashcardsTmp)
            }

            toFront()
            displayFlashcard(allLearnFlashcards[currentDisplayedCard]);
        }
        else if (allLearnFlashcards.length === 1) {
            allLearnFlashcards.splice(0, 1)
            toFront()
            displayFlashcard(allLearnFlashcards[currentDisplayedCard]);
        }
    }
}

function calculateSuperMemo2Algorithm(card, quality) {
    if (quality >= 1 && quality < 6 && card != undefined && card != null) {
        // retrieve the stored values (default values if new cards)
        var id = card.id;
        var repetitions = card.repetitions;
        var easiness = card.easiness;
        var interval = card.interval;

        var newAllAnswers = card.allAnswers + 1;
        var ans = 0;
        if (quality === 1) {
            ans = 0
            again += 1
        }
        else if (quality === 2) {
            ans = 0.25
            veryHard += 1
        }
        else if (quality === 3) {
            ans = 0.5
            hard += 1
        }
        else if (quality === 4) {
            ans = 0.75
            medium += 1
        }
        else if (quality === 5) {
            ans = 1
            easy += 1
        }
        var newSumAnswers = card.sumAnswers + ans;

        // easiness factor
        easiness = Math.max(1.3, easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02));

        // repetitions
        if (quality < 3) {
            repetitions = 0;
        } else {
            repetitions += 1;
        }

        // interval
        if (repetitions == 0) {
            interval = 0;
        } else if (repetitions == 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = Math.round(interval * easiness);
        }

        var today = new Date();
        today = today.addDays(interval)
        var newRepeateDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        //UPDATE CARD
        var url = `http://127.0.0.1:8000/api/card-update-learn/${id}/`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'repeat_date': newRepeateDate, 'sumAnswers': newSumAnswers,
                'allAnswers': newAllAnswers, 'repetitions': repetitions, 'interval': interval, 'easiness': easiness
            })
        };

        fetch(url, options)
            .then(function (response) {
                console.log("okej");
            })

        //UPDATE ACTIVITY
        var urlActivity = `http://127.0.0.1:8000/api/activity-update-learn/${actualLearnDeckId}/`;

        const optionsActivity = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'again': again, 'very_hard': veryHard,
                'hard': hard, 'medium': medium, 'easy': easy
            })
        };

        fetch(urlActivity, optionsActivity)
            .then(function (response) {
                console.log("okej");
            })
    }
}