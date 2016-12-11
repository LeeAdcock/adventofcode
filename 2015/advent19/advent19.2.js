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
    return (previous, current, index, array) => !previous ? false: (current===value[index] ? (array.length == value.length) && previous : false);
  };

  var containsArray = function(value) {
    return (previous, current, index) => previous ? true : (current.reduce(arraysEqual(value), true) ? true : previous);
  };

  var matches  = function(value, input) {
    var i = 0;
    do {
      if(value[i]!==input[i]) {
        return i;
      }
      if(i==input.length) {
        return i;
      }
      i++;
    } while(true)
  };
  
  var history = [];
  var getNextSteps = function(input, results) {
    // for each find/replace pair
    replacements.forEach(function(replacement){
      // for each occurance of 'find' within the input
      var indexes = input.reduce(getIndexOfValue(replacement.find), []);
      for(var i = 0; i < Math.min(4, indexes.length); i++) {
        var index = indexes[i];
        // copy the input
        var copy = input.slice(0);
        // perform the find/replace substitution
        copy = copy.slice(0, index).concat(replacement.replace).concat(copy.slice(index+1));
        // if the result is unique in our result set, then add it 
        if(!history.reduce(containsArray(copy), false)) {
          results.push(copy);
          history.push(copy);
        }
      }
    });
    return results;
  }  
  
  var wip = [['e']];
  while(wip.length!=0) {
    var next = wip.shift();
    var countMatch = matches(next, input);
    var percentMatch = countMatch/next.length;
    if(percentMatch >= .4 || next.length < 5)
    {
      console.log(next, percentMatch, countMatch);
      if(next.reduce(arraysEqual(input), true)) {
        console.log('found it', next);
        return;
      }
      getNextSteps(next, wip);
    }    

    wip.slice(0, 500);
  }    


  console.log();
});