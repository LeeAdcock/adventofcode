#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent8.data", 'utf8', function(err, data) {
  if (err) throw err;

  var count = 0;
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    count += (lines[index].length - eval(lines[index]).length); 
  }
  
  console.log("count: " + count);
});