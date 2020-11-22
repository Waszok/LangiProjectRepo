///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////---------DICTIONARY WINDOW HANDLE-----------///////////////////////////////////////
const openDictButtons = document.querySelectorAll('[data-dict-open]');
const closeDictButtons = document.querySelectorAll('[data-dict-close]');

var dictionaryOpen = false;

//Open and close dictionary window
openDictButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dictWindow = document.querySelector(button.dataset.dictOpen);
        openDictWindow(dictWindow);

    })
})

function openDictWindow(dictWindow) {
    if (dictWindow == null) return
    dictWindow.classList.add('active');

    displayWordsList();

    dictionaryOpen = true;
}

closeDictButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dictWindow = button.closest('.dictionary-window')
        closeDictWindow(dictWindow);
    })
})

function closeDictWindow(dictWindow) {
    if (dictWindow == null) return
    dictWindow.classList.remove('active');

    dictionaryOpen = false;
}

function displayWordsList() {
    var url = `http://127.0.0.1:8000/api/card-list-all/${actualDeckId}/`;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var list = data;

            var dictContent = document.getElementById('dict-content');
            //Clear word's list before we add new items
            while (dictContent.firstChild) {
                dictContent.removeChild(dictContent.lastChild);
            }

            addFlashcardToDictList(dictContent, list);
        })
}

function addFlashcardToDictList(dictContent, list) {
    list.forEach(item => {
        var itemToAdd;
        if (item['image_front'] != "" && item['image_back'] != "") {
            itemToAdd = `<div class="dict-content-ele-container">
            <div class="dict-content-list-ele">
                <div class="content-front-ele">
                    <img class="learn-falshcard-im" src="${item['image_front']}"></img>
                </div>
                <div class="content-ele-separator"></div>
                <div class="content-back-ele">
                    <img class="learn-falshcard-im" src="${item['image_back']}"></img>
                </div>
            </div>
                <div class="dict-content-list-line"></div>
            </div>`
        }
        else {
            itemToAdd = `<div class="dict-content-ele-container">
            <div class="dict-content-list-ele">
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
            </div>
                <div class="dict-content-list-line"></div>
            </div>`
        }

        var messageHTML = parseStringToHTML(itemToAdd); //function from deck.js file
        dictContent.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
    })
}