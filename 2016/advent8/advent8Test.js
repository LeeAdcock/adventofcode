#!/usr/bin/env node

var advent8 = require('./advent8');
var assert = require('unit.js').assert;

// Examples
advent8.init(7, 3);
advent8.rect(3, 2);
assert.deepEqual([
        [1,1,1,0,0,0,0],
        [1,1,1,0,0,0,0],
        [0,0,0,0,0,0,0]
    ], advent8.getScreen());
advent8.rotateColumn(1, 1);
assert.deepEqual([
        [1,0,1,0,0,0,0],
        [1,1,1,0,0,0,0],
        [0,1,0,0,0,0,0]
    ], advent8.getScreen());
advent8.rotateRow(0, 4);
assert.deepEqual([
        [0,0,0,0,1,0,1],
        [1,1,1,0,0,0,0],
        [0,1,0,0,0,0,0]
    ], advent8.getScreen());
advent8.rotateColumn(1, 1);
assert.deepEqual([
        [0,1,0,0,1,0,1],
        [1,0,1,0,0,0,0],
        [0,1,0,0,0,0,0]
    ], advent8.getScreen());

// Large data set
require('fs').readFile("input.data", 'utf8', function(err, data) {

    advent8.init(50, 6);
    data.split(/\n/g).forEach(function(value) {
        advent8.execute(value);
    });
    assert.equal(116, advent8.getActivatedCount());

    // Spells 'UPOJFLBOEZ'
    assert.deepEqual(
        [
            [1,0,0,1,0,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,1,1,1,1,0],
            [1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,0],
            [1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0],
            [1,0,0,1,0,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
            [1,0,0,1,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
            [0,1,1,0,0,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,1,1,1,1,0]
    ], advent8.getScreen());
    
});