import { runGame as runSnakeGame, snakePlaying } from './snake/snakeGame.js'
import { runGame as runDragDropGame, dragAndDropPlaying } from './dragAndDrop/dragAndDropGame.js'
import { getSnakeData, getDDData } from './getGamesData.js';

let gameIndex = 0;
let isPlaying = false;

//Switching between individual tabs
//select game's tabs
var games = Array.from(document.querySelectorAll('.gameCard'));
//give a click event to each tab
games.forEach(function (el, index, all) {
    el.addEventListener('click', function () {
        let content = Array.from(document.querySelectorAll('.games-contents .games-content'));

        content.forEach(function (el) {
            el.style.display = "none";
        });

        games.forEach(function (el) {
            el.classList.remove('game-active');
        });
        el.classList.add('game-active');

        content[index].style.display = "block";

        //Open start game window
        if (isPlaying && index == gameIndex) return
        const startGameWindow = document.querySelector(el.dataset.startGame);
        openStartGameWindow(startGameWindow);

        if (isPlaying && gameIndex == 0) {
            snakePlaying(false)
        }
        else if (isPlaying && gameIndex == 1) {
            dragAndDropPlaying(false)
        }

        gameIndex = index
        isPlaying = false
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
//PLAY GAME//////////////////////////////////////////////////////////////////////////////////////////
function openStartGameWindow(startGameWindow) {
    if (startGameWindow == null) return

    const restartGameWindow = document.getElementById('restart-game-window');
    restartGameWindow.classList.remove('active');

    startGameWindow.classList.add('active');
}

const playButton = document.getElementById('start-game')

playButton.addEventListener('click', function () {
    let content = document.getElementById('start-game-window');
    content.classList.remove('active');
    isPlaying = true;

    if (isPlaying && gameIndex == 0) {
        getSnakeData(true);
        snakePlaying(true)
        runSnakeGame()
    }
    else if (isPlaying && gameIndex == 1) {
        dragAndDropPlaying(true)
        getDDData(true)
        runDragDropGame()
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////
//RESTART GAME//////////////////////////////////////////////////////////////////////////////////////////
export function restart() {
    const restartGameWindow = document.getElementById('restart-game-window');
    openRestartGameWindow(restartGameWindow);

    isPlaying = false;
}

function openRestartGameWindow(restartGameWindow) {
    if (restartGameWindow == null) return

    restartGameWindow.classList.add('active');
}

const restartButton = document.getElementById('restart-game')

restartButton.addEventListener('click', function () {
    let content = document.getElementById('restart-game-window');
    content.classList.remove('active');
    isPlaying = true;

    if (isPlaying && gameIndex == 0) {
        getSnakeData(true);
        snakePlaying(true)
        runSnakeGame()
    }
    else if (isPlaying && gameIndex == 1) {
        dragAndDropPlaying(true)
        getDDData(true)
        runDragDropGame()
    }
})

//INICJALIZATION
function initializeGamesView() {
    let lifeFlagPath = "../static/mainContent/images/lifeFlags/";
    let langCode = localStorage.getItem('LANGIAppLang');
    let content = Array.from(document.querySelectorAll('.games-contents .games-content'));
    let flags = Array.from(document.querySelectorAll('.life-flag'));

    content.forEach(function (el) {
        el.style.display = "none";
    });

    flags.forEach(function (e) {
        e.src = lifeFlagPath.concat(langCode, ".svg")
    })
}

initializeGamesView();