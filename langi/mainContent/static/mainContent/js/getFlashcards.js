var allUserDecks = []
var actualDeckId = -1
var allDeckFlashcards = null;

// Load all decks for a proper user and set a proper ID
async function getAllUserDecks(decks = null) {
    if (decks != null)
        allUserDecks = decks;
    actualDeckId = getChoosenDeckId("selectedCommonDeckId");
    return actualDeckId;
}

// Get ID of choosen common deck
function getChoosenDeckId(deckID) {
    //var actualDeckId = -1;
    if (allUserDecks.length > 0) {
        var selectedDeckID = localStorage.getItem(deckID);
        var commonIndexPresent = false;
        for (var i in allUserDecks) {
            if (selectedDeckID == allUserDecks[i].id) {
                actualDeckId = selectedDeckID;
                commonIndexPresent = true;
                break;
            }
        }

        if (commonIndexPresent == false) {
            actualDeckId = allUserDecks[0].id;
        }

        return actualDeckId
    }
    return actualDeckId;
}


//Get some number of flashcards from API
async function getAllFlashcardsConnectedWithDeck(actualDeckId, startNumber) {
    if (actualDeckId != -1) {

        var url = `http://127.0.0.1:8000/api/card-list-part/${actualDeckId}/${startNumber}`;

        const response = await fetch(url).catch(
            error => console.log(error)
        );

        return response.json();
    }
    return null
}

//Get flashcards from API for Snake and Drag&Drop games
async function getFlashcardsConnectedWithDeckGames(actualDeckId, numberToDrawn) {
    if (actualDeckId != -1) {

        var url = `http://127.0.0.1:8000/api/card-for-games/${actualDeckId}/${numberToDrawn}`;

        const response = await fetch(url).catch(
            error => console.log(error)
        );

        return response.json();
    }
    return null
}

//---------------------------NUMBERS OF FLASHCARDS IN DECKS------------------------------------------/////////// 
//Get flashcards numbers for bottom selected deck
function getFlashcardsNumbers(deckID) {
    var actualDeckId = getChoosenDeckId(deckID);

    if (actualDeckId != -1) {
        var url = `http://127.0.0.1:8000/api/card-number/${actualDeckId}`;

        var allCardsNumber = document.getElementById('all-cards-number');
        var todayCardsNumber = document.getElementById('today-cards-number');

        fetch(url)
            .then(response => response.json())
            .then(function (data) {
                allCardsNumber.textContent = data['all_cards'];
                todayCardsNumber.textContent = data['today_cards'];
            }).catch(
                error => console.log(error)
            );
    }
}

//Get flashcards numbers for list of decks
function getFlashcardsCommonNumbers(deckID) {
    var actualDeckId = getChoosenDeckId(deckID);

    if (actualDeckId != -1) {
        var deckListItems = document.querySelectorAll('.deck-item-container');
        deckListItems.forEach(deckListItem => {
            var id = parseInt(deckListItem.id.substring(9));
            var url = `http://127.0.0.1:8000/api/card-number/${id}`;

            var allCardsNumber = deckListItem.getElementsByClassName('due-flashcards')[0];
            var todayCardsNumber = deckListItem.getElementsByClassName('new-flashcards')[0];

            if (allCardsNumber != null && todayCardsNumber != null) {

                fetch(url)
                    .then(response => response.json())
                    .then(function (data) {
                        allCardsNumber.textContent = data['all_cards'];
                        todayCardsNumber.textContent = data['today_cards'];
                    }).catch(
                        error => console.log(error)
                    );
            }
        });
    }
}


