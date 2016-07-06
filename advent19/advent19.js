#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent19.data", 'utf8', function(err, data) {
  if (err) throw err;

  // Load the data
  var replacements = [];
  var input;
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    // Load the find/replace pairs
    var matchReplacement = lines[index].match(/([A-Za-z]{1,2})\s=>\s([A-Za-z]{1,})/)
    if(matchReplacement) {
      replacements.push({find:matchReplacement[1], replace:matchReplacement[2]});
    } else {
      // Load the starting input string
      var matchInput = lines[index].match(/^([A-Za-z]{1,})$/)
      if(matchInput) {
        input = matchInput[0];
      }
    }    
  }
  
  var results = [];
  // For each find/replace pair
  replacements.forEach(function(replacement){

    // Replace each distinct string one at a time with the replacement string
    var regexp = new RegExp(replacement.find, 'g');
    var matchCount = (input.match(regexp) || []).length;
    for(var index = 1; index <= matchCount; index++) {
      // Replace the nth occurance
      var i = 0;
      var result = input.replace(regexp, function(match, capture) {
        i++;
        return (i===index) ? replacement.replace : replacement.find;
      });
      if(results.indexOf(result)===-1) {
        results.push(result);
      }
    }

  });
  
  console.log('count', results.length);
});