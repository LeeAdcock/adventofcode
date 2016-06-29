#!/usr/bin/env node

var fs = require('fs');

fs.readFile("advent6.data", 'utf8', function(err, data) {
  if (err) throw err;

  // Create the grid
  var gridSize = 1000;
  var grid = new Array(gridSize);
  for (var initx = 0; initx < gridSize; initx++) {
    grid[initx] = new Array(gridSize);
    for (var inity = 0; inity < gridSize; inity++) {
      grid[initx][inity] = 0;
    }
  }
  
  // Process the instructions
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var matches = lines[index].match(/(on|off|toggle) ([0-9]{1,4}),([0-9]{1,4}) through ([0-9]{1,4}),([0-9]{1,4})/);
    
    var type = matches[1];
    var x1 = matches[2];
    var y1 = matches[3];
    var x2 = matches[4];
    var y2 = matches[5];
    
    for(var x=x1-1; x<x2; x++) {
      for(var y=y1-1; y<y2; y++) {
        grid[x][y] = (type==='on' || (type==='toggle' && !grid[x][y])) ? 1 : 0;
      }
    }
    console.log(matches);
  }
  
  // Count the results
  var count = 0;
  for(var x = 0; x<gridSize; x++) {
    for(var y = 0; y<gridSize; y++) {
      count+=grid[x][y];
    }
  }
  
  console.log("processed: " + lines.length);
  console.log("count: " + count);
});