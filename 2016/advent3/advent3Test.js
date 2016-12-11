#!/usr/bin/env node

var advent3 = require('./advent3');
var assert = require('unit.js').assert;

// First Sample
assert.equal(false, advent3.isValidTriangle([5,10,25]));
assert.equal(0, advent3.countValidTriangles([[5,10,25]]));

// Additional
assert.equal(false, advent3.isValidTriangle([1, 2, 3]));
assert.equal(true, advent3.isValidTriangle([1, 2, 2]));
assert.equal(1, advent3.countValidTriangles([[1, 2, 3], [1, 2, 2]]));

// Data file horizontal triangles
require('fs').readFile("input.data", 'utf8', function(err, data) {
    var triangles = data.split(/\n/g).map(x => x.trim().split(/\s+/g).map(x => 1*x));
    assert.equal(1032, advent3.countValidTriangles(triangles));
});

// Data file vertical triangles
require('fs').readFile("input.data", 'utf8', function(err, data) {
    var triangles = data.split(/\n/g).map(x => x.trim().split(/\s+/g).map(x => 1*x));

    // Rotate vertical triangles to be horizontal
    var swapCells = function(matrix, x1, y1, x2, y2) {
        var a = triangles[x1][y1];
        triangles[x1][y1] = triangles[x2][y2];
        triangles[x2][y2] = a;
    }
    for(var i=0; i<triangles.length; i+=3) {
        swapCells(triangles, i, 1, i+1, 0);
        swapCells(triangles, i, 2, i+2, 0);
        swapCells(triangles, i+1, 2, i+2, 1);
    }
    
    assert.equal(1838, advent3.countValidTriangles(triangles));
});
