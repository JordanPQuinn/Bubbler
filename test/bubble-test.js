global.Image = class {}
const chai = require('chai');
const Bubble = require('../lib/Bubble.js');
const assert = chai.assert;


describe('Bubble', function() {
  it('should return true', function() {
    assert.equal('true', 'true')
  });

  it('should be a constructor', function() {
    assert.isFunction(Bubble)
  })
  
  it('should take arguments', function() {
    newBubble = new Bubble(10, 10, 30, 30)
    assert.equal(newBubble.x, 10)
  })

  it('should respawn if there are lives left', function() {
    newBubble = new Bubble(10, 10, 30, 30)
    newBubble.lives = 3;
    newBubble.respawn();
    assert.equal(newBubble.alive, true)
  })

  it('should move up if the up arrow is pressed', function() {
    newBubble = new Bubble(10, 10, 30, 30)
    newBubble.y = 100;
    let event = {};
    event.key = 'ArrowUp'
    newBubble.move(event);
    assert.equal(newBubble.y, 65)
  })

  it('should float in the top half of the game', function() {
    newBubble = new Bubble(10, 10, 30, 30)
    
  })
})