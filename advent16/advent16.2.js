#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent16.data", 'utf8', function(err, data) {
  if (err) throw err;

  // the matching entry will only have values that match
  // these target values.
  var goal = {
    trees: {min: 4, max: Number.MAX_SAFE_INTEGER},
    cats: {min: 8, max: Number.MAX_SAFE_INTEGER},
    children: {min: 3, max: 3},
    samoyeds: {min: 7, max: 7},
    akitas: {min: 0, max: 0},
    vizslas: {min: 0, max: 0},
    cars: {min: 2, max: 2},
    perfumes: {min: 1, max: 1},
    pomeranians: {min: 0, max: 2},
    goldfish: {min: 0, max: 4}
  };

  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    // load metrics for this entry
    var metricRegex = /(?:([a-z]{1,}):\s([0-9]{1,2}))/gm
    var metricMatch;
    var match = true;    
    while (metricMatch = metricRegex.exec(lines[index])) {
      match = match && (
        Number(metricMatch[2]) >= goal[metricMatch[1]].min && 
        Number(metricMatch[2]) <= goal[metricMatch[1]].max
        );
    }

    // if a match is found, log the entry
    if(match) console.log(lines[index]);
  }

});