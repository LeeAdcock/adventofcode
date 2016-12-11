#!/usr/bin/env node

module.exports = {
  solve: function(input) {
  
    var direction = 0, x = 0, y = 0;
    
    input.split(', ').forEach(function(step) {

      var turn = step.match(/(L|R)/)[0];
      var distance = 1*step.match(/[0-9]+/)[0];
      
      direction = (direction + (turn==='L') ? 270 : 90) % 360;
      
      y += (direction===0) ? distance : 0;
      y += (direction===180) ? -distance : 0;
      
      x += (direction===90) ? distance : 0;
      x += (direction===270) ? -distance : 0;
    });

    return Math.abs(x)+Math.abs(y);
  }
};