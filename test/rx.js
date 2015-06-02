'use strict';

import test from 'tape';
import irecord from '../index.js';

test('.filter', (assert) => {
  assert.plan(1);

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
  assert.end();
});
