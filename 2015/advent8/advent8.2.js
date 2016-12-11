#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent8.data", 'utf8', function(err, data) {
  if (err) throw err;

  var count = 0;
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var encoded = '\"'+lines[index].replace(/\\/g, '\\\\').replace(/\"/g, '\\\"')+'\"';
    count += (encoded.length - lines[index].length);
  }
  
  console.log("count: " + count);
});