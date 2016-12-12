#!/usr/bin/env node

module.exports = {
  getDistanceFromStart: function(input) {
    return solve(input).distanceFromStart;
  },
  
  getFirstLocationVisitedTwice: function(input) {
    return solve(input).firstVisitedTwice;
  }
};

var solve = function(input) {
  var locations = [];
  var firstVisitedTwice = 0;
  
  var direction = 0, x = 0, y = 0;

  input.split(', ').forEach(function(step) {

    var turn = step.substr(0,1)
    var distance = 1*step.substr(1);
    
    direction = (direction + ((turn==='L') ? 270 : 90)) % 360;
    
    for(var movement=0; movement<distance; movement++) {
      
      y += (direction===0) ? 1 : 0;
      y += (direction===180) ? -1 : 0;
      
      x += (direction===90) ? 1 : 0;
      x += (direction===270) ? -1 : 0;
      
      if(locations.indexOf(x+','+y) != -1) {
        if(!firstVisitedTwice) firstVisitedTwice = Math.abs(x)+Math.abs(y);
      } else {
        locations.push(x+','+y);
      }
    }
  });
  
  return {
    'firstVisitedTwice': firstVisitedTwice, 
    'distanceFromStart': Math.abs(x)+Math.abs(y)};
}