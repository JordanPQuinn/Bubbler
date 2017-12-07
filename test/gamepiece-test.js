global.Image = class {};
const chai = require('chai');
const GamePiece = require('../lib/GamePiece.js');
const assert = chai.assert;

describe('GamePiece', function() {
  it('should return true', function() {
    assert.equal('true', 'true');
  })

  it('should be a constructor', function() {
    assert.isFunction(GamePiece);
  })

  it('should take parameters', function() {
    let newGamePiece = new GamePiece(10, 10, 30, 30, 'images/ax.svg');
    
    assert.equal(newGamePiece.x, 10);
  })

})