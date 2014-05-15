'use strict';

var test = require('tap').test;
var pre_gyp_find = require('../../');

// Note: test is run beside package.json file since that is the
// location where this module is meant to be used from
test('Can find correct .node module', function(t) {
    try {
        // should throw because we are providing a fake .node binary
        var binding = pre_gyp_find('app1');
    } catch (err) {
        t.ok(err.message.indexOf('app1.node, 1): no suitable image found') > -1);
    }
    t.end();
});
