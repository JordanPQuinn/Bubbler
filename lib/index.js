const Obstacle = require('./Obstacle.js');
const Bubble = require('./Bubble.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const carArrayRight = [];
const carArrayLeft = [];
const bubble = new Bubble(140, 465, 30, 30);

let gameStarted = false;

window.addEventListener('keyup', function(event) {
  bubble.move(event);
});

window.addEventListener('keyup', function(event) {
  if(event.key === " ") {
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
  else {
    canvas.style.backgroundImage = "url('images/background.svg')"
  }
}

carArrayRight.push( 
  ...makeObstacleArray(0, 430, 30, 30, 'images/scissors.svg'), 
  ...makeObstacleArray(0, 360, 30, 30, 'images/ax.svg'),
  ...makeObstacleArray(0, 290, 30, 30, 'images/needle.svg'),
  ...makeObstacleArray(0, 185, 70, 30, 'images/wand.svg'),
  ...makeObstacleArray(0, 115, 70, 30, 'images/wand.svg'),
);

carArrayLeft.push( ...makeObstacleArray(canvas.width, 395, 30, 30, 'images/blade.svg') );
carArrayLeft.push( ...makeObstacleArray(canvas.width, 325, 30, 30, 'images/star.svg') );
carArrayLeft.push( ...makeObstacleArray(canvas.width, 220, 70, 30, 'images/bubble-pile.svg') );
carArrayLeft.push( ...makeObstacleArray(canvas.width, 150, 70, 30, 'images/bubble-pile.svg') );
carArrayLeft.push( ...makeObstacleArray(canvas.width, 80, 70, 30, 'images/bubble-pile.svg') );

startUpScreen();

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  carArrayRight.forEach(function(car) {  
    car.draw(context).scrollRight();
    
    bubble.collisionDetectBottomHalf(car);
    bubble.collisionDetectTopHalf(car, 'right');

    car.resetRight(canvas.width);

    if(!bubble.alive) {
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

    if(!bubble.alive) {
      var thisContext = bubble;
      setTimeout(function() {
        thisContext.respawn(context);
      }, 500)
    }
  });
  bubble.draw(context)
  bubble.setScore(context);
  if(bubble.won = true) {
    bubble.win(context);
  }
  if(bubble.lives === 0) {
    bubble.gameOver(context)
  }
  requestAnimationFrame(gameLoop);
}



