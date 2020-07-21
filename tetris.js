console.log("it works!!");

const grid = document.querySelector(".grid");
let allDivs = Array.from(grid.querySelectorAll("div"));
// console.log(allDivs);
const button = document.querySelector("#button");
// console.log(button);
const harderButton = document.querySelector("#harder");
const hardestButton = document.querySelector("#hardest");
const scoreCard = document.querySelector(".score");
const cvImage = document.querySelector(".img");
const smLinks = document.querySelector(".smlinks");
const hide = document.querySelector("#hide");
const git = document.querySelector("#git");
const see = document.querySelector("#see");
const linkedIn = document.querySelector("#link");

see.addEventListener("click", function () {
  hide.classList.add("hide");
  grid.style.display = "none";
  cvImage.classList.add("show");
});
git.addEventListener("click", function () {
  window.location = "https://github.com/james-webdev";
});

linkedIn.addEventListener("click", function () {
  window.location = "//www.linkedin.com/in/jamesroe-dev/";
});

console.log(hide);
console.log(scoreCard);
const width = 10;
let timerId;
let score = 0;

const lTetromino = [
  [1, 11, 21, 2],
  [10, 11, 12, 22],
  [1, 11, 21, 20],
  [10, 20, 21, 22],
];
// console.log(lTetromino[0]);
const zTetromino = [
  [0, 10, 11, 21],
  [11, 12, 20, 21],
  [0, 10, 11, 21],
  [11, 12, 20, 21],
];

const tTetromino = [
  [1, 10, 11, 12],
  [1, 11, 12, 21],
  [10, 11, 12, 21],
  [1, 10, 11, 21],
];

const oTetromino = [
  [0, 1, 10, 11],
  [0, 1, 10, 11],
  [0, 1, 10, 11],
  [0, 1, 10, 11],
];

const iTetromino = [
  [1, 11, 21, 31],
  [10, 11, 12, 13],
  [1, 11, 21, 31],
  [10, 11, 12, 13],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

// console.log(current);

//randomly select a tet/
const tetLength = theTetrominoes.length;
let random = Math.floor(Math.random() * tetLength);
// console.log(random);
let currentPosition = 4;
let currentRotation = 0;
let randomTetRotArray = theTetrominoes[random][currentRotation];
console.log(randomTetRotArray);

function draw() {
  randomTetRotArray.forEach((gridIndex) => {
    // console.log(div);
    allDivs[currentPosition + gridIndex].classList.add("tetromino");
  });
}

function unDraw() {
  randomTetRotArray.forEach((gridIndex) => {
    // console.log(div);
    allDivs[currentPosition + gridIndex].classList.remove("tetromino");
  });
}

//move the monkey down//

timerId = setInterval(moveDown, 1000);

function moveDown() {
  unDraw();
  currentPosition += width;
  draw();
  stop();
}

// add pause button
// button.addEventListener("click", () => {
//   if (timerId) {
//     clearInterval(timerId);
//     timerId = null;
//   } else {
//     draw();
//     timerId = setInterval(moveDown, 1000);
//   }
// });

// add difficulty buttons//

harderButton.addEventListener("click", () => {
  if (timerId) {
    timerId = setInterval(moveDown, 700);
  }
});

// hardestButton.addEventListener("click", () => {
//   if (timerId) {
//     timerId = setInterval(moveDown, 200);
//   }
// });

//stop at bottom function
function stop() {
  if (
    randomTetRotArray.some((gridIndex) =>
      allDivs[currentPosition + gridIndex + width].classList.contains("taken")
    )
  ) {
    randomTetRotArray.forEach((gridIndex) =>
      allDivs[currentPosition + gridIndex].classList.add("taken")
    );
    //start a new tetromino falling
    random = Math.floor(Math.random() * tetLength);
    randomTetRotArray = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    removeLine();
    gameOver();
  }
}

//move the tetromino left, unless is at the edge
function moveLeft() {
  unDraw();
  const isAtLeftEdge = randomTetRotArray.some(
    (divIndex) => (currentPosition + divIndex) % width === 0
  );
  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    randomTetRotArray.some((divIndex) =>
      allDivs[currentPosition + divIndex].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

//move the tetromino right, unless is at the edge
function moveRight() {
  unDraw();
  const isAtRightEdge = randomTetRotArray.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    randomTetRotArray.some((index) =>
      allDivs[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

//rotate the tetromino
function rotate() {
  unDraw();
  currentRotation++;
  if (currentRotation === randomTetRotArray.length) {
    //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0;
  }
  randomTetRotArray = theTetrominoes[random][currentRotation];
  checkRotatedPosition();
  draw();
}

//touch for mobile//

function startup() {
  const body = document.querySelector("body");
  console.log(body);
  body.addEventListener("touchstart", chooseSide);
}

document.addEventListener("DOMContentLoaded", startup);

function chooseSide(e) {
  // console.log(e);
  e.preventDefault();
  const body = document.querySelector("body");
  const touchObject = e.changedTouches[0];
  const { screenX, screenY } = touchObject;
  console.log(screenY, screenX);
  const { clientHeight, clientWidth } = body;
  console.log(clientHeight, clientWidth);

  if (screenX > clientWidth / 2 && screenY < clientHeight / 2) {
    moveDown();
    console.log("moving down");
  } else if (screenY < clientHeight / 2 && screenX < clientWidth / 2) {
    rotate();
    console.log("rotating");
    // } else if (screenX > clientWidth / 2 && screenY < clientHeight / 2) {
    //   moveDown();
    //   console.log("moving down");
  } else if (screenX < clientWidth / 2 && screenY > clientHeight / 2) {
    moveLeft();
    console.log("moving left");
  } else if (screenX > clientWidth / 2 && screenY > clientHeight / 2) {
    moveRight();
    console.log("moving right");
  }

  // const rotateMob = document.querySelector(".mobilerotate")
  // rotateMob.addEventListener("touchstart", function(){
  // rotateMob.style.display("flex")
  //   rotate();
  // console.log("rotating");
  //   })
  // } else if (screenY < clientHeight / 2) {
  //   rotate();
  //   console.log("rotating");
  // }
}

//assign functions to keyCodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
    console.log("moving left");
  } else if (e.keyCode === 38) {
    rotate();
    console.log("moving about");
  } else if (e.keyCode === 39) {
    moveRight();
    console.log("moving right");
  } else if (e.keyCode === 40) {
    moveDown();
    console.log("moving down");
  }
}
document.addEventListener("keydown", control);

//SWITCH//
// function control(e) {
//   switch ((e.keyCode) {
//     case "37":
//       moveLeft();
//       console.log("moving left");
//       break;
//     case "38":
//       rotate();
//       console.log("moving about");
//       break;
//     case "39":
//       moveRight();
//       console.log("moving right");
//       break;
//     case "40":
//       moveDown();
//       console.log("moving down");
//       break;
//     default:
//       console.log("that is not a valid move");
//       break;
//   }
// }
// document.addEventListener("keydown", control);

///FIX ROTATION OF TETROMINOS A THE EDGE
function isAtRight() {
  return randomTetRotArray.some(
    (index) => (currentPosition + index + 1) % width === 0
  );
}

function isAtLeft() {
  return randomTetRotArray.some(
    (index) => (currentPosition + index) % width === 0
  );
}

function checkRotatedPosition(P) {
  P = P || currentPosition; //get current position.  Then, check if the piece is near the left side.
  if ((P + 1) % width < 4) {
    //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
    if (isAtRight()) {
      //use actual position to check if it's flipped over to right side
      currentPosition += 1; //if so, add one to wrap it back around
      checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
    }
  } else if (P % width > 5) {
    if (isAtLeft()) {
      currentPosition -= 1;
      checkRotatedPosition(P);
    }
  }
}

//add score and remove line
function removeLine() {
  for (let i = 0; i < 199; i += width) {
    // console.log(i);
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    // console.log(row);
    if (row.every((index) => allDivs[index].classList.contains("taken"))) {
      score += 10;
      scoreCard.innerHTML = score;
      if (score >= 50) {
        // alert("show CV");
        // clearInterval(timerId);
        hide.classList.add("hide");
        cvImage.classList.add("show");
        // smLinks.classList.add("show");
        grid.style.display = "none";
        // smLinks.classList.add("show");
        document.removeEventListener("keydown", control);
        // harderButton.removeEventListener("click", () => {});
      }
      row.forEach((index) => {
        allDivs[index].classList.remove("taken");
        allDivs[index].classList.remove("tetromino");
      });
      const squaresRemoved = allDivs.splice(i, width);
      // console.log(squaresRemoved);
      allDivs = squaresRemoved.concat(allDivs);
      allDivs.forEach((cell) => grid.appendChild(cell));
    }
  }
}

//clear board at end//

function gameOver() {
  if (
    randomTetRotArray.some((index) =>
      allDivs[currentPosition + index].classList.contains("taken")
    )
  ) {
    clearInterval(timerId);
    // scoreCard.innerHTML = "GAME OVER";
    allDivs.forEach((div) => {
      div.classList.remove("tetromino");
    });
    document.removeEventListener("keydown", control);
    window.location.reload();
  }
}
