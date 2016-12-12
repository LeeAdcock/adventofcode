#!/usr/bin/env node

var advent5 = require('./advent5');
var assert = require('unit.js').assert;

// First sample
advent5.reset();
advent5.setDoorId('abc');
assert.equal(1,   advent5.getNextDigitMethodOne());
assert.equal(8,   advent5.getNextDigitMethodOne());
assert.equal('f', advent5.getNextDigitMethodOne());
assert.equal(4,   advent5.getNextDigitMethodOne());
assert.equal(7,   advent5.getNextDigitMethodOne());
assert.equal('a', advent5.getNextDigitMethodOne());
assert.equal(3,   advent5.getNextDigitMethodOne());
assert.equal(0,   advent5.getNextDigitMethodOne());

// First problem
var password = ''
advent5.reset();
advent5.setDoorId('abbhdwsy');
for(var i=0; i<8; i++) {
    password += advent5.getNextDigitMethodOne();
}
assert.equal('801b56a7', password);

// Second sample
advent5.reset();
advent5.setDoorId('abc');
assert.equal('_5______',   advent5.getNextDigitMethodTwo());
assert.equal('_5__e___',   advent5.getNextDigitMethodTwo());

var password = '________'
advent5.reset();
advent5.setDoorId('abc');
do {
    password = advent5.getNextDigitMethodTwo();
} while (password.indexOf('_')!=-1);
assert.equal('05ace8e3', password);


// Second problem
var password = '________'
advent5.reset();
advent5.setDoorId('abbhdwsy');
do {
    password = advent5.getNextDigitMethodTwo();
} while (password.indexOf('_')!=-1);
assert.equal('424a0197', password);
