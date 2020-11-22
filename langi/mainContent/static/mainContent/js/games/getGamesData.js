var drawnWords = []
var actualGamesDeckId = -1

var activitySnakeScore = 0;
var activityDdScore = 0;

//Snake
export var rightSnakeAnswer = -1;
//Drag & Drop
export var numberOfDrownCards = -1;

export function getSnakeData(loadDecks) {
    if (loadDecks === true)
        loadFlashcardsAndDecksForSnake();
    else
        loadFlashcardsForSnake();
}

async function loadFlashcardsAndDecksForSnake() {
    var deckList = await getDecks();
    actualGamesDeckId = await getAllUserDecks(deckList);
    drawnWords = await getFlashcardsConnectedWithDeckGames(actualGamesDeckId, 3);

    getAcitivityGamesData();
    fillWordsSnake()
}

async function loadFlashcardsForSnake() {
    getAcitivityGamesData();
    drawnWords = await getFlashcardsConnectedWithDeckGames(actualGamesDeckId, 3);
    fillWordsSnake()
}

function getAcitivityGamesData() {
    if (actualGamesDeckId != -1) {
        var url = `http://127.0.0.1:8000/api/activity-list-game/${actualGamesDeckId}/`;

        fetch(url)
            .then(response => response.json())
            .then(function (data) {

                activitySnakeScore = data['snake_score'];
                activityDdScore = data['drag_drop_score'];
            })
    }
}

export function updateActivitySanke() {
    if (actualGamesDeckId != -1) {
        activitySnakeScore += 1;
        var url = `http://127.0.0.1:8000/api/activity-update-snake/${actualGamesDeckId}/`;

        const optionsSnake = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'snake_score': activitySnakeScore
            })
        };

        fetch(url, optionsSnake)
            .then(function (response) {
                loadFlashcardsForSnake();
            })
    }
}


function fillWordsSnake() {
    var translations = Array.from(document.querySelectorAll('.translation-word'));
    var toMatch = document.getElementById('snake-match-word');

    if (drawnWords.length > 1) {
        rightSnakeAnswer = drawnWords[drawnWords.length - 1]['answer'];

        if (drawnWords[rightSnakeAnswer]['image_front'] != "") {
            toMatch.src = drawnWords[rightSnakeAnswer]['image_front'];
        }
        else {
            var item = drawnWords[rightSnakeAnswer]['text_front'].replace(/<(.|\n)*?>/g, '');
            toMatch.src = '';
            toMatch.alt = item;
        }

        for (var i = 0; i < drawnWords.length - 1; i++) {
            if (drawnWords[i]['image_back'] != "") {
                translations[i].src = drawnWords[i]['image_back'];
            }
            else {
                var item = drawnWords[i]['text_back'].replace(/<(.|\n)*?>/g, '');
                translations[i].src = '';
                translations[i].alt = item;
            }
        }
    }
    else {
        toMatch.alt = translateJsText("Selected deck does not contain any cards ...");
        translations.forEach(translation => {
            translation.alt = translateJsText("no card");
        })
        rightSnakeAnswer = -1
    }
}

//DRAG AND DROP
export function getDDData(loadDecks) {
    if (loadDecks === true)
        loadFlashcardsAndDecksForDD()
    else
        loadFlashcardsForDD();

}

async function loadFlashcardsAndDecksForDD() {
    var deckList = await getDecks();
    actualGamesDeckId = await getAllUserDecks(deckList);
    drawnWords = await getFlashcardsConnectedWithDeckGames(actualGamesDeckId, 5);

    getAcitivityGamesData();
    fillDDBoxes();
}

async function loadFlashcardsForDD() {
    getAcitivityGamesData();
    drawnWords = await getFlashcardsConnectedWithDeckGames(actualGamesDeckId, 3);
    fillWordsSnake()
}

function fillDDBoxes() {
    numberOfDrownCards = drawnWords.length - 1;
    var shuffledArray = shuffle([...Array(drawnWords.length - 1).keys()])
    var droppableElements = document.querySelectorAll('.droppable');
    var draggableElements = document.querySelectorAll('.draggable');
    for (var i = 0; i < shuffledArray.length; i++) {
        droppableElements[i].setAttribute('data-draggable-id', "draggable-" + shuffledArray[i].toString());
    }

    for (var i = 0; i < drawnWords.length - 1; i++) {
        //FRONT
        if (drawnWords[i]['image_front'] != "") {
            draggableElements[i + 1].getElementsByTagName('img')[0].src = drawnWords[i]['image_front'];
        }
        else {
            var item = drawnWords[i]['text_front'].replace(/<(.|\n)*?>/g, '');
            draggableElements[i + 1].getElementsByTagName('img')[0].src = '';
            draggableElements[i + 1].getElementsByTagName('img')[0].alt = item;
        }

        //BACK
        if (drawnWords[shuffledArray[i]]['image_back'] != "") {
            droppableElements[i].getElementsByTagName('img')[0].src = drawnWords[shuffledArray[i]]['image_back'];
        }
        else {
            var item = drawnWords[shuffledArray[i]]['text_back'].replace(/<(.|\n)*?>/g, '');
            droppableElements[i].getElementsByTagName('img')[0].src = '';
            droppableElements[i].getElementsByTagName('img')[0].alt = item;
        }
    }

    //if no futher cards
    for (var j = shuffledArray.length; j < droppableElements.length; j++) {
        //gray out the draggable element
        draggableElements[j + 1].classList.add('dragged')
        draggableElements[j + 1].setAttribute("draggable", "false")

        droppableElements[j].classList.add('dragged');
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


export function updateActivityDD() {
    if (actualGamesDeckId != -1) {
        activityDdScore += 1;
        var url = `http://127.0.0.1:8000/api/activity-update-dd/${actualGamesDeckId}/`;

        const optionsDD = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'drag_drop_score': activityDdScore
            })
        };

        fetch(url, optionsDD)
            .then(function (response) {
                console.log("okej");
            })
    }
}