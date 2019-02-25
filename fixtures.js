module.exports = {
  notBuffers: { foo: 'bar', baz: 5, removeMe: undefined, boing: null },
  valid: [
    {
      obj: Buffer.from('hello'),
      str: '{"type":"Buffer","data":"base64:aGVsbG8="}'
    },
    {
      obj: Buffer.from('☃ ★ ☺ ♤ ✓ ♛ ∭'),
      str: '{"type":"Buffer","data":"base64:4piDIOKYhSDimLog4pmkIOKckyDimZsg4oit"}'
    },
    { obj: Buffer.from(''), str: '{"type":"Buffer","data":""}' },
    {
      obj: Buffer.from('🌈'),
      str: '{"type":"Buffer","data":"base64:8J+MiA=="}'
    },
    {
      obj: { buf: Buffer.from('🌈'), test: 'yep' },
      str: '{"buf":{"type":"Buffer","data":"base64:8J+MiA=="},"test":"yep"}'
    }
  ],
  utf8: [
    {
      obj: { foo: Buffer.from('🌈') },
      str: '{"foo":{"type":"Buffer","data":"🌈"}}'
    }
  ],
  invalid: [
    { type: 'Buffer' },
    { type: 'Buffer', data: 500 },
    { type: 'Buffer', whatever: [123, 124, 125] }
  ]
}
