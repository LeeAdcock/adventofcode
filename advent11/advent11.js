#!/usr/bin/env node

var findNext = function(input) {
  var inputArray = input.split("");
  
  // Loop until a solution is found
  while(true) {
    // Find the next value by adding one to the current value
    var index = inputArray.length-1;
    var rollover = true;
    while(rollover) {
      if(inputArray[index].charCodeAt(0)+1>122) {
        inputArray[index] = String.fromCharCode(97);
        index--;
      } else {
        inputArray[index] = String.fromCharCode(inputArray[index].charCodeAt(0)+1);
        rollover = false;
      }
    }
    
    // Does this value meet the requirements?
    var input = inputArray.join("");
    if(!input.match(/i|o|l/) 
      && input.match(/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/)
      && input.match(/((.)\2).+((.)\4)/)) {
      return input;
    }
  }
};

// Get results
var output;
console.log(output = findNext('vzbxkghb'));
console.log(output = findNext(output));