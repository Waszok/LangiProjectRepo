////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////-------SELECT DECK LIST--------/////////////////////////////////////////
var commonButtonDecks = document.querySelectorAll(".common-open-list");
var commonChoosenDecks = document.querySelectorAll('.common-selected-deck');
var blackArrows = document.querySelectorAll('.arrow-deck-list-black');
var whiteArrows = document.querySelectorAll('.arrow-deck-list-white');

//turn on/off deck list
commonButtonDecks.forEach(commonButtonDeck => {
    commonButtonDeck.addEventListener('click', function () {
        let parent = $(this).parent().parent();
        let commonListDeck = parent[0].children[2];

        if (commonListDeck.style.display != 'none') {
            commonListDeck.style.display = 'none';
        } else {
            commonListDeck.style.display = 'block';
        }
    });
})

//HOVER COMMMON DECK LIST BUTTON
function CommonListhover() {
    blackArrows.forEach(blackArrow => {
        blackArrow.setAttribute('src', '../static/mainContent/images/downArrowHighlight.png')
    })
    whiteArrows.forEach(whiteArrow => {
        whiteArrow.setAttribute('src', '../static/mainContent/images/downArrowHighlight.png')
    })
}

function CommonListunhover() {
    blackArrows.forEach(blackArrow => {
        blackArrow.setAttribute('src', '../static/mainContent/images/downArrowBlack.png')
    })
    whiteArrows.forEach(whiteArrow => {
        whiteArrow.setAttribute('src', '../static/mainContent/images/downArrowWhite.png')
    })
}

//active deck list element
$('.common-deck-list').on('click', 'li', function () {
    $(this).addClass('active-deck').siblings().removeClass('active-deck')
    var selectedDeckId = parseInt($(this).attr('id').substring(11));

    var choosedDeckName = $(this).children(0).text();
    commonChoosenDecks.forEach(commonChoosenDeck => {
        commonChoosenDeck.value = choosedDeckName;
    })

    localStorage.setItem("selectedCommonDeckId", selectedDeckId);

    getChoosenDeckId("selectedCommonDeckId");

    if (dictionaryOpen === true) {
        displayWordsList();
    }

    if (activityOpen === true) {
        displayWordsListActivity()
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------GET ALL DECKS INTO COMMON DECK LIST--------//////////////////////////////
displayData('.common-deck-list', 'commondeck', true);
