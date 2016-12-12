#!/usr/bin/env node

var advent4 = require('./advent4');
var assert = require('unit.js').assert;

// Test checksum calculation
assert.equal(true, advent4.isValidChecksum("not-a-real-room-404[oarel]"));
assert.equal(true, advent4.isValidChecksum("aaaaa-bbb-z-y-x-123[abxyz]"));
assert.equal(true, advent4.isValidChecksum("a-b-c-d-e-f-g-h-987[abcde]"));
assert.equal(true, advent4.isValidChecksum("not-a-real-room-404[oarel]"));
assert.equal(false, advent4.isValidChecksum("totally-real-room-200[decoy]"));

// Test sector calculation
assert.equal(404, advent4.getSectorNumber("not-a-real-room-404[oarel]"));
assert.equal(123, advent4.getSectorNumber("aaaaa-bbb-z-y-x-123[abxyz]"));
assert.equal(987, advent4.getSectorNumber("a-b-c-d-e-f-g-h-987[abcde]"));
assert.equal(200, advent4.getSectorNumber("totally-real-room-200[decoy]"));

assert.equal('very encrypted name', advent4.decryptName("qzmt-zixmtkozy-ivhz-343[abc]", 343));

// First puzzle
require('fs').readFile("input.data", 'utf8', function(err, data) {
    var sum = data
        .split(/\n/g)
        .filter(room => advent4.isValidChecksum(room))
        .map(room => advent4.getSectorNumber(room))
        .reduce((a, b) => a + b, 0);
    assert.equal(158835, sum);
});

// Second puzzle
require('fs').readFile("input.data", 'utf8', function(err, data) {
    var roomIds = data
        .split(/\n/g)
        .filter(room => advent4.isValidChecksum(room))
    var roomNames = roomIds
        .map(room => advent4.decryptName(room, advent4.getSectorNumber(room)));
    assert.equal(254, roomNames.indexOf('northpole object storage'));
    assert.equal(993, advent4.getSectorNumber(roomIds[254]));
});