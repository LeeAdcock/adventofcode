#!/usr/bin/env node

var supportsTls = function(input) {
  
  var matchInsideBrackets = input.match(/\[(\w{0,})(\w)(\w(?!\2))(\3)(\2)(\w{0,})\]/);
  if(!matchInsideBrackets) {
    
    var matchOutsideBrackets = input.replace(/\[(\w*?)\]/, " ").match(/(\w)(\w(?!\1))(\2)(\1)/);
    if(matchOutsideBrackets) 
    {
      return true;
    }  
  }
  return false;
}

var supportsSsl = function(input) {
  
  var reformatted = '';
  
  // Get the combined text outside the brackets
  var outsideBracketsRegEx = new RegExp("(?:^|\\])(\\w*)","g");
  var outsideBrackets;
  while (outsideBrackets = outsideBracketsRegEx.exec(input)) {
    reformatted+=outsideBrackets[1]+' ';
  }
  
  // Add seperator
  reformatted+='|';

  // Get the combined text inside the brackets
  var insideBracketsRegEx = new RegExp("(?:\\[)(\\w*)","g");
  var insideBrackets;
  while (insideBrackets = insideBracketsRegEx.exec(input)) {
    reformatted+=insideBrackets[1]+' ';
  }

  // Is the expected text format "ABA | BAB" present?
  var matches = reformatted.match(/(\w)(?!\1)(\w)(\1)(?:[\w\s]*?)(?:\|)(?:[\w\s]*?)(\2)(\1)(\2)/);
  if(matches) {
    return true;
  } else {
    return false;
  }
}


module.exports = {
  supportsTls: supportsTls,
  supportsSsl: supportsSsl,
};
