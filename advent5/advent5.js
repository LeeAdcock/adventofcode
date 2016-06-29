#!/usr/bin/env node

var fs = require('fs');

fs.readFile("advent5.data", 'utf8', function(err, data) {
  if (err) throw err;

  var lines = data.split(/\n/g);
  var matches = 0;

  for(var index = 0; index < lines.length; index++)
  {
    var line = lines[index];
    if(
        (line.match(/[aeiou]{1}/g) || []).length >=3 &&
        line.match(/(.)\1/) &&
        (line.match(/(ab|cd|pq|xy)/g) || []).length===0
    )
    {
        matches++;  
    }
  }

  console.log("total matches", matches);
});