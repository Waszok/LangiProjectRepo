import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnake } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { restart } from '../games.js'
import { updateActivitySanke } from '../getGamesData.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
let isSnakePlaying = false;

const scoreElementSnake = document.getElementById('snake-score-value');

let flagsSnake = Array.from(document.querySelectorAll('.life-flag'));

let scoreSnake = 0;
let lifesSnake = 3;
let mistakesSnake = 0;

export function addScore() {
    scoreSnake++;
    scoreElementSnake.textContent = scoreSnake;
    updateActivitySanke();
}

export function addMistake() {
    lifesSnake--;
    mistakesSnake++;
    flagsSnake[3 - mistakesSnake].style.opacity = "0";
}

function main(currentTime) {
    if (isSnakePlaying) {
        if (gameOver) {
            restart()
            for (var i = 2; i > -1; i--) {
                flagsSnake[i].style.opacity = "0";
            }
            scoreElementSnake.textContent = 0;
            gameOver = false
            return
        }

        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

        lastRenderTime = currentTime;

        update();
        draw();
    }
    else {
        return
    }
}

export function runGame() {
    window.requestAnimationFrame(main);
}

export function snakePlaying(isPlaying) {
    isSnakePlaying = isPlaying
    resetSnake()

    lifesSnake = 3;
    scoreSnake = 0;
    mistakesSnake = 0;

    for (var i = 2; i > -1; i--) {
        flagsSnake[i].style.opacity = "1";
    }
}

function update() {
    updateSnake();
    updateFood();
    checkLife()
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkLife() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()

    if (lifesSnake === 0) {
        gameOver = true
    }
}