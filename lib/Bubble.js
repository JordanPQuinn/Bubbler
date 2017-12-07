var GamePiece = require('./GamePiece.js')

class Bubble extends GamePiece {
  constructor(x, y, height, width) {
    super(...arguments);
    this.alive = true;
    this.lives = 3;
    this.score = 0;
    this.image.src = 'images/bubble.svg';
    this.highestY = this.y;
    this.collided = false;
    this.floatCount = 0;
    this.collidedObject = null;
  }

  respawn(context) {
     if(this.lives !== 0) {
      this.alive = true;
      this.y = 465;
    }
    return this;
  }

  move(event) {
    this.collided = false;
    if (event.key === 'ArrowUp' && this.y > 0 + this.height) {
      this.y -= 35;
      if(this.y < this.highestY){
        this.highestY = this.y;
        this.score += 10;
      }
    }
    if (event.key === 'ArrowDown' && this.y < 475 - this.height + 5) {
      this.y += 35;
      this.collidedObject = null;
    } 
    if (event.key === 'ArrowLeft' && this.x > (0 + 20)) {
      this.x -= 20;
    }
    if (event.key === 'ArrowRight' && this.x < 275 - this.width) {
      this.x += 20;
    }
    this.win();
    return this;
  }

  draw(context) {
    this.dieIfNotFloating();
    context.drawImage(this.image, this.x, this.y, this.height, this.width)
    return this;
  }

  collisionDetectBottomHalf(obstacle) {
    if (this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x && 
      this.y < obstacle.y + obstacle.height &&
      this.height + this.y > obstacle.y && this.y > 250) {
        this.collided = true;
        this.collisionDie(obstacle);
        return this;
    }
  }

  collisionDetectTopHalf(obstacle, direction) {
    if (this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x && 
      this.y < obstacle.y + obstacle.height &&
      this.height + this.y > obstacle.y && this.y < 250) {
        this.collided = true;
        this.collidedObject = obstacle;
        this.floatDetect(obstacle, direction)
    }
  }

  collisionDie(obstacle) {
    if (this.collided === true) {
      this.die();
      this.collided = false;
    }
    return this;
  }

  dieIfNotFloating() {
    if(this.collided === false && this.y < 250) {
      this.die();
    }
    return this;
  }
  
  floatDetect(obstacle, direction) {
    if(this.collided === true) {
      this.float(direction);
      return this;
    }
  }

  float(direction, canvasWidth) {
    if (this.y < 250 && this.x > -20) {
      if(direction === 'left') {
        this.x -= .5;
      }
      else if(direction === 'right') {
        this.x += .5;    
      }
    }
    else {
      console.log('should die')
      this.die();
  }
}
  countLives(context) {
    context.fillText('Lives: ' + this.lives, 240, 272);
  }

  setScore(context) {
    context.font = '16px serif';
    context.fillStyle = 'white';
    context.fillText('Score: ' + this.score, 0, 272);
    if(this.y < this.highestY) {
        this.highestY = this.y;
        this.score += 10;
        context.fillText('Score: ' + this.score, 0, 272);
      }
    let highScore = JSON.parse(localStorage.getItem('high-score'));
    if(this.score > highScore) {
      console.log(this.score);
      localStorage.setItem('high-score', this.score)
    }
    this.countLives(context);
  }

  die() {    
    this.alive = false;
    this.collidedObject = null;
    this.y = 600;
    this.x = 140;
    this.lives--;
    return this;
  }

  win(context) {
    if (this.y < 80) {
      this.collided = true;
      this.won = true;
      this.x = 258.5;
      this.y = 10;
      context.font = '50px serif';
      context.fillStyle = 'white';
      context.fillText('YOU WON', 30, 50);
    }
  }

  gameOver(context) {
    this.y = 600;
    console.log('game over')
    context.font = '50px serif';
    context.fillStyle = 'white';
    context.fillText('GAME OVER', 4, 50);
  }
}

module.exports = Bubble;
