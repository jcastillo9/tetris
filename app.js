document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start");
  const width = 10;

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

  const theShapes = [iShape, sShape, tShape, oShape, iShape]

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
timerId = setInterval(moveDown, 100)

//assign function for keycodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if(e.keyCode === 38) {
        //rotate()
    } else if (e.keyCode === 39) {
        //moveRight()
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
        random = Math.floor(Math.random() * theShapes.length)
        current = theShapes[random][currentRotation]
        currentPosition = 4
        draw()
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


});
