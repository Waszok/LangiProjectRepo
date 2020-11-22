import { onSnake, expandSnake, equalPositions } from "./snake.js"
import { randomGridPosition } from "./grid.js"
import { rightSnakeAnswer, getSnakeData } from '../getGamesData.js'
import { addScore, addMistake } from "./snakeGame.js"

const EXPANSION_RATE = 1
let food1 = getRandomFoodPosition(1)
let food2 = getRandomFoodPosition(2)
let food3 = getRandomFoodPosition(3)

var foods = [food1, food2, food3];

var gameBoard = document.getElementById('game-board');

export function update() {
    if (rightSnakeAnswer >= 0) {
        if (onSnake(foods[rightSnakeAnswer])) {
            addScore()

            //getSnakeData(false)
            expandSnake(EXPANSION_RATE);
            food1 = getRandomFoodPosition(1)
            food2 = getRandomFoodPosition(2)
            food3 = getRandomFoodPosition(3)
            foods = [food1, food2, food3];


        }
        else if (onSnake(foods[(rightSnakeAnswer + 1) % 3])) {
            addMistake()
            var x = foods[(rightSnakeAnswer + 1) % 3].x;
            var y = foods[(rightSnakeAnswer + 1) % 3].y;
            foods[(rightSnakeAnswer + 1) % 3].x = -100;
            foods[(rightSnakeAnswer + 1) % 3].y = -100;

            gameBoard.classList.add('snake-overflow');
            setTimeout(function () {
                foods[(rightSnakeAnswer + 1) % 3].x = x;
                foods[(rightSnakeAnswer + 1) % 3].y = y;
                gameBoard.classList.remove('snake-overflow');
            }, 1000);
        }
        else if (onSnake(foods[(rightSnakeAnswer + 2) % 3])) {
            addMistake()
            var x = foods[(rightSnakeAnswer + 2) % 3].x;
            var y = foods[(rightSnakeAnswer + 2) % 3].y;
            foods[(rightSnakeAnswer + 2) % 3].x = -100;
            foods[(rightSnakeAnswer + 2) % 3].y = -100;

            gameBoard.classList.add('snake-overflow');
            setTimeout(function () {
                foods[(rightSnakeAnswer + 2) % 3].x = x;
                foods[(rightSnakeAnswer + 2) % 3].y = y;
                gameBoard.classList.remove('snake-overflow');
            }, 1000);
        }
    }
    else {
        if (onSnake(food1) || onSnake(food2) || onSnake(food3)) {
            expandSnake(EXPANSION_RATE);
            food1 = getRandomFoodPosition(1)
            food2 = getRandomFoodPosition(2)
            food3 = getRandomFoodPosition(3)
            foods = [food1, food2, food3];

            addScore()
        }
    }
}

export function draw(gameBoard) {
    const foodElement1 = document.createElement('div');
    foodElement1.style.gridRowStart = food1.y;
    foodElement1.style.gridColumnStart = food1.x;
    foodElement1.classList.add('food1');
    gameBoard.appendChild(foodElement1);

    const foodElement2 = document.createElement('div');
    foodElement2.style.gridRowStart = food2.y;
    foodElement2.style.gridColumnStart = food2.x;
    foodElement2.classList.add('food2');
    gameBoard.appendChild(foodElement2);

    const foodElement3 = document.createElement('div');
    foodElement3.style.gridRowStart = food3.y;
    foodElement3.style.gridColumnStart = food3.x;
    foodElement3.classList.add('food3');
    gameBoard.appendChild(foodElement3);
}

function getRandomFoodPosition(foodNumber) {
    let newFoodPosition
    if (foodNumber === 1) {
        while (newFoodPosition == null || onSnake(newFoodPosition)) {
            newFoodPosition = randomGridPosition();
        }
    }
    else if (foodNumber === 2) {
        while (newFoodPosition == null || onSnake(newFoodPosition) || equalPositions(food1, newFoodPosition)) {
            newFoodPosition = randomGridPosition();
        }
    }
    else if (foodNumber === 3) {
        while (newFoodPosition == null || onSnake(newFoodPosition)
            || equalPositions(food1, newFoodPosition) || equalPositions(food2, newFoodPosition)) {
            newFoodPosition = randomGridPosition();
        }
    }
    return newFoodPosition
}
