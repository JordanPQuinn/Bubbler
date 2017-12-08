const Obstacle = require('./Obstacle.js');
const Bubble = require('./Bubble.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const carArrayRight = [];
const carArrayLeft = [];
const bubble = new Bubble(135.5, 465, 30, 30);

const resetButton = document.getElementById('reset-button');

let winCount = 0;
let level = 1;

const levelText = document.getElementById('level');


let gameStarted = false;

startUpScreen();

resetButton.addEventListener('click', function() {
    bubble.reset();
});

window.addEventListener('keyup', function(event) {
  bubble.move(event);
});

window.addEventListener('keyup', function(event) {
  if (event.key === " ") {
    gameStarted = true;
    startUpScreen();
    requestAnimationFrame(gameLoop);
  }
});

function makeObstacleArray(x = 0, y, w, h, img) {
  let array = [];

  for (var i = 0; i < 2; i++) {
    array.push(new Obstacle(x, y, w, h, img));
    x += 150;
  }

  return array;
}

function startUpScreen() {
  if(gameStarted === false) {
    canvas.style.backgroundImage = "url('images/start-screen.svg')";
  }
  else if (gameStarted === true) {
    canvas.style.backgroundImage = "url('images/background.svg')";
    resetButton.style.display = "block";
    levelText.style.display = "block";
  }
}



carArrayRight.push( 
  ...makeObstacleArray(0, 430, 30, 30, 'images/scissors.svg'), 
  ...makeObstacleArray(0, 360, 30, 30, 'images/ax.svg'),
  ...makeObstacleArray(0, 290, 30, 30, 'images/needle.svg'),
  ...makeObstacleArray(0, 185, 70, 30, 'images/wand.svg'),
  ...makeObstacleArray(0, 115, 70, 30, 'images/wand.svg')
);

carArrayLeft.push( 
  ...makeObstacleArray(canvas.width, 395, 30, 30, 'images/blade.svg'),
  ...makeObstacleArray(canvas.width, 325, 30, 30, 'images/star.svg'),
  ...makeObstacleArray(canvas.width, 220, 70, 30, 'images/bubble-pile.svg'),
  ...makeObstacleArray(canvas.width, 150, 70, 30, 'images/bubble-pile.svg'),
  ...makeObstacleArray(canvas.width, 80, 70, 30, 'images/bubble-pile.svg')
);

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  levelText.innerHTML = "Level: " + level;
  
  carArrayRight.forEach(function(car) {  
    car.draw(context).scrollRight();
    
    bubble.collisionDetectBottomHalf(car);
    bubble.collisionDetectTopHalf(car, 'right');

    car.resetRight(canvas.width);

    if (!bubble.alive) {

      let thisContext = bubble;

      setTimeout(function() {
        thisContext.respawn(context);
      }, 500)
    }
  });

  carArrayLeft.forEach(function(car) {  
    car.draw(context).scrollLeft();

    bubble.collisionDetectBottomHalf(car);
    bubble.collisionDetectTopHalf(car, 'left');

    car.resetLeft(canvas);

    if (!bubble.alive) {

      let thisContext = bubble;

      setTimeout(function() {
        thisContext.respawn(context);
      }, 500)
    }
  });
  bubble.draw(context)
  bubble.setScore(context);
  if (bubble.won === true) {
    bubble.won = false;
    winCount += 1;
    level = 2;
    bubble.win(context);
  }
  if (bubble.lives === 0) {
    bubble.gameOver(context)
  }
  if (winCount === 1) {
    setTimeout(function() {
      bubble.reset();
    }, 500)
    carArrayRight.push(...makeObstacleArray(Math.floor(Math.random() * 100) + 1, 430, 30, 30, 'images/scissors.svg'),
      ...makeObstacleArray(Math.floor(Math.random() * 100) + 1, 360, 30, 30, 'images/ax.svg'),
      ...makeObstacleArray(Math.floor(Math.random() * 100) + 1, 290, 30, 30, 'images/needle.svg'),
      );
    carArrayLeft.push(...makeObstacleArray(Math.floor(Math.random() * 100) + 1, 395, 30, 30, 'images/blade.svg'),
      ...makeObstacleArray(Math.floor(Math.random() * 100) + 1, 325, 30, 30, 'images/star.svg')    
    );
  }
  requestAnimationFrame(gameLoop);
}



