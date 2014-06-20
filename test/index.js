'use strict';

var test = require('tape');
var entries = require('../');


test('types', function (t) {

    t.throws(function () {
        entries(null);
    });

    t.throws(function () {
        entries(undefined);
    });

    t.doesNotThrow(function () {
        entries({});
    });

    t.doesNotThrow(function () {
        entries([]);
    });

    t.doesNotThrow(function () {
        entries('');
    });

    t.doesNotThrow(function () {
        entries('foo');
    });

    t.doesNotThrow(function () {
        entries(0);
    });

    t.doesNotThrow(function () {
        entries(1);
    });

    t.doesNotThrow(function () {
        entries(true);
    });

    t.doesNotThrow(function () {
        entries(false);
    });

    t.doesNotThrow(function () {
        entries(new Date());
    });

    t.doesNotThrow(function () {
        entries(Infinity);
    });

    t.doesNotThrow(function () {
        entries(NaN);
    });

    t.end();

});


test('kind', function (t) {

    t.test('key', function () {
        var obj, iter, current;

        obj = { a: '1', b: '2', c: '3' };
        iter = entries(obj);
        iter.kind = 'key';

        t.equal(typeof iter, 'object');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(typeof current.value === 'string');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('value', function (t) {
        var obj, iter, current;

        obj = { a: 1, b: 2, c: 3 };
        iter = entries(obj);
        iter.kind = 'value';

        t.equal(typeof iter, 'object');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(typeof current.value === 'number');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('key+value', function (t) {
        var obj, iter, current;

        obj = { a: 1, b: 2, c: 3 };
        iter = entries(obj);

        t.ok(iter.kind === 'key+value');
        t.equal(typeof iter, 'object');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(Array.isArray(current.value));
            t.ok(typeof current.value[0] === 'string');
            t.ok(typeof current.value[1] === 'number');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('other', function (t) {
        var obj, iter;

        obj = { a: 1, b: 2, c: 3 };
        iter = entries(obj);
        iter.kind = '';

        t.equal(typeof iter, 'object');
        t.equal(typeof iter.next, 'function');

        t.throws(function () {
            iter.next();
        });
        t.end();
    });

});

test('iteration complete.', function (t) {
    var obj, iter, current;

    obj = { a: 1, b: 2, c: 3 };
    iter = entries(obj);

    t.equal(typeof iter, 'object');
    t.equal(typeof iter.next, 'function');

    while ((current = iter.next()) && !current.done) {
        t.ok(current);
        t.ok(typeof current.value[0] === 'string');
        t.ok(typeof current.value[1] === 'number');
        t.ok(!current.done);
    }

    current = iter.next();
    t.ok(typeof current.value === 'undefined');
    t.ok(current.done);

    t.end();
});