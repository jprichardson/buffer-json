buffer-json
===========

A JavaScript component to be used in conjunction with `JSON.parse` to restore
a `Buffer` JSON representation back to a `Buffer` instance. Can also be used
in conjunction with `JSON.stringify` to compact the array that `Buffer.prototype.toJSON()`
creates.


Note to Node v0.10 users!
-------------------------

The `replacer` function will not work for you. This is because in Node `v0.10`
the here's the output of the following:

** Node v0.10: **

```js
console.dir(JSON.stringify(new Buffer('hello')))
// => '[104,101,108,108,111]'
```

** Node v0.11, v0.12, IO.js: **

```js
console.dir(JSON.stringify(new Buffer('hello')))
// => '{"type":"Buffer","data":[104,101,108,108,111]}'
```

Why?
----

So why would you use this module? You would use it because you don't like serializing
your buffers to arrays.

```js
// without this module
console.dir(JSON.stringify(new Buffer('hello')))
// => '{"type":"Buffer","data":[104,101,108,108,111]}'

// with this module
var bufferJson = require('buffer-json')

console.dir(JSON.stringify(new Buffer('hello'), bufferJson.replacer))
// => '{"type":"Buffer","data":"base64:aGVsbG8="}'
```

As you can see, in most cases, `base64` encoding would be more efficient than arrays.


API
---

### reviver

Restores Buffer from JSON.


### replacer

Helps convert Buffer to JSON.


License
-------

MIT







