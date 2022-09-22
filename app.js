document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start");
  const width = 10;
  const colors = [
      'yellow',
      'purple',
      'black',
      'blue',
      'pink'
  ]
  let nextRandom = 0
  let timerId
  let score = 0

  // shapes
  const lShape = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]
  const sShape = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tShape= [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oShape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theShapes = [lShape, sShape, tShape, oShape, iShape]

  let currentPosition = 4
  let currentRotation = 0

//randomly select a shape and first position
let random = Math.floor(Math.random()*theShapes.length)
let current = theShapes[random][currentRotation]

//draw the shape 
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

//undraw the shape
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
    })

}

//adding timer to move shape down every second
// timerId = setInterval(moveDown, 1000)

//assign function for keycodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if(e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}
document.addEventListener('keyup', control)

//move shape down
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

//freeze the shape
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //a new shape starts moving down
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theShapes.length)
        current = theShapes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
}

//move shape to the left unless it's at the edge
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition +index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
    }
    draw()
}

//move shape to right until it reaches the edge
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition +index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition +index].classList.contains('taken'))) {
        currentPosition -=1
    }
    draw()
}

//rotate shape
function rotate() {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
        currentRotation = 0
    } 
    current = theShapes[random][currentRotation]
    draw()
}

//preview next shape in mini grid
const displayShapes = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

//shapes without rotations
const nextShape = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lShape
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zShape
    [1, displayWidth, displayWidth+1, displayWidth+2], //tShape
    [0, 1, displayWidth, displayWidth+1], //oShape
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iShape
]

//display shape in mini-grid
function displayShape() {
    displayShapes.forEach(square => {
        square.classList.remove('tetromino')
    })
    nextShape[nextRandom].forEach(index => {
        displayShapes[displayIndex +index].classList.add('tetromino')
    })
}

//make button work
startBtn.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theShapes.length)
        displayShape()
    }
})

//adding score
function addScore() {
    for(let i = 0; i < 199; i+=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
        
        if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
            })
            const squaresRemoved = squares.splice(i, width)
            //append new squares to grid
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}


//gameover
function gameOver() {
    if(current.some(index => squares[currentPosition +index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = "GAME OVER"
        clearInterval9(timerId)
    }
}
});
