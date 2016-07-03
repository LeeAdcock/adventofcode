#!/usr/bin/env node

var fs = require('fs');

fs.readFile("advent17.data", 'utf8', function(err, data) {
    if (err) throw err;
    
    // Load the container sizes
    var lines = data.split(/\n/g);
    var containers = [];
    for(var index = 0; index < lines.length; index++)
    {
        containers.push(Number(lines[index]));
    }

    // Review all possible combinations
    var count = {};
    for(var i = 0; i < Math.pow(2, containers.length); i++)
    {
      // Get binary representation, padding on the left with zeros
      var binary = i.toString(2)
      while(binary.length<containers.length) { binary="0"+binary;}

      var sum = 0;
      var containerCount = 0;
      for(var k = 0; k<containers.length; k++) {
          containerCount += binary.charAt(k)=='1'?1:0;
          sum += (binary.charAt(k)=='1'?containers[k]:0);
          if(sum>150) {break; } // speed optimization
      }
      
      // If it matches the desired quantity, record it
      if(sum===150) { 
          count[containerCount] = count[containerCount] ? count[containerCount]+1:1; 
      }
    }
    
    console.log(count[Object.keys(count)[0]]);
});