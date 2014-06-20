'use strict';

;(function (exports) {
    'use strict';

    function ToObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('can\'t convert ' + val + ' to object');
        }

        return Object(val);
    }

    exports.objectEntries = function (obj) {
        var keys, index, kind;

        obj = ToObject(obj);
        keys = Object.keys(obj); // own iterable only
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
                if (!obj) {
                    return { value: undefined, done: true };
                }

                if (index >= keys.length) {
                    obj = undefined;
                    return next();
                }

                switch (kind) {
                    case 'key':
                        return { value: keys[index], done: false };
                        break;

                    case 'value':
                        return { value: obj[keys[index]], done: false };
                        break;

                    case 'key+value':
                        return { value: [ keys[index], obj[keys[index]] ], done: false };
                        break;

                    default:
                        throw new TypeError('Invalid ObjectIterationKind');
                }
            }
        };
    };

}(typeof exports === 'undefined' ? this : exports));