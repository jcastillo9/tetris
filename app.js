document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const squares = Array.from(document.querySelectorAll(".grid div"));
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

  const currentPosition = 4
  const currentRotation =0

//randomly select a shape and first position
  const random = Math.floor(Math.random()*theShapes.length)
  const current = theShapes[random][currentRotation]

//draw the shape 
function draw() {
    current.forEach(index => {
        squares[currentPosition +index].classList.add('tetromino')
    })
}

//undraw the shape
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove['tetromino']
    })
}



});
