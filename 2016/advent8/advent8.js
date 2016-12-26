#!/usr/bin/env node

var screen = []
var init = function(x, y) {
  screen = new Array(y);
  for(var i = 0; i < y; i++)
  {
    screen[i] = new Array(x);
    for(var j = 0; j < x; j++)
    {
      screen[i][j] = 0;
    }
  }
}

var rect = function(x, y) {
  for(var i=0; i<y; i++)
  {
      for(var j=0; j<x; j++) {
        screen[i][j] = 1;        
      }
  }
}

var rotateColumn = function(column, by) {
  var colCopy = new Array(screen.length);
  for(var i=0; i<colCopy.length; i++) {
    colCopy[i] = screen[i][column];
  }

  for(var i=0; i<colCopy.length; i++) {
    screen[i][column] = colCopy[(i - (by % colCopy.length) + colCopy.length) % colCopy.length];
  }
}

var rotateRow = function(row, by) {
  var rowCopy = new Array(screen[row].length);
  for(var i=0; i<rowCopy.length; i++) {
    rowCopy[i] = screen[row][i];
  }

  for(var i=0; i<rowCopy.length; i++) {
    screen[row][i] = rowCopy[(i - (by % rowCopy.length) + rowCopy.length) % rowCopy.length];
  }
}

var getActivatedCount = function() {
  return screen.reduce(function(acc, val) {
    return acc + val.reduce(function(acc2, val2){
      return acc2+val2;
    }, 0);
  }, 0);
}

var execute = function(value) {
  var rectMatch = value.match(/rect ([0-9]*)x([0-9]*)/);
  if(rectMatch) {
      rect(rectMatch[1], rectMatch[2]);
  } else {
      var rowMatch = value.match(/rotate row y=([0-9]*) by ([0-9]*)/);
      if(rowMatch) {
          rotateRow(rowMatch[1], rowMatch[2]);
      } else {
          var colMatch = value.match(/rotate column x=([0-9]*) by ([0-9]*)/);
          if(colMatch) { 
              rotateColumn(colMatch[1], colMatch[2]);
          } else {
              console.log('unparsable', value);
          }
      }
  }

}

module.exports = {
  init: init,
  rect: rect,
  rotateColumn: rotateColumn,
  rotateRow: rotateRow,
  getActivatedCount: getActivatedCount,
  execute: execute,
  getScreen: function() { return screen }
};
