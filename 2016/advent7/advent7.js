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
  // Reformat the input to be <content inside brackes>|<content outside brackets>
  var reformated="|";
  input.split(/[\[\]]{1}/).forEach(function(segment, index) {
    reformated = (index%2==1) ? segment+" "+reformated : reformated+" "+segment;
  });

  // Is the expected text format "ABA | BAB" present?
  return Array.isArray(reformated.match(/(\w)(?!\1)(\w)(\1)(?:[\w\s]*?)(?:\|)(?:[\w\s]*?)(\2)(\1)(\2)/));
}


module.exports = {
  supportsTls: supportsTls,
  supportsSsl: supportsSsl,
};
