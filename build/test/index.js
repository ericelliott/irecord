'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

var _rx = require('./rx');

var _rx2 = _interopRequireDefault(_rx);

(0, _tape2['default'])('immutable', function (assert) {
  var original = {
    a: 'a',
    b: 'b'
  };
  var record = (0, _indexJs2['default'])(original);

  record.set('c', 'c');

  assert.deepEqual(original, {
    a: 'a',
    b: 'b'
  }, 'should not mutate original');

  assert.end();
});

(0, _tape2['default'])('change events', function (assert) {
  assert.plan(3);

  var original = {
    a: 'a',
    b: 'b'
  };
  var record = (0, _indexJs2['default'])(original);

  record.on('change', function (_ref) {
    var value = _ref.value;
    var previous = _ref.previous;

    assert.pass('should emit change events.');

    assert.deepEqual(value.toJS(), {
      a: 'a',
      b: 'b',
      c: 'c'
    }, 'new value should be passed.');

    assert.deepEqual(previous.toJS(), original, 'previous value should be passed.');
  });

  record.set('c', 'c');
});

(0, _tape2['default'])('.subscribe', function (assert) {
  assert.plan(3);

  var original = {
    a: 'a',
    b: 'b'
  };
  var record = (0, _indexJs2['default'])(original);

  record.subscribe(function (_ref2) {
    var value = _ref2.value;
    var previous = _ref2.previous;

    assert.pass('should emit change events.');

    assert.deepEqual(value.toJS(), {
      a: 'a',
      b: 'b',
      c: 'c'
    }, 'new value should be passed.');

    assert.deepEqual(previous.toJS(), original, 'previous value should be passed.');
  }, function (err) {
    assert.fail('err: ' + err);
  }, function () {
    assert.pass('complete');
  });

  record.set('c', 'c');
});

(0, _tape2['default'])('.get()', function (assert) {
  var record = (0, _indexJs2['default'])({
    a: 'a',
    b: 'b'
  });

  assert.equal(record.get('a'), 'a', '.get() should return a value for the specified key.');

  assert.end();
});

(0, _tape2['default'])('.set()', function (assert) {
  var record = (0, _indexJs2['default'])({
    a: 'a',
    b: 'b'
  });

  record.set('c', 'c');

  assert.equal(record.get('c'), 'c', '.set() should set the value for the specified key');

  assert.end();
});

(0, _tape2['default'])('.set() & .get() deep', function (assert) {
  var record = (0, _indexJs2['default'])({});
  record.set('a.b.c', 'val');

  assert.deepEqual(record.get('a.b.c'), 'val', 'passing \'a.b.c\' as the key should set deep in the record.');

  assert.end();
});

(0, _tape2['default'])('.toJS', function (assert) {
  var obj = {
    a: 'a',
    b: 'b'
  };

  var record = (0, _indexJs2['default'])(obj);

  var obj2 = record.toJS();

  assert.deepEqual(obj, obj2, '.toJS() should return a JS object');

  assert.end();
});

(0, _tape2['default'])('.remove()', function (assert) {
  var record = (0, _indexJs2['default'])({
    a: 'a',
    b: 'b'
  });

  record.remove('b');

  assert.equal(record.get('b'), undefined, '.remove() should remove the key passed in');

  assert.end();
});