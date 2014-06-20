An ObjectIterator implementation.
---

Create an iterator for a given object. Note that the iterator will only use keys
present at the time of Iterator creation, so keys added after the iterator has
been created will not be present during iteration.

```javascript
var entries = require('object-entries');

var iter;
iter = entries({ "foo": "bar" });
iter.next(); // { value: ['foo', 'bar'], done: false }
iter.next(); // { value: undefined, done: true }
```

#### Properties

##### kind `String, *optional*` - Can be "key", "value", or "key+value"; defaults to `"key+value"`. Indicates the return
value desired, `{ value: "foo", done: false }`, `{ value: "bar", done: false }`, or `{ value: ["foo", "bar"], done: false }`
respectively.