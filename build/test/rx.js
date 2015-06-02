'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

(0, _tape2['default'])('.filter', function (assert) {
  assert.plan(1);

  var original = {
    a: 'a',
    b: 'b'
  };
  var record = (0, _indexJs2['default'])(original);

  record.filter(function (_ref) {
    var value = _ref.value;

    return value.toJS().c === 'again';
  }).subscribe(function (_ref2) {
    var value = _ref2.value;

    assert.equal(value.toJS().c, 'again', 'should filter out changes that don\'t match the predicate');
  });

  record.set('a', 'changed');
  record.set('c', 'c');
  record.set('c', 'again');
  assert.end();
});