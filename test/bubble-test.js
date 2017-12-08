global.Image = class {}
const chai = require('chai');
const Bubble = require('../lib/Bubble.js');
const assert = chai.assert;


describe('Bubble', function() {
  it('should return true', function() {
    assert.equal('true', 'true');
  });

  it('should be a constructor', function() {
    assert.isFunction(Bubble);
  })
  
  it('should take arguments', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    assert.equal(newBubble.x, 10);
  })

  it('should respawn if there are lives left', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.lives = 3;
    newBubble.respawn();

    assert.equal(newBubble.alive, true);
  })

  it('should move up if the up arrow is pressed', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.y = 100;

    let event = {};

    event.key = 'ArrowUp';
    newBubble.move(event);

    assert.equal(newBubble.y, 65);
  })

  it('should move down if the down arrow is pressed', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.y = 100;

    let event = {};

    event.key = 'ArrowDown';
    newBubble.move(event);

    assert.equal(newBubble.y, 135);
  })

  it('should move right if the right arrow is pressed', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.x = 100;

    let event = {};

    event.key = 'ArrowRight';
    newBubble.move(event);

    assert.equal(newBubble.x, 120);
  })

  it('should move left if the left arrow is pressed', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.x = 100;

    let event = {};

    event.key = 'ArrowLeft';
    newBubble.move(event);

    assert.equal(newBubble.x, 80);
  })

  it('should not be collided by default', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    assert.equal(newBubble.collided, false);
  })


  it('should lose a life when colliding with obstacles in the lower half', function() {
    let newBubble = new Bubble(10, 260, 30, 30);

    newBubble.lives = 3;

    let obstacle = {};

    obstacle.x = 10;
    obstacle.y = 260;
    obstacle.width = 30;
    obstacle.height = 30;
  
    newBubble.collisionDetectBottomHalf(obstacle);
    assert.equal(newBubble.lives, 2);
  })
                                                                                                                                                                                                                                                                                                                                                                                                                                          
  it('should not lose a life when colliding with obstacle in the upper half', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.lives = 2;

    let obstacle = {};

    obstacle.x = 10;
    obstacle.y = 10;
    obstacle.width = 30;                                           
    obstacle.height = 30;
  
    newBubble.collisionDetectTopHalf(obstacle, 'left');
    assert.equal(newBubble.lives, 2);
  })

  it('should lose a life when it dies', function() {
    let newBubble = new Bubble(10, 10, 30, 30);

    newBubble.lives = 3;
    newBubble.die();

    assert.equal(newBubble.lives, 2)
  })
})