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

CTX.fillStyle = 'black'
CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

MainLoop.setSimulationTimestep(125)
MainLoop.setMaxAllowedFPS(8)
MainLoop.setBegin(begin).setUpdate(update).setDraw(draw).setEnd(end).start()

document.addEventListener('keydown', changeDir)


function begin(){
    // draw board
    CTX.fillStyle = 'black'
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
}

function update(){
    
    if(snakeX == foodX && snakeY == foodY){
        newFood()
        snakeBody.push([snakeX, snakeY])
    }
    
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
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
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            MainLoop.stop()
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