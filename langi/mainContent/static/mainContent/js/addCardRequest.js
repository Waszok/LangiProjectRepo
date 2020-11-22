//mechanism allows us to create a new card
var createCardBtn = document.getElementById('createCard');

createCardBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var activeDeck = $('.common-deck-list li.active-deck');
    if (activeDeck.length > 0) {
        var activeDeckId = activeDeck[0].id.replace(/^\D+/g, '');

        var url = 'http://127.0.0.1:8000/api/card-create/' + activeDeckId + '/';

        //Collect all data from Add Card Window ///
        //////////////////////////////////////////
        //selected languages
        const selectedLangFrontCode = dictionaryLangCodes[textLangFront];
        const selectedLangBackCode = dictionaryLangCodes[textLangBack];

        //flashcard text (front & back)
        var textFlashcardFront = ''
        var textFlashcardBack = ''

        if (selectedLangFrontCode === 'ko') {
            textFlashcardFront = textFieldFront.value;
        }
        else {
            textFlashcardFront = textFieldFront.innerHTML;
        }

        if (selectedLangBackCode === 'ko') {
            textFlashcardBack = textFieldBack.value;
        }
        else {
            textFlashcardBack = textFieldBack.innerHTML;
        }

        //flashcard example sentences
        var textFlashcardFieldOne = textFieldOne.value;
        var textFlashcardFieldTwo = textFieldTwo.value;
        var textFlashcardFieldThree = textFieldThree.value;

        var fd = new FormData()
        fd.append("language_front", selectedLangFrontCode);
        fd.append("language_back", selectedLangBackCode);
        fd.append("text_front", textFlashcardFront);
        fd.append("text_back", textFlashcardBack);
        fd.append("example_sentence_one", textFlashcardFieldOne);
        fd.append("example_sentence_two", textFlashcardFieldTwo);
        fd.append("example_sentence_three", textFlashcardFieldThree);

        if (flashcardImage === null) {
            fd.append("main_image", '');
        }
        else fd.append("main_image", flashcardImage);

        if (flashcardAudio === null) {
            fd.append("sound", '');
        }
        else fd.append("sound", flashcardAudio);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: fd
        };
        delete options.headers['Content-Type'];

        fetch(url, options)
            .then(function (response) {
                getFlashcardsCommonNumbers('selectedCommonDeckId');
                console.log("okej");
            })
    }
    else {
        var noDeckErrorText = document.getElementById('add-card-no-deck-error');
        noDeckErrorText.setAttribute("style", "display:flex");
    }
})

//create new card from IMPORT TEXT FILE
var importFromTxtBtn = document.getElementById('deck-set-save-btn');

importFromTxtBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var activeDeck = $('.common-deck-list li.active-deck');
    if (activeDeck.length > 0) {
        var activeDeckId = activeDeck[0].id.replace(/^\D+/g, '');

        var url = 'http://127.0.0.1:8000/api/card-create/' + activeDeckId + '/';

        //Get all imported phrases/flashcards into list
        var allTxtRows = document.querySelectorAll('.dect-set-text-list-ele');
        var flashcardsList = []
        allTxtRows.forEach(row => {
            var tmp = []
            tmp.push(row.children[0].children[0].innerHTML);
            tmp.push(row.children[2].children[0].innerHTML);
            flashcardsList.push(tmp);
        });

        //Collect all data from Add Card Window ///
        //////////////////////////////////////////
        for (var i = 0; i < flashcardsList.length; i++) {
            //selected languages
            const selectedLangFrontCode = '';
            const selectedLangBackCode = '';

            //flashcard text (front & back)
            var textFlashcardFront = flashcardsList[i][0];
            var textFlashcardBack = flashcardsList[i][1];

            //flashcard example sentences
            var textFlashcardFieldOne = '';
            var textFlashcardFieldTwo = '';
            var textFlashcardFieldThree = '';

            var fd = new FormData()
            fd.append("language_front", selectedLangFrontCode);
            fd.append("language_back", selectedLangBackCode);
            fd.append("text_front", textFlashcardFront);
            fd.append("text_back", textFlashcardBack);
            fd.append("example_sentence_one", textFlashcardFieldOne);
            fd.append("example_sentence_two", textFlashcardFieldTwo);
            fd.append("example_sentence_three", textFlashcardFieldThree);

            const options = {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                body: fd
            };
            delete options.headers['Content-Type'];

            fetch(url, options)
                .then(function (response) {
                    var listContainer = document.getElementById('dect-set-im-list-elements-container');
                    //Clear word's list before we add new items
                    while (listContainer.firstChild) {
                        listContainer.removeChild(listContainer.lastChild);
                    }

                    activeSaveBtn("deck-set-save-btn", '.dect-set-text-list-ele');
                    getFlashcardsCommonNumbers('selectedCommonDeckId');

                    console.log("okej");
                })
        }
    }
    else {
        var noDeckErrorText = document.getElementById('import-no-deck-error');
        noDeckErrorText.setAttribute("style", "display:flex");
    }
})

//create new card from IMPORT IMAGE FILE
var importFromImgBtn = document.getElementById('deck-set-image-save-btn');

importFromImgBtn.addEventListener('click', function (e) {
    e.preventDefault();

    var activeDeck = $('.common-deck-list li.active-deck');
    if (activeDeck.length > 0) {
        var activeDeckId = activeDeck[0].id.replace(/^\D+/g, '');

        var url = 'http://127.0.0.1:8000/api/card-create/' + activeDeckId + '/';

        //Get all imported phrases/flashcards into list
        var allTxtRows = document.querySelectorAll('.dect-set-im-list-ele');
        var flashcardsList = []
        allTxtRows.forEach(row => {
            var tmp = []
            tmp.push(row.children[0].children[0].src);
            tmp.push(row.children[2].children[0].src);
            flashcardsList.push(tmp);
        });
        //Collect all data from Add Card Window ///
        //////////////////////////////////////////
        for (var i = 0; i < flashcardsList.length; i++) {
            //selected languages
            const selectedLangFrontCode = '';
            const selectedLangBackCode = '';

            //flashcard text (front & back)
            var textFlashcardFront = flashcardsList[i][0];
            var textFlashcardBack = flashcardsList[i][1];

            //flashcard example sentences
            var textFlashcardFieldOne = '';
            var textFlashcardFieldTwo = '';
            var textFlashcardFieldThree = '';

            var fd = new FormData();
            fd.append("language_front", selectedLangFrontCode);
            fd.append("language_back", selectedLangBackCode);
            fd.append("image_front", textFlashcardFront);
            fd.append("image_back", textFlashcardBack);
            fd.append("example_sentence_one", textFlashcardFieldOne);
            fd.append("example_sentence_two", textFlashcardFieldTwo);
            fd.append("example_sentence_three", textFlashcardFieldThree);

            const options = {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                body: fd
            };
            delete options.headers['Content-Type'];

            fetch(url, options)
                .then(function (response) {
                    var listContainer = document.getElementById('dect-set-image-list-elements-container');
                    //Clear word's list before we add new items
                    while (listContainer.firstChild) {
                        listContainer.removeChild(listContainer.lastChild);
                    }

                    activeSaveBtn("deck-set-image-save-btn", '.dect-set-im-list-ele');
                    getFlashcardsCommonNumbers('selectedCommonDeckId');

                    console.log("okej");
                })
        }
    }
    else {
        var noDeckErrorText = document.getElementById('import-no-deck-error');
        noDeckErrorText.setAttribute("style", "display:flex");
    }
})