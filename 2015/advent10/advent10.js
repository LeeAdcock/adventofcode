#!/usr/bin/env node

var input = '1321131112';

// Apply this process 50 times
for(var i = 0; i<50; i++)
{
  var output = '';
  var currentCharacter = input[0];
  var currentQuantity = 1;

  // For each character in from the input  
  for(var j=1; j<input.length; j++) {
    if(input[j]===currentCharacter) {
      // This character is repeated
      currentQuantity++;
    } else {
      // This is a new character
      output = output.concat(currentQuantity).concat(currentCharacter);
      currentCharacter = input[j];
      currentQuantity = 1;
    }
  }

  input = output = output.concat(currentQuantity).concat(currentCharacter);
  console.log(i+1, output.length);
}