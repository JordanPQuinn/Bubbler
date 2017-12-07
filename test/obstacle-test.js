global.Image = class {};
const chai = require('chai');
const Obstacle = require('../lib/Obstacle.js');
const assert = chai.assert;

describe('Obstacle', function() {

  it('should return true', function() {
    assert.equal('true', 'true');
  })

  it.only('should be a constructor', function() {
    assert.isFunction(Obstacle);
  })

  it.only('should take parameters', function() {
    let newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');

    assert.equal(newObstacle.x, 10);
  })

  it.only('should be able to move right', function() {
    let newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');

    assert.equal(newObstacle.x, 10);
    newObstacle.scrollRight();
    assert.equal(newObstacle.x, 10.5);
  })

  it.only('should be able to move left', function() {
    let newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');

    assert.equal(newObstacle.x, 10);
    newObstacle.scrollLeft();
    assert.equal(newObstacle.x, 9.5);
  })

  it.only('should reset once it goes through the canvas', function() {
    let newObstacle = new Obstacle(200, 10, 30, 30, 'images/ax.svg');

    let canvasWidth = 185;
    
    assert.equal(newObstacle.x, 200);
    newObstacle.resetRight(canvasWidth);
    assert.equal(newObstacle.x, 0);
  })


})