#!/usr/bin/env node

var advent6 = require('./advent6');
var assert = require('unit.js').assert;

// Test scenario one
advent6.process('eedadn');
advent6.process('drvtee');
advent6.process('eandsr');
advent6.process('raavrd');
advent6.process('atevrs');
advent6.process('tsrnev');
advent6.process('sdttsa');
advent6.process('rasrtv');
advent6.process('nssdts');
advent6.process('ntnada');
advent6.process('svetve');
advent6.process('tesnvt');
advent6.process('vntsnd');
advent6.process('vrdear');
advent6.process('dvrsen');
advent6.process('enarar');
assert.equal('easter', advent6.getMostCommon());
assert.equal('advent', advent6.getLeastCommon());
advent6.reset();

// Test scenario two
require('fs').readFile("input.data", 'utf8', function(err, data) {
    data.split(/\n/g).forEach(advent6.process);
    assert.equal('ikerpcty', advent6.getMostCommon());
    assert.equal('uwpfaqrq', advent6.getLeastCommon());
    advent6.reset();
});
