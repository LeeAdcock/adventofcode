#!/usr/bin/env node

var advent8 = require('./advent8');
var assert = require('unit.js').assert;

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


// Test small matrix init
advent8.init(1, 1);
assert.deepEqual([[0]], advent8.getScreen());

// Test non-square matrix init
advent8.init(2, 3);
assert.deepEqual([
    [0, 0], 
    [0, 0], 
    [0, 0]
    ], advent8.getScreen());

// Test larger matrix
advent8.init(5, 5);
assert.deepEqual(
    [
        [0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ], advent8.getScreen());

// Test rect
advent8.init(5, 5);
advent8.rect(3, 5);
assert.deepEqual(
    [
        [1, 1, 1, 0, 0], 
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 0, 0]
    ], advent8.getScreen());
    
// Test rotate row
advent8.init(5, 5);
advent8.rect(3, 5);
advent8.rotateRow(0, 1);
advent8.rotateRow(1, 2);
advent8.rotateRow(2, 3);
advent8.rotateRow(3, 4);
advent8.rotateRow(4, 5);
assert.deepEqual(
    [
        [0, 1, 1, 1, 0], 
        [0, 0, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 0, 0]
    ], advent8.getScreen());

// Test column rotate
advent8.init(5, 5);
advent8.rect(5, 3);
advent8.rotateColumn(0, 1);
advent8.rotateColumn(1, 2);
advent8.rotateColumn(2, 3);
advent8.rotateColumn(3, 4);
advent8.rotateColumn(4, 5);
assert.deepEqual(
    [ 
        [ 0, 0, 1, 1, 1 ],
        [ 1, 0, 0, 1, 1 ],
        [ 1, 1, 0, 0, 1 ],
        [ 1, 1, 1, 0, 0 ],
        [ 0, 1, 1, 1, 0 ] 
    ], advent8.getScreen());
    
assert.equal(15, advent8.getActivatedCount());



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