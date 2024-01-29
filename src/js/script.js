const BLOCK_SIZE = 30
const COLS = 15
const ROWS = 15

let snakeX = BLOCK_SIZE * 3
let snakeY = BLOCK_SIZE * 7

let foodX = BLOCK_SIZE * 10
let foodY = BLOCK_SIZE * 7

let velocityX = 0
let velocityY = 0

let snakeBody = []

let currentInput = 0 // TODO - disable multiinput

const CANVAS = document.getElementById('canvas')
const CTX = canvas.getContext('2d')

CANVAS.height = COLS * BLOCK_SIZE
CANVAS.width = ROWS * BLOCK_SIZE


document.addEventListener('keydown', changeDir)
gameLoop = setInterval(update, 100)

function update(){
    // draw board
    CTX.fillStyle = 'black'
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

    // draw food
    CTX.fillStyle = 'red'
    CTX.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE)

    // check if food eaten
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        newFood()
        CTX.fillStyle = 'red'
        CTX.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE)
    }
        
    // move snake body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // draw snake
    CTX.fillStyle = 'blue'
    snakeX += velocityX * BLOCK_SIZE
    snakeY += velocityY * BLOCK_SIZE
    CTX.fillRect(snakeX, snakeY, BLOCK_SIZE, BLOCK_SIZE)

    for(let i = 0; i < snakeBody.length; i++){
        CTX.fillRect(snakeBody[i][0], snakeBody[i][1], BLOCK_SIZE, BLOCK_SIZE)
    }

    // check if lost
    if (snakeX < 0 || snakeX > COLS * BLOCK_SIZE || snakeY < 0 || snakeY > ROWS * BLOCK_SIZE){
        clearInterval(gameLoop)
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            clearInterval(gameLoop)
        }
    }
}

function newFood(){
    foodX = Math.floor(Math.random() * COLS) * BLOCK_SIZE
    foodY = Math.floor(Math.random() * ROWS) * BLOCK_SIZE
}

function changeDir(e){
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}