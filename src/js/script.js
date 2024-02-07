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

let score = 0
let scoreCounter = document.getElementById('score')

const CANVAS = document.getElementById('canvas')
const CTX = canvas.getContext('2d')

CANVAS.height = COLS * BLOCK_SIZE
CANVAS.width = ROWS * BLOCK_SIZE

CTX.fillStyle = 'black'
CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

document.addEventListener('keydown', changeDir)

MainLoop.setSimulationTimestep(125)
MainLoop.setMaxAllowedFPS(8)


MainLoop.setBegin(begin).setUpdate(update).setDraw(draw).setEnd(end).start()


function begin(){
    // draw board
    CTX.fillStyle = 'black'
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
}

function update(){
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        newFood()
        score += 1
        scoreCounter.innerHTML = score
    }
    
    // move snakes body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    // move snakes head
    snakeX += velocityX * BLOCK_SIZE
    snakeY += velocityY * BLOCK_SIZE
}

function draw(){
    // draw food
    CTX.fillStyle = 'red'
    CTX.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE)
    
    // draw snake
    CTX.fillStyle = 'blue'
    CTX.fillRect(snakeX, snakeY, BLOCK_SIZE, BLOCK_SIZE)
    
    for(let i = 0; i < snakeBody.length; i++){
        CTX.fillRect(snakeBody[i][0], snakeBody[i][1], BLOCK_SIZE, BLOCK_SIZE)
    }
}

function end(){
    // check if lost
    if (snakeX < 0 || snakeX > (COLS * BLOCK_SIZE) - BLOCK_SIZE || snakeY < 0 || snakeY > (ROWS * BLOCK_SIZE) - BLOCK_SIZE){
        MainLoop.stop()
        displayGameOverScreen()
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            MainLoop.stop()
            displayGameOverScreen()
        }
    }
}

function newFood(){
        foodX = Math.floor(Math.random() * COLS) * BLOCK_SIZE;
        foodY = Math.floor(Math.random() * ROWS) * BLOCK_SIZE;
}

function changeDir(e){
    if(!MainLoop.isRunning()){
        resetGame()
        MainLoop.start()
    }
    // currentInput
    // 1 - right, 2 - down, 3- left, 4 - up
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

function resetGame(){
    snakeX = BLOCK_SIZE * 3
    snakeY = BLOCK_SIZE * 7

    foodX = BLOCK_SIZE * 10
    foodY = BLOCK_SIZE * 7

    velocityX = 0
    velocityY = 0

    snakeBody = []
    score = 0
}

function displayGameOverScreen(){
    CTX.font = "30px \"Lucida Console\"";
    CTX.fillStyle = "white";
    CTX.textAlign = "center";
    CTX.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    CTX.font = "20px \"Lucida Console\"";
    CTX.fillText("press arrow key to play again!", canvas.width / 2, canvas.height / 2 + canvas.height/15);
}