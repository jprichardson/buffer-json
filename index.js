
function bufferReviver (key, val) {
  if (val.type !== 'Buffer') return val
  if (Array.isArray(val.data)) {
    return new Buffer(val.data)
  } else if (typeof val.data === 'string') {
    if (!val.data) return new Buffer('')
    var pos = val.data.indexOf(':')
    // assume maybe utf8?
    if (pos <= 0) return new Buffer(val.data)
    var type = val.data.slice(0, pos)
    // only support base64 for now
    switch (type) {
      case 'base64': return new Buffer(val.data.slice(pos + 1), 'base64')
    }
  } else {
    throw new Error('buffer-json.reviver: unknown Buffer type')
  }
}

module.exports = bufferReviver
