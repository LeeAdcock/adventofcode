#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent23.data", 'utf8', function(err, data) {
  if (err) throw err;

  // Build map data structure
  var lines = data.split(/\n/g);
  var registers = {a:0, b:0};
  var pointer = 0;
  while(pointer < lines.length)
  {
    var match = lines[pointer].match(/([A-Za-z]{3})\s([ab]{1})*(?:,\s)*([+-]{1}[0-9]{1,2})*/);
    //console.log(pointer, lines[pointer], registers);
    if(!match) {
        console.log(lines[pointer]);
        return;
    }
    var instruction = match[1];
    var register = match[2];
    var offset = match[3];

    if(instruction==='hlf') {
        registers[register] *= .5;
        pointer++;
    } else if(instruction==='tpl') {
        registers[register] *= 3;
        pointer++;
    } else if(instruction==='inc') {
        registers[register] += 1;
        pointer++;
    } else if(instruction==='jmp') {
        pointer += Number(offset);
    } else if(instruction==='jie') {
        pointer += (registers[register]%2===0) ? Number(offset) : 1;
    } else if(instruction==='jio') {
        pointer += registers[register]===1 ? Number(offset) : 1;
    }
  }
  console.log(registers);
  
});