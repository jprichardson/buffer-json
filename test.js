const test = require('tape')

const BJSON = require('.')
const fixtures = require('./fixtures')

test("don't touch anything other than buffers", t => {
  t.deepEquals(
    BJSON.stringify(fixtures.notBuffers),
    JSON.stringify(fixtures.notBuffers)
  )
  t.end()
})

test('buffers encoded/decoded as expected', t => {
  for (const test of fixtures.valid) {
    t.deepEquals(BJSON.stringify(test.obj), test.str)
    t.deepEquals(BJSON.parse(test.str), test.obj)
    t.deepEquals(BJSON.parse(BJSON.stringify(test.obj)), test.obj)
    t.deepEquals(BJSON.parse(JSON.stringify(test.obj)), test.obj)
  }
  t.end()
})

test('utf8', t => {
  for (const test of fixtures.utf8) {
    t.deepEquals(BJSON.parse(test.str), test.obj)
  }
  t.end()
})

test('not actually a buffer', t => {
  for (const obj of fixtures.invalid) {
    const str = JSON.stringify(obj)
    t.deepEquals(BJSON.parse(str), obj)
  }
  t.end()
})
