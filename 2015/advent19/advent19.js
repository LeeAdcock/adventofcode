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
      replacements.push({find:matchReplacement[1], replace:matchReplacement[2].match(/([A-Z]{1}[a-z]{0,1})/g)});
    } else {
      // Load the starting input string
      var matchInput = lines[index].match(/^([A-Za-z]{1,})$/);
      if(matchInput) {
        input = matchInput[0].match(/([A-Z]{1}[a-z]{0,1})/g);
      }
    }    
  }
  
  var getIndexOfValue = function(value) {
    return (previous, current, index) => current===value ? previous.concat([index]) : previous;
  };

  var arraysEqual = function(value) {
    return (previous, current, index) => !previous ? false: (current===value[index] ? true && previous : false);
  };

  var containsArray = function(value) {
    return (previous, current, index) => previous ? true : (current.reduce(arraysEqual(value), current.length == value.length) ? true : previous);
  };
  
  var results = [];

  // for each find/replace pair
  replacements.forEach(function(replacement){
    // for each occurance of 'find' within the input
    input.reduce(getIndexOfValue(replacement.find), []).forEach(function(index) {
      // copy the input
      var copy = input.slice(0);
      // perform the find/replace substitution
      copy = copy.slice(0, index).concat(replacement.replace).concat(copy.slice(index+1));
      // if the result is unique in our result set, then add it 
      if(!results.reduce(containsArray(copy), false)) {
        results.push(copy);
      }
    });
  });
  
  console.log('count', results.length);
});