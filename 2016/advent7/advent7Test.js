#!/usr/bin/env node

var advent7 = require('./advent7');
var assert = require('unit.js').assert;

// Test TLS
assert.equal(true, advent7.supportsTls('abba[mnop]qrst'));
assert.equal(false, advent7.supportsTls('abcd[bddb]xyyx'));
assert.equal(false, advent7.supportsTls('aaaa[qwer]tyui'));
assert.equal(true, advent7.supportsTls('ioxxoj[asdfgh]zxcvbn'));

// Test SSL
assert.equal(true, advent7.supportsSsl('aba[bab]xyz'));
assert.equal(false, advent7.supportsSsl('xyx[xyx]xyx'));
assert.equal(true, advent7.supportsSsl('aaa[kek]eke'));
assert.equal(true, advent7.supportsSsl('zazbz[bzb]cdb'));


require('fs').readFile("input.data", 'utf8', function(err, data) {
    // Test TLS
    var countTls = data.split(/\n/g)
        .map(advent7.supportsTls)
        .reduce(function(acc, val) { return acc + (val?1:0)}, 0);
    assert.equal(118, countTls);
    
    // Test SSL
    var countSsl = data.split(/\n/g)
        .map(advent7.supportsSsl)
        .reduce(function(acc, val) { return acc + (val?1:0)}, 0);
    assert.equal(260, countSsl);

});