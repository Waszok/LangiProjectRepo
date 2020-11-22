//get cookies needed to send POST request using AJAX
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------NAVBAR--------//////////////////////////////////////////////////////////
//open/close submenus in navbar (languages or profile)
$(document).ready(function () {
    $('#languageBtn').click(function () {
        $('#list-languages').toggle();
    });

    $('#profileBtn').click(function () {
        $('#list-profile').toggle();
    });
});

$(document).click(function (e) {
    var element = e.target;
    var parentLanguage = element.closest("#languageBtn");
    var parentProfile = element.closest("#profileBtn");

    //check whether user click outside of language button
    if (parentLanguage != null) {
        if (element.id != 'languageBtn' && !$('#languageBtn').find(e.target).length
            && parentLanguage.id != 'languageBtn' && !$('#languageBtn').find(parentLanguage).length) {
            $("#list-languages").hide();
        }
    }
    else {
        $("#list-languages").hide();
    }

    //check whether user click outside of profile button
    if (parentProfile != null) {
        if (e.target.id != 'profileBtn' && !$('#profileBtn').find(e.target).length
            && parentProfile.id != 'profileBtn' && !$('#profileBtn').find(parentProfile).length) {
            $("#list-profile").hide();
        }
    }
    else {
        $("#list-profile").hide();
    }
});

//mark a proper language (chosen language)
$('#list-languages').on('click', 'li', function () {
    $(this).addClass('language-active').siblings().removeClass('language-active')
});

function langSelected(current_lang) {
    $('#list-languages li').removeClass('language-active');
    var element = document.getElementById(current_lang);
    element.classList.add('language-active');
}

function changeLanguage(lang_code) {

    //set chosen language on the website
    document.getElementById("lang-code").value = lang_code;
    document.setLangEnglish.submit();

    //make POST ajax request
    $.ajax({
        type: 'POST',
        url: $('#list-languages').attr('langauge-change-url'),
        data: { "language": lang_code },
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {
            // on successfull creating object
        },
        error: function (response) {
            // alert the error if any error occured
            alert(response["responseJSON"]["error"]);
        }
    })

    return false;
}

//turn on/off dark mode
var dark;
//bottom deck select list arrows 
var arrowBlack = document.querySelector('#arrow-deck-black');
var arrowWhite = document.querySelector('#arrow-deck-white');
var arrowHighlight = document.querySelector('#arrow-deck-highlight');

const toggleTheme = () => {
    var logo = document.querySelector('.logo').childNodes[1].firstChild;

    document.querySelector('.toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark');

        dark = !dark;

        if (dark) {
            logo.src = "../static/accounts/images/LogoNameLight2.png";
            //set deck list arrow color
            if (arrowHighlight.style.display == "none") {
                arrowBlack.style.display = "none";
                arrowWhite.style.display = "block";
            }

        }
        else {
            logo.src = "../static/accounts/images/LogoNameDark.png";
            //set deck list arrow color
            if (arrowHighlight.style.display == "none") {
                arrowBlack.style.display = "block";
                arrowWhite.style.display = "none";
            }
        }

        //make POST ajax request
        $.ajax({
            type: 'POST',
            url: $('#themeToggle').attr('theme-change-url'),
            data: { "darkMode": dark },
            headers: { 'X-CSRFToken': csrftoken },
            success: function (response) {
                // on successfull creating object
            },
            error: function (response) {
                // alert the error if any error occured
                alert(response["responseJSON"]["error"]);
            }
        })
    })
}

//show/hide burger menu and turn on submenu animation
const menuSlide = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu .menu__item');

    burger.addEventListener('click', () => {
        //Toggle burger menu
        menu.classList.toggle('burger-active');

        //Animate menu items
        menuItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `menuItemsFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        })
    })
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------TILES--------//////////////////////////////////////////////////////////
const pathIcon = "../static/mainContent/images/icons/";

function IconUnhover(obj) {
    var cardId = obj.className.split(" ")[1];
    var name = cardId.substring(0, cardId.length - 17);
    if (obj.querySelector("img") != null) {
        obj.querySelector("img").src = pathIcon.concat(name, "Transparent.png");
    }
}

function IconHover(obj) {
    var cardId = obj.className.split(" ")[1];
    if (obj.querySelector("img") != null) {
        obj.querySelector("img").src = pathIcon.concat(cardId, ".png");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////-------BOTTOM DECK LIST--------/////////////////////////////////////////
var listDeckBottom = document.querySelector(".bottom-deck-list");
var buttonDeck = document.getElementById("open-list-deck");
var choosenDeck = document.querySelector('.bottom-selected-deck');
var commonChoosenDecks = document.querySelectorAll('.common-selected-deck');
var buttonDeckClicked = 0;

//turn on/off deck list
buttonDeck.addEventListener('click', function () {
    if (listDeckBottom.style.display != 'none') {
        listDeckBottom.style.display = 'none';
    } else {
        listDeckBottom.style.display = 'block';
    }

    if (buttonDeckClicked == 0) {
        buttonDeckClicked = 1;
    } else {
        buttonDeckClicked = 0;
    }
});

//hover deck list button
function hover() {
    arrowHighlight.style.display = "block";
    arrowBlack.style.display = "none";
    arrowWhite.style.display = "none";
}

function unhover() {
    if (buttonDeckClicked == 0) {
        arrowHighlight.style.display = "none";
        if (dark) {
            arrowWhite.style.display = "block";
        }
        else {
            arrowBlack.style.display = "block";
        }
    }
}

//active deck list element
$('.bottom-deck-list').on('click', 'li', function () {
    $(this).addClass('active-deck').siblings().removeClass('active-deck')
    var selectedDeckId = parseInt($(this).attr('id').substring(5));

    var choosedDeckName = $(this).children(0).text();
    choosenDeck.value = choosedDeckName;

    localStorage.setItem("selectedDeckId", selectedDeckId);

    getFlashcardsNumbers("selectedDeckId");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------GET ALL DECKS--------////////////////////////////////////////////////////
function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}


var deckList = []

//Get data (all user's decks) from API
async function getDecks() {
    var url = 'http://127.0.0.1:8000/api/deck-list/';
    const response = await fetch(url);

    return response.json()
}

//Add received decks to the bottom list
function addDecksToBottomList(listId, elementId, ifCommon) {
    var lists = document.querySelectorAll(listId);
    var nameLength = 20;
    lists.forEach(list => {
        //Clear bottom deck list before we add new items
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }

        if (deckList.length > 0) {
            choosenDeck.classList.remove('no-decks');
            commonChoosenDecks.forEach(commonChoosenDeck => {
                commonChoosenDeck.classList.remove('no-decks');
            })
        }
        else {
            choosenDeck.value = 'no-decks';
            choosenDeck.classList.add('no-decks');
            commonChoosenDecks.forEach(commonChoosenDeck => {
                commonChoosenDeck.value = 'no-decks';
                commonChoosenDeck.classList.add('no-decks');
            })
        }

        for (var i in deckList) {
            var item = `<li id="${elementId}-${deckList[i].id}">
            <p>${deckList[i].name.substring(0, nameLength)}</p>
            <hr class="bottom-deck-list-line">
        </li>`

            list.innerHTML += item;
        }

        //Set a proper deck in a bottom list
        var selectedDeckID
        if (!ifCommon) {
            selectedDeckID = localStorage.getItem("selectedDeckId");
        }
        else {
            selectedDeckID = localStorage.getItem("selectedCommonDeckId");
        }

        var indexPresent = false;
        for (var i in deckList) {
            if (selectedDeckID == deckList[i].id) {
                indexPresent = true;
                break;
            }
        }
        if (indexPresent) {
            if (!ifCommon) {
                var elementToSelect = document.getElementById(elementId + '-' + selectedDeckID.toString());
                elementToSelect.classList.add('active-deck');
                var choosedDeckName = elementToSelect.firstElementChild.innerHTML;
                choosenDeck.value = choosedDeckName;
            }
            else {
                var elementToSelects = document.querySelectorAll("#" + elementId + '-' + selectedDeckID.toString());
                elementToSelects.forEach(elementToSelect => {
                    elementToSelect.classList.add('active-deck');
                    var choosedDeckName = elementToSelect.firstElementChild.innerHTML;
                    commonChoosenDecks.forEach(commonChoosenDeck => {
                        commonChoosenDeck.value = choosedDeckName;
                    })
                })
            }
        } else {
            if (list.children.length > 0) {
                if (!ifCommon) {
                    var firstChild = listDeckBottom.children[0];
                    firstChild.classList.add('active-deck');

                    var choosedDeckName = firstChild.firstElementChild.innerHTML;
                    choosenDeck.value = choosedDeckName;
                }
                else {
                    var firstChild = list.children[0];
                    firstChild.classList.add('active-deck');

                    var choosedDeckName = firstChild.firstElementChild.innerHTML;
                    commonChoosenDecks.forEach(commonChoosenDeck => {
                        commonChoosenDeck.value = choosedDeckName;
                    })
                }
            }
        }
    });
}

//Display result (run both above methods)
async function displayData(listId, elementId, ifCommon) {
    deckList = await getDecks();
    getAllUserDecks(deckList);
    if (listId === ".bottom-deck-list")
        getFlashcardsNumbers("selectedDeckId");
    addDecksToBottomList(listId, elementId, ifCommon);
}

displayData('.bottom-deck-list', 'deck', false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------TRANSLATE JS TEXT --------///////////////////////////////////////////////
const jsDictTranslations = {
    'Selected deck does not contain any cards ...en': 'Selected deck does not contain any cards ...',
    'Selected deck does not contain any cards ...de': 'Das ausgewählte Deck enthält keine Karten ...',
    'Selected deck does not contain any cards ...cs': 'Vybraný balíček neobsahuje žádné karty ...',
    'Selected deck does not contain any cards ...es': 'El mazo seleccionado no contiene ninguna carta ...',
    'Selected deck does not contain any cards ...fr': 'Le deck sélectionné ne contient aucune carte ...',
    'Selected deck does not contain any cards ...it': 'Il mazzo selezionato non contiene carte ...',
    'Selected deck does not contain any cards ...lt': 'Pasirinktame denyje nėra kortelių ...',
    'Selected deck does not contain any cards ...nl': 'Het geselecteerde kaartspel bevat geen kaarten ...',
    'Selected deck does not contain any cards ...pl': 'Wybrana talia nie zawiera żadnej fiszki ...',
    'Selected deck does not contain any cards ...pt': 'O baralho selecionado não contém nenhuma carta ...',
    'Selected deck does not contain any cards ...tr': 'Seçilen destede kart yok ...',
    'Selected deck does not contain any cards ...ru': 'Выбранная колода не содержит карт ...',
    'Selected deck does not contain any cards ...zh-tw': '所選卡座不包含任何卡牌 ...',
    'Selected deck does not contain any cards ...ja': '選択したデッキにはカードが含まれていません ...',
    'Selected deck does not contain any cards ...ko': '선택된 덱에 카드가 없습니다 ...',
    'Selected deck does not contain any cards ...el': 'Η επιλεγμένη τράπουλα δεν περιέχει κάρτες ...',

    'no carden': 'no card',
    'no cardde': 'keine Karte',
    'no cardcs': 'žádná karta',
    'no cardes': 'sin tarjeta',
    'no cardfr': 'pas de carte',
    'no cardit': 'nessuna carta',
    'no cardlt': 'be kortelės',
    'no cardnl': 'geen kaart',
    'no cardpl': 'brak fiszki',
    'no cardpt': 'nenhum cartão',
    'no cardtr': 'kart yok',
    'no cardru': 'нет карты',
    'no cardzh-tw': '沒有卡',
    'no cardja': 'カードなし',
    'no cardko': '카드 없음',
    'no cardel': 'χωρίς κάρτα',

    'Number of flashcards by difficultyen': 'Number of flashcards by difficulty',
    'Number of flashcards by difficultyde': 'Anzahl der Karteikarten nach Schwierigkeitsgrad',
    'Number of flashcards by difficultycs': 'Počet kartiček podle obtížnosti',
    'Number of flashcards by difficultyes': 'Número de flashcards por dificultad',
    'Number of flashcards by difficultyfr': 'Nombre de cartes mémoire par difficulté',
    'Number of flashcards by difficultyit': 'Numero di flashcard per difficoltà',
    'Number of flashcards by difficultylt': 'Atminties kortelių skaičius pagal sunkumus',
    'Number of flashcards by difficultynl': 'Aantal flashcards op moeilijkheidsgraad',
    'Number of flashcards by difficultypl': 'Liczba fiszek według trudności',
    'Number of flashcards by difficultypt': 'Número de flashcards por dificuldade',
    'Number of flashcards by difficultytr': 'Zorluğa göre bilgi kartı sayısı',
    'Number of flashcards by difficultyru': 'Количество карточек по сложности',
    'Number of flashcards by difficultyzh-tw': '抽認卡的數量按難度',
    'Number of flashcards by difficultyja': '難易度別のフラッシュカードの数',
    'Number of flashcards by difficultyko': '난이도 별 플래시 카드 수',
    'Number of flashcards by difficultyel': 'Ο αριθμός των καρτών flash από δυσκολία',

    'Gamesen': 'Games',
    'Gamesde': 'Spiele',
    'Gamescs': 'Hry',
    'Gameses': 'Juegos',
    'Gamesfr': 'Jeux',
    'Gamesit': 'Giochi',
    'Gameslt': 'Žaidimai',
    'Gamesnl': 'Spellen',
    'Gamespl': 'Gry',
    'Gamespt': 'Jogos',
    'Gamestr': 'Oyunlar',
    'Gamesru': 'Игры',
    'Gameszh-tw': '遊戲類',
    'Gamesja': 'ゲーム',
    'Gamesko': '계략',
    'Gamesel': 'Παιχνίδια',

    'Againen': 'Again',
    'Againde': 'Nochmal',
    'Againcs': 'Znovu',
    'Againes': 'De nuevo',
    'Againfr': 'Encore',
    'Againit': 'Ancora',
    'Againlt': 'Vėlgi',
    'Againnl': 'Opnieuw',
    'Againpl': 'Ponownie',
    'Againpt': 'Novamente',
    'Againtr': 'Tekrar',
    'Againru': 'Очередной раз',
    'Againzh-tw': '再次',
    'Againja': '再び',
    'Againko': '다시',
    'Againel': 'Πάλι',

    'Very Harden': 'Very Hard',
    'Very Hardde': 'Sehr schwer',
    'Very Hardcs': 'Velmi obtížné',
    'Very Hardes': 'Muy dificil',
    'Very Hardfr': 'Très difficile',
    'Very Hardit': 'Molto difficile',
    'Very Hardlt': 'Labai sunku',
    'Very Hardnl': 'Heel moeilijk',
    'Very Hardpl': 'Bardzo trudne',
    'Very Hardpt': 'Muito difícil',
    'Very Hardtr': 'Çok zor',
    'Very Hardru': 'Очень сложно',
    'Very Hardzh-tw': '很難',
    'Very Hardja': 'とても厳しい',
    'Very Hardko': '열심히',
    'Very Hardel': 'Πολύ δύσκολο',

    'Harden': 'Hard',
    'Hardde': 'Schwer',
    'Hardcs': 'Tvrdý',
    'Hardes': 'Difícil',
    'Hardfr': 'Dur',
    'Hardit': 'Difficile',
    'Hardlt': 'Sunku',
    'Hardnl': 'Moeilijk',
    'Hardpl': 'Trudne',
    'Hardpt': 'Difícil',
    'Hardtr': 'Zor',
    'Hardru': 'Жесткий',
    'Hardzh-tw': '硬',
    'Hardja': 'ハード',
    'Hardko': '단단한',
    'Hardel': 'Σκληρός',

    'Mediumen': 'Medium',
    'Mediumde': 'Mittel',
    'Mediumcs': 'Střední',
    'Mediumes': 'Medio',
    'Mediumfr': 'Moyen',
    'Mediumit': 'Medio',
    'Mediumlt': 'Vidutinis',
    'Mediumnl': 'Medium',
    'Mediumpl': 'Średnie',
    'Mediumpt': 'Médio',
    'Mediumtr': 'Orta',
    'Mediumru': 'средний',
    'Mediumzh-tw': '中',
    'Mediumja': '中',
    'Mediumko': '매질',
    'Mediumel': 'Μεσαίο',

    'Easyen': 'Easy',
    'Easyde': 'Einfach',
    'Easycs': 'Snadný',
    'Easyes': 'Fácil',
    'Easyfr': 'Facile',
    'Easyit': 'Facile',
    'Easylt': 'Lengva',
    'Easynl': 'Gemakkelijk',
    'Easypl': 'Łatwe',
    'Easypt': 'Fácil',
    'Easytr': 'Kolay',
    'Easyru': 'Легко',
    'Easyzh-tw': '簡單',
    'Easyja': 'かんたん',
    'Easyko': '쉬운',
    'Easyel': 'Ανετα',

    'Search by name or tag ...en': 'Search by name or tag ...',
    'Search by name or tag ...de': 'Suche nach Name oder Tag ...',
    'Search by name or tag ...cs': 'Hledejte podle jména nebo značky ...',
    'Search by name or tag ...es': 'Buscar por nombre o etiqueta ...',
    'Search by name or tag ...fr': 'Rechercher par nom ou par tag ...',
    'Search by name or tag ...it': 'Cerca per nome o tag ...',
    'Search by name or tag ...lt': 'Ieškokite pagal pavadinimą ar žymą ...',
    'Search by name or tag ...nl': 'Zoek op naam of tag ...',
    'Search by name or tag ...pl': 'Szukaj po nazwie lub tagu ...',
    'Search by name or tag ...pt': 'Pesquise por nome ou tag ...',
    'Search by name or tag ...tr': 'Ada veya etikete göre arayın ...',
    'Search by name or tag ...ru': 'Поиск по имени или тегу ...',
    'Search by name or tag ...zh-tw': '按名稱或標籤搜索 ...',
    'Search by name or tag ...ja': '名前またはタグで検索 ...',
    'Search by name or tag ...ko': '이름 또는 태그로 검색 ...',
    'Search by name or tag ...el': 'Αναζήτηση βάσει ονόματος ή ετικέτας ...',

    'Search words ...en': 'Search words ...',
    'Search words ...de': 'Suchbegriffe ...',
    'Search words ...cs': 'Hledat slova ...',
    'Search words ...es': 'Palabras de búsqueda ...',
    'Search words ...fr': 'Rechercher des mots ...',
    'Search words ...it': 'Cerca parole ...',
    'Search words ...lt': 'Paieškos žodžiai ...',
    'Search words ...nl': 'Zoek woorden ...',
    'Search words ...pl': 'Szukaj słów ...',
    'Search words ...pt': 'Palavras de busca ...',
    'Search words ...tr': 'Kelime ara ...',
    'Search words ...ru': 'Поисковые слова ...',
    'Search words ...zh-tw': '搜索詞 ...',
    'Search words ...ja': '検索ワード ...',
    'Search words ...ko': '검색어 ...',
    'Search words ...el': 'Αναζήτηση λέξεων ...',
}


function translateJsText(text) {
    var l = localStorage.getItem('LANGIAppLang');
    text = text + l;
    return jsDictTranslations[text];
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////------INITILIZATION--------////////////////////////////////////////////////////
function initializeMainContent(langauge, darkMode) {
    //set the proper language in cookies
    document.cookie = "django_language=" + langauge + ";path=/";
    sessionStorage.setItem("ReversoReader_langSource", langauge + ";path=/");
    localStorage.setItem('LANGIAppLang', langauge);

    if (langauge === 'ko') {
        document.body.style.fontFamily = 'Noto Sans, Noto Sans CJK KR, sans-serif';
    }
    else if (langauge === "ja") {
        document.body.style.fontFamily = 'Noto Sans, Noto Sans CJK JP, sans-serif';
    }
    else if (langauge === "zh-tw") {
        document.body.style.fontFamily = 'Noto Sans, Noto Sans CJK TC, sans-serif';
    }

    //set the proper theme mode
    var logo = document.querySelector('.logo').childNodes[1].firstChild;
    if (darkMode == 'False') {
        logo.src = "../static/accounts/images/LogoNameDark.png";
        dark = false
        //set deck list arrow color
        arrowBlack.style.display = "block";
        arrowWhite.style.display = "none";
        arrowHighlight.style.display = "none";
    }
    else {
        document.body.classList.add('dark');
        logo.src = "../static/accounts/images/LogoNameLight2.png";
        dark = true
        //set deck list arrow color
        arrowBlack.style.display = "none";
        arrowWhite.style.display = "block";
        arrowHighlight.style.display = "none";
    }
}


const app = () => {
    //slide burger menu from right side
    menuSlide();
    //toggle theme
    toggleTheme();
}

app();



