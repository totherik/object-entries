'use strict';

var test = require('tape');
var entries = require('../').objectEntries;


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