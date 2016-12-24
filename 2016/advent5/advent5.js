#!/usr/bin/env node

var crypto = require('crypto');

var index = 0;
var password = '________';
var doorId = '';

var getNextDigitMethodOne = function() {
  while(true) {
    var hash = crypto.createHash('md5').update(doorId+index).digest("hex");
    index++;
    if(hash.substr(0, 5)==='00000') {
      return hash.substr(5,1);
    }
  }
}

var getNextDigitMethodTwo = function() {
  while(true) {
    var hash = crypto.createHash('md5').update(doorId+index).digest("hex");
    index++;
    if(hash.substr(0, 5)==='00000') {
      var position = hash.substr(5,1) * 1;
      var character = hash.substr(6,1);
      console.log(hash, position, character);
      if(position <= 7 && password.substr(position, 1)==='_') {
        password = password.substr(0, position) + character + password.substring(position+1);
        console.log(password);
        return password;
      }
    }
  }
}


module.exports = {
  reset: function() { index=0; },
  setDoorId: function(id) { doorId = id; password = '________'; },
  getNextDigitMethodOne: getNextDigitMethodOne,
  getNextDigitMethodTwo: getNextDigitMethodTwo,
};
