'use strict';


function ToObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('can\'t convert ' + val + ' to object');
    }

    return Object(val);
}

module.exports = function entries(obj) {
    var keys, index, kind;

    obj = ToObject(obj);
    keys = Object.keys(obj); // own iterable properties only
    index = 0;
    kind = 'key+value';

    return {

        get kind() {
            return kind;
        },

        set kind(value) {
            kind = value;
        },

        next: function next() {
            var current;

            if (!obj) {
                return { value: undefined, done: true };
            }

            if (index >= keys.length) {
                obj = undefined;
                return next();
            }

            current = index;
            index += 1;

            switch (kind) {
                case 'key':
                    return { value: keys[current], done: false };

                case 'value':
                    return { value: obj[keys[current]], done: false };

                case 'key+value':
                    return { value: [ keys[current], obj[keys[current]] ], done: false };

                default:
                    throw new TypeError('Invalid ObjectIterationKind');
            }
        }
    };
};