var Obstacle = require('./Obstacle.js');
var Frogger = require('./Frogger.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var obstacleArray = [];
var carArrayRight = [];
var carArrayLeft = [];

var frogger = new Frogger(140, 465, 30, 30);
var x = 0;
froggerImg = new Image();
froggerImg.src = 'images/frog.png';
console.log(frogger)

for (var i = 0; i < 2; i++) {
  carArrayRight.push(new Obstacle(x, 430, 30, 30));
  x += 150;
}

x = canvas.width;
for (var i = 0; i < 2; i++) {
  carArrayLeft.push(new Obstacle(x, 230, 30, 30));
  x += 150;
}

x = 0;
for (var i = 0; i < 2; i++) {
  carArrayRight.push(new Obstacle(x, 30, 30, 30));
  x += 150;
}

window.addEventListener('keyup', function(event) {
  frogger.draw(context, froggerImg).move(event);
});


function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  frogger.draw(context,froggerImg).move;
  carArrayRight.forEach(function(car) {  
    frogger.collisionDetect(car)
    car.draw(context).scrollRight();
    car.resetRight(canvas.width);
  });
  carArrayLeft.forEach(function(car) {  
    frogger.collisionDetect(car)
    car.draw(context).scrollLeft();
    car.resetLeft(canvas);
  });
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


