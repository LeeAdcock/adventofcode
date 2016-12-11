#!/usr/bin/env node

var findNext = function(input) {
  var inputArray = input.split("");
  
  // Loop until a solution is found
  while(true) {
    // Find the next value by adding one to the current value
    var index = inputArray.length-1;
    while(inputArray[index].charCodeAt(0)+1>122) {
        inputArray[index--] = String.fromCharCode(97);
    }
    inputArray[index] = String.fromCharCode(inputArray[index].charCodeAt(0)+1);
    
    // Does this value meet the requirements?
    var solution = inputArray.join("");
    if(!solution.match(/i|o|l/) 
      && solution.match(/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/)
      && solution.match(/((.)\2).+((.)\4)/)) {
      return solution;
    }
  }
};

// Get results
var output;
console.log(output = findNext('vzbxxyzz'));
console.log(output = findNext(output));