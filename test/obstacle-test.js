global.Image = class {}
const chai = require('chai');
const Obstacle = require('../lib/Obstacle.js');
const assert = chai.assert;

describe('Obstacle', function() {

  it('should return true', function() {
    assert.equal('true', 'true')
  })

  it.only('should be a constructor', function() {
    assert.isFunction(Obstacle)
  })

  it.only('should take parameters', function() {
    newObstacle = new Obstacle(10)
  })

})