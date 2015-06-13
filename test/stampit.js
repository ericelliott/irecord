'use strict';

import stampit from 'stampit';
import test from 'tape';
import irecord from '../index.js';

test('stamp composition with irecord', (assert) => {
  assert.plan(1);

  const record = irecord({
    a: 'a',
    b: 'b'
  });

  const stamp = stampit({
    methods: {
      countProps () {
        return Object.keys(this.toJS()).length;
      }
    }
  });

  const composedRecord = stampit.compose(
    record.stamp,
    stamp
  ).create();

  assert.equal(composedRecord.countProps(), 2,
    'should expose irecord methods');
});
