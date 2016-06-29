#!/usr/bin/env node

var crypto = require('crypto');

var key = "bgvyzdsv";
var index = 0;
var goal = Array(7).join("0");
console.log(goal);
while(crypto.createHash('md5').update(key+index).digest("hex").substring(0, goal.length)!==goal) {
    index++;
}
console.log(index);