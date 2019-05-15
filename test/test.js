const assert = require('assert');
const liri = require('../liri.js')

describe('execute()', function () {

  it('should throw an error when the command is not present', function () {
    assert.throws(function () {
      liri.execute()
    }, Error);
  });

  describe("execute('concert-this')", function () {
    it('should throw an error when the artist name is not present', function () {
      assert.throws(function () {
        liri.execute('concert-this')
      }, Error);
    });
  })

  /*
  describe("execute('spotify-this-song')", function () {
    it('should throw an error when the song name is not present', function () {
      assert.throws(function () {
        liri.execute('spotify-this-song')
      }, Error);
    });
  })
  */

});