var assert = require('assert')
var semver = require('semver')
var reviver = require('./')
var fixtures = require('./fixtures')

/* global before, describe, it */

describe('reviver-buffer', function () {
  before(function () {
    assert(semver.gte(process.version, '0.11.0'), 'Bad Node.js/IO.js version. You need to use at least v0.11.')
  })

  fixtures.valid.forEach(function (f) {
    it('should convert ' + f.value, function () {
      // verify fixture is correct
      var b = new Buffer(f.value, f.type)
      assert.deepEqual(b.toJSON(), f.json)

      var b2 = JSON.parse(JSON.stringify(f.json), reviver)
      assert.strictEqual(b.toString('utf8'), b2.toString('utf8'))
      assert.strictEqual(b.toString('hex'), b2.toString('hex'))
    })
  })
})
