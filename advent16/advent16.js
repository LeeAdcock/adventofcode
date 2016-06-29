#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent16.data", 'utf8', function(err, data) {
  if (err) throw err;

  // the matching entry will only have values that match
  // these target values.
  var goal = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    // load metrics for this entry
    var metricRegex = /(?:([a-z]{1,}):\s([0-9]{1,2}))/gm
    var metricMatch;
    var match = true;    
    while (metricMatch = metricRegex.exec(lines[index])) {
      match = match && (Number(metricMatch[2]) == goal[metricMatch[1]]);
    }

    // if a match is found, log the entry
    if(match) console.log(lines[index]);
  }
});