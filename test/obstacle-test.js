global.Image = class {};
const chai = require('chai');
const Obstacle = require('../lib/Obstacle.js');
const assert = chai.assert;

describe('Obstacle', function() {

  it('should return true', function() {
    assert.equal('true', 'true');
  })

  it('should be a constructor', function() {
    assert.isFunction(Obstacle);
  })

  it('should take parameters', function() {
    newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');
    assert.equal(newObstacle.x, 10);
  })

  it('should be able to move right', function() {
    newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');
    assert.equal(newObstacle.x, 10);
    newObstacle.scrollRight();
    assert.equal(newObstacle.x, 10.5);
  })

  it('should be able to move left', function() {
    newObstacle = new Obstacle(10, 10, 30, 30, 'images/ax.svg');
    assert.equal(newObstacle.x, 10);
    newObstacle.scrollLeft();
    assert.equal(newObstacle.x, 9.5);
  })

  it('should reset once the right obstacles go through the canvas', function() {
    newObstacle = new Obstacle(200, 10, 30, 30, 'images/ax.svg')
    canvasWidth = 185;
    assert.equal(newObstacle.x, 200);
    newObstacle.resetRight(canvasWidth);
    assert.equal(newObstacle.x, 0);
  })

  it('should reset once the left obstacles go through the canvas', function() {
    newObstacle = new Obstacle(-30, 10, 30, 30, 'images/ax.svg')
    canvas = {};
    canvas.width = 200;
    assert.equal(newObstacle.x, -30);
    newObstacle.resetLeft(canvas);
    assert.equal(newObstacle.x, 200);
  })


})