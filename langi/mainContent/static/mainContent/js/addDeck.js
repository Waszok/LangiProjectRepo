const openAddDeckButtons = document.querySelectorAll('[data-adddeck-open]');
const closeAddDeckButtons = document.querySelectorAll('[data-adddeck-close]');
var requiredError = document.querySelector('.required-error');
var nameInput = document.getElementById('deckNameInputId');
var overlay = document.getElementById('overlay');


openAddDeckButtons.forEach(button => {
    button.addEventListener('click', () => {
        const addDeckWindow = document.querySelector(button.dataset.adddeckOpen);
        openAddDeckWindow(addDeckWindow);
    })

})

closeAddDeckButtons.forEach(button => {
    button.addEventListener('click', () => {
        const addDeckWindow = button.closest('.add-deck-window')
        closeAddDeckWindow(addDeckWindow);
    })
})

function openAddDeckWindow(addDeckWindow) {
    if (addDeckWindow == null) return

    addDeckWindow.classList.add('active');

    requiredError.classList.add('required-hide');
    overlay.classList.add('active');
}


function closeAddDeckWindow(addDeckWindow) {
    if (addDeckWindow == null) return

    addDeckWindow.classList.remove('active');
    overlay.classList.remove('active');
}


//The mechanism below is used to add dynamic to the input fields in sign up and login forms.
//When someone type or focus on the field, it's orange colored and label is moving upwards  

const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

//UPDATE DECK NAME
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

//mechanism allows us to create a new deck
var createDeckBtn = document.getElementById('createDeck');

createDeckBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var url = 'http://127.0.0.1:8000/api/deck-create/';
    var name = document.getElementById('deckNameInputId').value;
    var tags = document.getElementById('deckTagsInputId').value;

    if (!isEmptyOrSpaces(name)) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ 'name': name, 'tags': tags })
        };

        fetch(url, options)
            .then(response => response.json())
            .then(function (response) {

                createActivity(response.id)

                if (typeof buildDeckList === "function") {
                    buildDeckList();
                }

                document.getElementById('deckNameInputId').value = '';
                document.getElementById('deckTagsInputId').value = '';
                var currentWindow = document.getElementById('add-deck-window');

                closeAddDeckWindow(currentWindow);

                displayData('.bottom-deck-list', 'deck', false);
                displayData('.common-deck-list', 'commondeck', true);
            })
    }
    else {
        requiredError.classList.remove('required-hide');
    }
})

//Error handling
nameInput.addEventListener('input', function (e) {
    requiredError.classList.add('required-hide');
});

function createActivity(id) {
    var url = 'http://127.0.0.1:8000/api/activity-create/' + id + '/';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'snake_score': 0 })
    };

    fetch(url, options)
        .then(function (response) {
            console.log("okej");
        })

}