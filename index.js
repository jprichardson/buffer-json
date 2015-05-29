
function bufferReviver (key, val) {
  if (val.type !== 'Buffer') return val
  return new Buffer(val.data)
}

module.exports = bufferReviver
