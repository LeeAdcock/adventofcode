#!/usr/bin/env node

var decryptName = function(name, shift) {
  var name = name.match(/([a-z]{1,}-{0,1}){1,}/)[0];
  name = name
    .split('')
    .map(character => (character==='-') ? ' ' : shiftCharacter(character, shift))
    .reduce((a, b) => a + b, '');
  return name.trim();
}

var shiftCharacter = function(character, shift) {
  var aCharCode = 'a'.charCodeAt(0);
  var originalCharCode = character.charCodeAt(0);
  var newCharCode = ((originalCharCode - aCharCode + shift) % 26) + aCharCode;
  return String.fromCharCode(newCharCode);
}

var calculateChecksum = function(input) {
  var checksum = 
    input.substring(0, input.indexOf('['))
    .split('')
    .filter(letter => letter.match(/[a-z]/))
    .reduce(function(result, letter) {
      result[letter.charCodeAt(0)] = (result[letter.charCodeAt(0)] || {count: 0, letter: letter})
      result[letter.charCodeAt(0)].count++;
      return result;
    }, [])
    .sort(function(a, b) {
      if(a.count==b.count) {
        return a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
      }
      return b.count - a.count;
    })
    .slice(0, 5)
    .reduce(function(a, b) {
      return a + b.letter;
    }, '');
  return checksum;
}

module.exports = {
  getSectorNumber: function(name) {
    return 1*name.match(/[0-9]{1,}/)[0];
  },
  isValidChecksum: function(name) {
    return name.match("\\["+calculateChecksum(name)+"\\]$")!==null;
  },
  decryptName: decryptName
};
