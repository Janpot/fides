# fides

Promise utilities.

Collection of utilities to help with promise handling. Intended to be very lightweight.

[![Build Status](https://travis-ci.org/Janpot/fides.svg?branch=master)](https://travis-ci.org/Janpot/fides)

## API

### `fides.fromCallback(Function fn) -> Promise`

Runs a function that takes a callback and returns the callback result as a promise.

Example:

```js
var fides = require('fides');
var fs = require('fs');

fides.fromCallback(cb => fs.readFile('...', callback))
  .then(content => console.log(content));
```

### `fides.try(Function fn) -> Promise`

Runs a function that may either throw or return a value or a promise.
Returns a promise with the result of that function.

Example:

```js
var fides = require('fides');

fides.try(() => {
  switch (behavior) {
    case 'sync value':  return 5;
    case 'async value': return Promise.resolve(5);
    case 'sync error':  throw new Error('error');
    case 'async error': return Promise.reject(new Error('error'));
  }
})
  .then(result => console.log(result));
```

### `fides.delay(number time, [Any value]) -> Promise`

Returns a promise that resolves with an optional `value` after a certain `time` has passed.
`value` can be a promise as well.

```js
var fides = require('fides');

fides.delay(1000, 'value')
  .then(value => console.log('after 1 second: %s', value));
```
