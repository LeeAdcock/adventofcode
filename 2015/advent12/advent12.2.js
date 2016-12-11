#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent12.data", 'utf8', function(err, data) {
  if (err) throw err;

  // Build map data structure
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var stack = [JSON.parse(lines[index])];
    var sum = 0;
    while(stack.length!==0) {
        var object = stack.pop();  
        if(isNaN(object)) {
            if(Array.isArray(object)) {
                // Array
                stack = stack.concat(object);
            } else {
                if(typeof object != "string") {
                    // Object
                    var valid = true;
                    Object.keys(object).forEach(function(entry) {
                      valid = valid && (object[entry]!=='red');
                    });
                    if(valid) {
                        Object.keys(object).forEach(function(entry) {
                          stack.push(object[entry]);
                        });
                    }
                }
            }
        } else {
            // Value
            sum += Number(object);
        }
    }
    console.log(sum);
  }
  
});