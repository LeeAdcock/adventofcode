#!/usr/bin/env node

var result = [];

var process = function(input) {
  input.split('').forEach(function(character, position) {
    var code = character.charCodeAt(0);
    result[position] = result[position] || []
    result[position][code] = result[position][code] || 0
    result[position][code] += 1;
  });
}

var getMostCommon = function() {
  var solution = "";
  result.forEach(function(position) {
    var mostCommon = position.reduce(function(accumulator, currentValue, index) {
      if(accumulator.count>currentValue) return accumulator;
      return {
        count: currentValue,
        character: String.fromCharCode(index)
      }
    }, {count: 0});
    solution += mostCommon.character;
  });  
  return solution;
}

var getLeastCommon = function() {
  var solution = "";
  result.forEach(function(position) {
    var mostCommon = position.reduce(function(accumulator, currentValue, index) {
      if(accumulator.count > 0 && accumulator.count<currentValue) return accumulator;
      return {
        count: currentValue,
        character: String.fromCharCode(index)
      }
    }, {count: 0});
    solution += mostCommon.character;
  });  
  return solution;
}

module.exports = {
  process: process,
  getMostCommon: getMostCommon,
  getLeastCommon: getLeastCommon,
  reset: function() {result = [];}
};
