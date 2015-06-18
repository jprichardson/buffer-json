var assert = require('assert')
var semver = require('semver')
var bufferJson = require('./')
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

        var b2 = JSON.parse(JSON.stringify(f.json), bufferJson.reviver)
        assert.strictEqual(b.toString('utf8'), b2.toString('utf8'))
        assert.strictEqual(b.toString('hex'), b2.toString('hex'))
        assert.strictEqual(b.toString('base64'), b2.toString('base64'))

        var b3 = JSON.parse(JSON.stringify(f.json2), bufferJson.reviver)
        assert.strictEqual(b3.toString('utf8'), b2.toString('utf8'))
        assert.strictEqual(b3.toString('hex'), b2.toString('hex'))
        assert.strictEqual(b3.toString('base64'), b2.toString('base64'))
      })
    })
  })

  describe('replacer', function () {
    fixtures.valid.forEach(function (f) {
      it('should convert ' + f.utf8, function () {
        var b = new Buffer(f.utf8)
        assert.deepEqual(b.toJSON(), f.json)
        assert.notDeepEqual(b.toJSON(), f.json2)

        // with new replacer
        assert.notDeepEqual(JSON.stringify(b.toJSON()), JSON.stringify(f.json2))
        assert.deepEqual(JSON.stringify(b, bufferJson.replacer), JSON.stringify(f.json2))
      })
    })
  })
})
