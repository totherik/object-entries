An Object Iterator implementation.
---

Create an iterator for a given object. Note that the iterator will only use keys
present at the time of Iterator creation, so keys added after the iterator has
been created will not be present during iteration.

```javascript
var entries = require('object-entries');

var iter;
iter = entries({ 'foo': 'bar' });
iter.next(); // { value: ['foo', 'bar'], done: false }
iter.next(); // { value: undefined, done: true }
```

#### Properties

##### `kind` (String, *optional*)
Can be `'key'`, `'value'`, or `'key+value'`; defaults to `'key+value'`. Indicates the return
value desired.

```javascript
var obj = {
    a: '1',
    b: '2',
    c: '3'
};

var iter = entries(obj);

// defaults to 'key+value'
iter.next(); // { value: ['a', '1'], done: false }

iter.kind = 'key';
iter.next(); // { value: 'b', done: false }

iter.kind = 'value';
iter.next(); // { value: '3', done: false }

// all done
iter.next(); // { value: undefined, done: true }

```