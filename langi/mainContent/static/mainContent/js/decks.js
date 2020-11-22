$(document).ready(function () {
    //active typing animation
    $('.search-bar').on('keydown', function (event) {
        $('body').addClass('is-type');
        //click backspace and input field in search bar is empty
        if ((event.which === 8) && $(this).val() === '') {
            $('body').removeClass('is-type');
        }
    });

    //clear search button when icon-close button is clicked
    $('.icon-close').click(function (event) {
        if ($(this).css('opacity') != 0) {
            $('.search-bar').val('');
        }
    });

    var searchInput = document.getElementById('searchDeckInput');
    searchInput.placeholder = translateJsText("Search by name or tag ...");
});

//Actine/inactive deck list btns
const pathIconDeckListBtns = "../static/mainContent/images/icons/";

function IconHoverDeck(obj, which) {
    if (which == 1)
        obj.src = pathIconDeckListBtns.concat("plusOrangeTransparent.png");
    else if (which == 2)
        obj.src = pathIconDeckListBtns.concat("learnOrangeTransparent.png");
    else if (which == 3)
        obj.src = pathIconDeckListBtns.concat("settingsOrangeTransparent.png");
}

function IconUnhoverDeck(obj, which) {
    if (which == 1)
        obj.src = pathIconDeckListBtns.concat("plusTransparent.png");
    else if (which == 2)
        obj.src = pathIconDeckListBtns.concat("learnTransparent.png");
    else if (which == 3)
        obj.src = pathIconDeckListBtns.concat("settingsTransparent.png");
}


//----------------------------------------------------------------------------------------------------
//Parse string to HTML document
var parseStringToHTML = (str) => {
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
};

function openDeckSettingsWindow(deckSettingsWindow) {
    if (deckSettingsWindow == null) return
    deckSettingsWindow.classList.add('active');

    tabs.forEach(function (el) {
        el.classList.remove('deck-set-active');
    });
    tabs[0].classList.add('deck-set-active');

    let content = Array.from(document.querySelectorAll('.deck-set-contents .deck-set-content'));

    content.forEach(function (el) {
        el.style.display = "none";
    });
    content[0].style.display = "block";

    //Clear text word's list when openinn a window
    var listContainerText = document.getElementById('dect-set-im-list-elements-container');
    while (listContainerText.firstChild) {
        listContainerText.removeChild(listContainerText.lastChild);
    }
    //Clear image word's list when openinn a window
    var listContainerImg = document.getElementById('dect-set-image-list-elements-container');
    while (listContainerImg.firstChild) {
        listContainerImg.removeChild(listContainerImg.lastChild);
    }

    separatorInput.value = '';

    overlay.classList.add('active');
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------BUILD DECK LIST--------//////////////////////////////////////////////////
var activeItem = null;


buildDeckList();

function addItemToDeckList(wrapper, list) {
    var url = $('#learnUrl').attr('data-learn-url');
    for (var i in list) {
        var item = `<div class="deck-item-container" id="deckItem-${list[i].id}">
                <div class="deck-tem">
                    <div class="first-item-block">
                        <div class="deck-item__first-part">
                            <img src="../static/mainContent/images/icons/decksTransparent.png" alt="">
                            <span class="deck-name">${list[i].name}</span>
                        </div>
                        <div class="tagi">
                            <span>${list[i].tags}</span>
                        </div>
                    </div>
                    <div class="deck-item__second-part">
                        <span class="due-flashcards">0</span>
                        <span class="new-flashcards">0</span>
                        <img class="add-flashcard plusOrangeTransparent"
                            src="../static/mainContent/images/icons/plusTransparent.png" alt="add icon"
                            onmouseover="IconHoverDeck(this, 1);" onmouseout="IconUnhoverDeck(this, 1);"
                            data-addcard-open="#add-card-window" id="add-flashcard-${list[i].id}"></img>
                        <a href=${url}>
                            <img class="learn-deck learnOrangeTransparent"
                                src="../static/mainContent/images/icons/learnTransparent.png" alt="learn icon"
                                onmouseover="IconHoverDeck(this, 2);" onmouseout="IconUnhoverDeck(this, 2);">
                        </a>
                        <img class="settings-deck settingsOrangeTransparent"
                            src="../static/mainContent/images/icons/settingsTransparent.png" alt="settings icon"
                            onmouseover="IconHoverDeck(this, 3);" onmouseout="IconUnhoverDeck(this, 3);" role="button"
                            data-decksettings-open="#deck-settings-window">
                    </div>
                </div>
                <hr class="deck-item-line">
            </div>`

        var messageHTML = parseStringToHTML(item);
        var button = messageHTML.querySelector('[data-decksettings-open]');

        button.addEventListener('click', (function (currentItem) {
            return function () {
                const deckSettingsWindow = document.querySelector(button.dataset.decksettingsOpen);
                openDeckSettingsWindow(deckSettingsWindow);

                //text file handle
                var dropZoneElement = document.querySelector(".drop-file-zone");
                if (dropZoneElement.querySelector(".drop-file-zone__thumb")) {
                    dropZoneElement.querySelector(".drop-file-zone__thumb").remove();
                    var prompt = document.createElement("div");
                    prompt.classList.add("drop-file-zone__prompt");
                    prompt.innerHTML = promptText;
                    dropZoneElement.appendChild(prompt);
                }
                fileInput.value = '';

                //image file handle
                var dropZoneImgElement = document.querySelector('.drop-file-img-zone');
                if (dropZoneImgElement.querySelector('.drop-file-img-zone__thumb')) {
                    dropZoneImgElement.querySelector('.drop-file-img-zone__thumb').remove();
                    var promptImg = document.createElement('div');
                    promptImg.classList.add('drop-file-img-zone__prompt');
                    promptImg.innerHTML = promptImgText;
                    dropZoneImgElement.appendChild(promptImg);
                }

                fileImgInput.value = '';

                chooseCeratinDeckSettings(currentItem)
            }
        })(list[i]))

        var buttonAddCard = messageHTML.querySelector('[data-addcard-open]');

        buttonAddCard.addEventListener('click', (function (currentItem) {
            return function () {
                const addCardWindow = document.querySelector(buttonAddCard.dataset.addcardOpen);
                openAddCardWindow(addCardWindow);
                chooseCeratinDeckAddCard(currentItem) //return current deck
            }
        })(list[i]))

        var deckItem = messageHTML.querySelector('.deck-item__first-part');
        deckItem.addEventListener('dblclick', (function (currentItem) {
            return function () {
                chooseCeratinDeck(currentItem) //return current deck
            }
        })(list[i]))

        wrapper.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
    }
}

function buildDeckList() {
    var wrapper = document.getElementById('decks-content');

    //Clear deck's list before we add new items
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild);
    }

    var url = 'http://127.0.0.1:8000/api/deck-list/';

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var list = data;
            addItemToDeckList(wrapper, list);
            getFlashcardsCommonNumbers('selectedCommonDeckId');
        })
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------CHOOSE CERTAIN ITEM (DECK)--------///////////////////////////////////////
allDeckItems = []
searchWords = false;

function addFlashcardToList(deckContent, list) {
    list.forEach(item => {
        var itemToAdd;
        if (item['image_front'] != "" && item['image_back'] != "") {
            itemToAdd = `<div class="dect-content-ele-container">
            <div class="dect-content-list-ele">
                <div class="content-front-ele">
                    <img class="learn-falshcard-im" src="${item['image_front']}"></img>
                </div>
                <div class="content-ele-separator"></div>
                <div class="content-back-ele">
                    <img class="learn-falshcard-im" src="${item['image_back']}"></img>
                </div>
                <img class="deck-content-remove-ele" src="../static/mainContent/images/basketIcon.png"
                    alt="remove item" onmouseover="IconHoverRemoveBtn(this);"
                    onmouseout="IconUnhoverRemoveBtn(this);"></img>
            </div>
                <div class="dect-content-list-line"></div>
            </div>`
        }
        else {
            itemToAdd = `<div class="dect-content-ele-container">
            <div class="dect-content-list-ele">
                <div class="content-front-ele">
                    <div class="content-front-box">
                        ${item['text_front']}
                    </div>
                </div>
                <div class="content-ele-separator"></div>
                <div class="content-back-ele">
                    <div class="content-back-box">
                        ${item['text_back']}
                    </div>
                </div>
                <img class="deck-content-remove-ele" src="../static/mainContent/images/basketIcon.png"
                    alt="remove item" onmouseover="IconHoverRemoveBtn(this);"
                    onmouseout="IconUnhoverRemoveBtn(this);"></img>
            </div>
                <div class="dect-content-list-line"></div>
            </div>`
        }

        var messageHTML = parseStringToHTML(itemToAdd); //function from deck.js file
        var tolistener = messageHTML.querySelector('.deck-content-remove-ele');

        tolistener.addEventListener("click", (function (currentItem) {
            return function () {
                $(this).closest('.dect-content-ele-container').remove();
                cardDelete(currentItem);
            }
        })(item))

        deckContent.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
    })
}

function chooseCeratinDeck(element) {

    var url = `http://127.0.0.1:8000/api/card-list-all/${element.id}/`;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var list = data;
            allDeckItems = list

            //Show deck content list and a proper button
            var decksContent = document.getElementById('decks-content');
            var deckContent = document.getElementById('deck-content');

            decksContent.setAttribute("style", "display:none");
            deckContent.setAttribute("style", "display:block");

            var createBtn = document.getElementById('create-deck-btn-id');
            var backBtn = document.getElementById('back-deck-btn-id');

            createBtn.setAttribute("style", "display:none");
            backBtn.setAttribute("style", "display:flex");

            var searchInput = document.getElementById('searchDeckInput');
            searchInput.placeholder = translateJsText("Search words ...");

            searchWords = true;

            //Clear word's list before we add new items
            while (deckContent.firstChild) {
                deckContent.removeChild(deckContent.lastChild);
            }

            addFlashcardToList(deckContent, list);
        })
}

//BACK TO DECKS VIEW
function backToDecksView() {
    //Show all decks list and a proper button
    var decksContent = document.getElementById('decks-content');
    var deckContent = document.getElementById('deck-content');

    decksContent.setAttribute("style", "display:block");
    deckContent.setAttribute("style", "display:none");

    var createBtn = document.getElementById('create-deck-btn-id');
    var backBtn = document.getElementById('back-deck-btn-id');

    createBtn.setAttribute("style", "display:flex");
    backBtn.setAttribute("style", "display:none");

    var searchInput = document.getElementById('searchDeckInput');
    searchInput.placeholder = translateJsText("Search by name or tag ...");

    searchWords = false;
}

//DELETE CARD
function cardDelete(item) {
    var url = `http://127.0.0.1:8000/api/card-delete/${item['id']}/`;

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
    };

    fetch(url, options)
        .then(function (response) {
            getFlashcardsNumbers("selectedDeckId");
            getFlashcardsCommonNumbers('selectedCommonDeckId');
        })
}

function chooseCeratinDeckAddCard(element) {
    var commonChoosenDeck = document.querySelector('.common-selected-deck');
    commonChoosenDeck.value = element.name.substring(0, 16);

    var deckList = document.querySelector('#commondeck-' + element.id);
    $(deckList).addClass('active-deck').siblings().removeClass('active-deck')
}

function chooseCeratinDeckSettings(element) {
    var commonChoosenDeck = document.querySelector('.common-selected-deck');
    commonChoosenDeck.value = element.name.substring(0, 16);

    var deckList = document.querySelector('#commondeck-' + element.id);
    $(deckList).addClass('active-deck').siblings().removeClass('active-deck')

    var deckName = document.querySelector('.deck-settings-deck-name');
    deckName.textContent = element.name;

    var inputChangeDeckName = document.querySelector('.deck-settings-change-name');
    var inputChangeDeckTags = document.querySelector('.deck-settings-change-tags');

    inputChangeDeckName.value = element.name
    inputChangeDeckTags.value = element.tags;

    activeItem = element;
}


var requiredNameError = document.querySelector('.required-name-error');
var requiredNameInput = document.querySelector('.deck-settings-change-name');
var changeDeckBtn = document.getElementById('deck-set-change-name');
changeDeckBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var url = `http://127.0.0.1:8000/api/deck-update/${activeItem.id}/`;
    var name = document.querySelector('.deck-settings-change-name').value;

    if (!isEmptyOrSpaces(name)) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ 'name': name })
        };

        fetch(url, options)
            .then(function (response) {
                if (typeof buildDeckList === "function") {
                    buildDeckList();
                }

                displayData('.bottom-deck-list', 'deck', false);
                displayData('.common-deck-list', 'commondeck', true);

                var deckName = document.querySelector('.deck-settings-deck-name');
                deckName.textContent = name;
            })

        activeItem.name = name;
    }
    else {
        requiredNameError.classList.remove('required-name-hide');
    }
})

//Error handling
requiredNameInput.addEventListener('input', function (e) {
    requiredNameError.classList.add('required-name-hide');
});

//UPDATE DECK TAGS
var changeDeckTagsBtn = document.getElementById('deck-set-change-tags');
changeDeckTagsBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var url = `http://127.0.0.1:8000/api/deck-update/${activeItem.id}/`;
    var tags = document.querySelector('.deck-settings-change-tags').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'name': activeItem.name, 'tags': tags })
    };

    fetch(url, options)
        .then(function (response) {
            if (typeof buildDeckList === "function") {
                buildDeckList();
            }

            displayData('.bottom-deck-list', 'deck', false);
            displayData('.common-deck-list', 'commondeck', true);
        })

    activeItem.tags = tags
})

//DELETE DECK
var deleteDeckBtn = document.getElementById('deck-set-delete-deck');
deleteDeckBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var url = `http://127.0.0.1:8000/api/deck-delete/${activeItem.id}/`;

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
    };

    fetch(url, options)
        .then(function (response) {
            if (typeof buildDeckList === "function") {
                buildDeckList();
            }
            displayData('.bottom-deck-list', 'deck', false);
            displayData('.common-deck-list', 'commondeck', true);
        })


    var deckSettingsCurrentWindow = document.querySelector('.deck-settings-window');
    deckSettingsCurrentWindow.classList.remove('active');

    activeItem = null;
    requiredNameError.classList.add('required-name-hide');
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------SEARCH DECK MECHANISM--------//////////////////////////////////////////////////
var searchInput = document.getElementById('searchDeckInput');

searchInput.addEventListener('input', function (e) {
    var inputValue = searchInput.value;

    if (searchWords === false) {
        var wrapper = document.getElementById('decks-content');

        var toDisplay = []

        for (var i in deckList) {
            if ((inputValue && deckList[i].name.toUpperCase().includes(inputValue.toUpperCase()))
                || (inputValue && deckList[i].tags.toUpperCase().includes(inputValue.toUpperCase()))) {
                toDisplay.push(deckList[i]);
            }
            else if (!inputValue) {
                toDisplay = deckList;
            }
        }

        //Clear deck's list before we add new items
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.lastChild);
        }

        addItemToDeckList(wrapper, toDisplay);
    }
    else {
        var wrapper = document.getElementById('deck-content');
        var toDisplay = []

        for (var i in allDeckItems) {
            var frontItem = allDeckItems[i]['text_front'].replace(/<(.|\n)*?>/g, '');
            var backItem = allDeckItems[i]['text_back'].replace(/<(.|\n)*?>/g, '');

            if ((inputValue && frontItem.toUpperCase().includes(inputValue.toUpperCase()))
                || (inputValue && backItem.toUpperCase().includes(inputValue.toUpperCase()))) {
                toDisplay.push(allDeckItems[i]);
            }
            else if (!inputValue) {
                toDisplay = allDeckItems;
            }
        }

        //Clear deck's list before we add new items
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.lastChild);
        }

        addFlashcardToList(wrapper, toDisplay)
    }
});
