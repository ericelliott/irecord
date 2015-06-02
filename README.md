# irecord

An immutable object map that exposes an RxJS observable.

Great for React.

## Install

```
$ npm install --save irecord
```


## Use / API

```js
import irecord from 'irecord';


const record = irecord({
  a: 'a',
  b: 'b'
});

// record.get('a') // => 'a'
  assert.equal(record.get('a'), 'a',
    '.get() should return a value for the specified key.');



record.set('c', 'c');

  assert.equal(record.get('c'), 'c',
    '.set() should set the value for the specified key');



record.remove('b');

  assert.equal(record.get('b'), undefined,
    '.remove() should remove the key passed in');


// record.toJS(); // => [Object object]
//   get record as regular JS object.
const obj2 = record.toJS();

  assert.deepEqual(record, obj2,
    '.toJS() should return a JS object');
```


## Events

```js
const original = {
  a: 'a',
  b: 'b'
};
const record = irecord(original);

// Listen for change events - get current and previous values.
record.on('change', ({ value, previous }) => {
  assert.pass('should emit change events.');

  assert.deepEqual(value.toJS(), {
    a: 'a',
    b: 'b',
    c: 'c'
  }, 'new value should be passed.');

  assert.deepEqual(previous.toJS(), original,
    'previous value should be passed.');
});

record.set('c', 'c');
```


## Rx Observable

```
record.subscribe(
  ({ value, previous }) => {
    assert.pass('should emit change events.');

    assert.deepEqual(value.toJS(), {
      a: 'a',
      b: 'b',
      c: 'c'
    }, 'new value should be passed.');

    assert.deepEqual(previous.toJS(), original,
      'previous value should be passed.');

  },
  (err) => { assert.fail('err: ' + err); },
  () => { assert.pass('complete'); }
);
```

