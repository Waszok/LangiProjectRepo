///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////---------ACTIVITY WINDOW HANDLE-----------///////////////////////////////////////
const openActivityButtons = document.querySelectorAll('[data-activity-open]');
const closeActivityButtons = document.querySelectorAll('[data-activity-close]');

var activityOpen = false;

//Open and close activity window
openActivityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const activityWindow = document.querySelector(button.dataset.activityOpen);
        openActivityWindow(activityWindow);

    })
})

function openActivityWindow(activityWindow) {
    if (activityWindow == null) return
    activityWindow.classList.add('active');

    displayWordsListActivity()
    activityOpen = true;
}

closeActivityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const activityWindow = button.closest('.activity-window')
        closeActivityWindow(activityWindow);
    })
})

function closeActivityWindow(activityWindow) {
    if (activityWindow == null) return
    activityWindow.classList.remove('active');

    activityOpen = false;
}


var labelsDif = [translateJsText('Again'), translateJsText('Very Hard'), translateJsText('Hard'), translateJsText('Medium'), translateJsText('Easy')]
var colorsDif = ['#e1df50', '#c33d1c', '#037ad7', '#35e2ca', '#73e594']

var labelsGames = ['Snake', 'Drag & Drop']
var colorsGames = ['#49A9EA', '#36CAAB']
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////--------------------------TODAY-----------------------////////////////////////////////////////////
//TODAY DIFFICULTY
var dataTodayDif = [0, 0, 0, 0, 0]
var ctxTodayDif = document.getElementById('today-dif-chart').getContext('2d');

let todayDifChart = new Chart(ctxTodayDif, {
    type: 'bar',
    data: {
        labels: labelsDif,
        datasets: [{
            data: dataTodayDif,
            backgroundColor: colorsDif,
        }]
    },
    options: {
        title: {
            text: translateJsText('Number of flashcards by difficulty'),
            fontSize: 16,
            display: true
        },
        legend: {
            display: false
        }
    }
})

//TODAY GAMES
var dataTodayGames = [0, 0]
var ctxTodayGames = document.getElementById('today-games-chart').getContext('2d');

let todayGamesChart = new Chart(ctxTodayGames, {
    type: 'bar',
    data: {
        labels: labelsGames,
        datasets: [{
            data: dataTodayGames,
            backgroundColor: colorsGames,
        }]
    },
    options: {
        title: {
            text: translateJsText('Games'),
            fontSize: 16,
            display: true
        },
        legend: {
            display: false
        },
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////--------WORDS----------///////////////////////////////////////////////////
function displayWordsListActivity() {
    var url = `http://127.0.0.1:8000/api/card-list-all-activity/${actualDeckId}/`;
    var url2 = `http://127.0.0.1:8000/api/activity-list-learn/${actualDeckId}/`;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            var list = data;

            var activityWordListContent = document.getElementById('activity-words-content');
            //Clear word's list before we add new items
            while (activityWordListContent.firstChild) {
                activityWordListContent.removeChild(activityWordListContent.lastChild);
            }

            addFlashcardToActivityWordList(activityWordListContent, list);
        })

    fetch(url2)
        .then(response => response.json())
        .then(function (data) {

            //Update flashcards by difficulty chart:
            dataTodayDif = []
            dataTodayDif.push(data['again'])
            dataTodayDif.push(data['very_hard'])
            dataTodayDif.push(data['hard'])
            dataTodayDif.push(data['medium'])
            dataTodayDif.push(data['easy'])
            todayDifChart.data.datasets = [{
                data: dataTodayDif,
                backgroundColor: colorsDif,
            }]

            todayDifChart.update();

            //Update Games chart
            dataTodayGames = []
            dataTodayGames.push(data['snake_score'])
            dataTodayGames.push(data['drag_drop_score'])
            todayGamesChart.data.datasets = [{
                data: dataTodayGames,
                backgroundColor: colorsGames,
            }]

            todayGamesChart.update()
        })
}

function addFlashcardToActivityWordList(activityWordListContent, list) {
    list.forEach(item => {
        var itemToAdd;
        var sumAnswers = item['sumAnswers'];
        var allAnswers = item['allAnswers'];
        var percentage = getPercentage(sumAnswers, allAnswers)
        if (item['image_front'] != "" && item['image_back'] != "") {
            itemToAdd = `<div class="activity-content-ele-container">
            <div class="activity-content-list-ele">
                <div class="content-front-ele">
                    <img class="learn-falshcard-im" src="${item['image_front']}"></img>
                </div>
                <div class="content-back-ele">
                    <img class="learn-falshcard-im" src="${item['image_back']}"></img>
                </div>
                <div class="content-ele-separator"></div>
                <div class="content-percent">
                    <span>${percentage}%</span>
                </div>
            </div>
                <div class="activity-content-list-line"></div>
            </div>`
        }
        else {
            itemToAdd = `<div class="activity-content-ele-container">
            <div class="activity-content-list-ele">
                <div class="content-front-ele">
                    <div class="content-front-box">
                        ${item['text_front']}
                    </div>
                </div>
                <div class="content-back-ele">
                    <div class="content-back-box">
                        ${item['text_back']}
                    </div>
                </div>
                <div class="content-ele-separator"></div>
                <div class="content-percent">
                    <span>${percentage}%</span>
                </div>
            </div>
                <div class="activity-content-list-line"></div>
            </div>`
        }

        var messageHTML = parseStringToHTML(itemToAdd); //function from deck.js file
        activityWordListContent.insertAdjacentElement("beforeend", messageHTML.body.firstElementChild);
    })
}

function getPercentage(sum, all) {
    if (sum === 0 || all === 0) {
        return 0
    }
    return Math.round(sum * 100 / all)
}