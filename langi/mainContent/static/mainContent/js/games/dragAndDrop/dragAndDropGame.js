import { restart } from '../games.js'
import { numberOfDrownCards, getDDData, updateActivityDD } from '../getGamesData.js'

const draggableElements = document.querySelectorAll('.draggable');
const droppableElements = document.querySelectorAll('.droppable');
const scoreElement = document.getElementById('dragdrop-score-value');

let flags = Array.from(document.querySelectorAll('.life-flag'));

let score = 0;
let lifes = 3;
let mistakes = 0;
let draggedCards = 0;

draggableElements.forEach(element => {
    element.addEventListener("dragstart", dragStart);
})

droppableElements.forEach(element => {
    element.addEventListener("dragenter", dragEnter);
    element.addEventListener("dragover", dargOver);
    element.addEventListener("dragleave", dragLeave);
    element.addEventListener("drop", drop);
})

//DRAG AND DROPS FUNCTIONS
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
    if (!event.target.classList.contains("dragged")) {
        event.target.classList.add('droppable-hover');
    }
}

function dargOver(event) {
    if (!event.target.classList.contains("dragged")) {
        event.preventDefault();
    }
}

function dragLeave(event) {
    if (!event.target.classList.contains("dragged")) {
        event.target.classList.remove('droppable-hover');
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove('droppable-hover');
    const draggableElementData = event.dataTransfer.getData("text");
    const droppableElementData = event.target.getAttribute('data-draggable-id');
    if (draggableElementData === droppableElementData) {
        //gray out the droppable element
        event.target.classList.add("dragged");

        //gray out the draggable element
        const draggableElement = document.getElementById(draggableElementData);
        draggableElement.classList.add('dragged')
        draggableElement.setAttribute("draggable", "false")

        score++;
        scoreElement.textContent = score;
        draggedCards++;
        updateActivityDD();
        if (draggedCards === numberOfDrownCards) {
            resetDragDropGood();
            getDDData(true);
        }
    }
    else {
        lifes--;
        mistakes++;
        flags[6 - mistakes].style.opacity = "0";
    }
}

//Handle darg & drop game running
let lastRenderTime = 0;
let gameOver = false;
let isdragAndDropPlaying = false;

function main(currentTime) {
    if (isdragAndDropPlaying) {
        if (gameOver) {
            restart()
            scoreElement.textContent = 0;
            gameOver = false
            return
        }

        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

        lastRenderTime = currentTime;

        update();
    }
    else {
        return
    }
}

export function runGame() {
    window.requestAnimationFrame(main);
}

export function dragAndDropPlaying(isPlaying) {
    isdragAndDropPlaying = isPlaying
    resetDragDrop()
}

function update() {
    checkLifes()
}

function checkLifes() {
    if (lifes === 0) {
        gameOver = true
    }
}

function resetDragDrop() {
    lifes = 3;
    score = 0;
    mistakes = 0;
    draggedCards = 0;
    draggableElements.forEach(element => {
        element.classList.remove('dragged')
        element.setAttribute("draggable", "true")
    })

    droppableElements.forEach(element => {
        element.classList.remove('dragged')
    })

    for (var i = 5; i > 2; i--) {
        flags[i].style.opacity = "1";
    }
}

function resetDragDropGood() {
    draggedCards = 0;
    draggableElements.forEach(element => {
        element.classList.remove('dragged')
        element.setAttribute("draggable", "true")
    })

    droppableElements.forEach(element => {
        element.classList.remove('dragged')
    })
}