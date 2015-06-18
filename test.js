var assert = require('assert')
var semver = require('semver')
var reviver = require('./')
var fixtures = require('./fixtures')

/* global before, describe, it */

describe('buffer-json', function () {
  before(function () {
    assert(semver.gte(process.version, '0.11.0'), 'Bad Node.js/IO.js version. You need to use at least v0.11.')
  })

  describe('reviver()', function () {
    fixtures.valid.forEach(function (f) {
      it('should convert ' + f.utf8, function () {
        // verify fixture is correct
        var b = new Buffer(f.utf8)
        assert.deepEqual(b.toJSON(), f.json)

        var b2 = JSON.parse(JSON.stringify(f.json), reviver)
        assert.strictEqual(b.toString('utf8'), b2.toString('utf8'))
        assert.strictEqual(b.toString('hex'), b2.toString('hex'))
        assert.strictEqual(b.toString('base64'), b2.toString('base64'))

        var b3 = JSON.parse(JSON.stringify(f.json2), reviver)
        assert.strictEqual(b3.toString('utf8'), b2.toString('utf8'))
        assert.strictEqual(b3.toString('hex'), b2.toString('hex'))
        assert.strictEqual(b3.toString('base64'), b2.toString('base64'))
      })
    })
  })
})
