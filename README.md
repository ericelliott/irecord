# irecord

An immutable object map that exposes an RxJS observable.

Great for React.

Written for the [Learn JavaScript with Eric Elliott](https://ericelliottjs.com/) online JavaScript course series.


## Wait, what is this thing?

Imagine a JavaScript object that just stores data. Now imagine that every time you change that object, the object emits a change event. Yeah, kindof like Backbone models, but different.


### How is it different?

When you change the value of a key, the previous value doesn't get erased. Instead, it gets added to a history. Every time you make a change, the new object state and the previous object state get emitted with the change event.

In other words, you can very easily compare the two objects if you need to see what changed. In fact, if you set a property to the same value as the previous value, no change event gets emitted at all.


### What's this RxJS thing?

Instead of subscribing to change events with `.on()`, you could use the RxJS `.subscribe()` method. Maybe later we'll add lots of other neat capabilities that RxJS makes possible.


### Why would I want to use this with React?

Pretty simple really, it makes it easy for your compenents to subscribe to changes in your store. Since it's backed by Immutable.js, you only render when something actually changes, which can save React the trouble of building a whole virtual DOM and diffing that against the actual DOM.

Why even start if you know nothing is different? irecord knows when React doesn't have any work to do so you only run `React.render()` when it does.


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

Here are the Rx Observable methods you can use with irecord instances.

### .subscribe()

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


### .filter()

```js
const original = {
  a: 'a',
  b: 'b'
};
const record = irecord(original);

record.filter(({value}) => {
  return value.toJS().c === 'again';
}).subscribe(({ value }) => {
  assert.equal(value.toJS().c, 'again',
    `should filter out changes that don't match the predicate`);
});

record.set('a', 'changed');
record.set('c', 'c');
record.set('c', 'again');
```