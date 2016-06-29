#!/usr/bin/env node

var fs = require('fs');

fs.readFile("advent7.2.data", 'utf8', function(err, data) {
  if (err) throw err;

  var run = function() {
    var solidstate = false;
    while(!solidstate) 
    {
      solidstate = true;
      
      // Process the instructions
      var lines = data.split(/\n/g);
      for(var index = 0; index < lines.length; index++)
      {
        
        // two parameter operation
        var twoparamop = lines[index].match(/^([a-z0-9]{1,})\s(OR|AND|LSHIFT|RSHIFT)\s([a-z0-9]{1,}|\d{1,2})\s->\s([a-z]{1,})$/);
        if(twoparamop) {
          var var1 = isNaN(twoparamop[1]) ? state[twoparamop[1]] : Number(twoparamop[1]);
          var op = twoparamop[2];
          var var2 = isNaN(twoparamop[3]) ? state[twoparamop[3]] : Number(twoparamop[3]);
          var var3 = twoparamop[4];
          var original = state[var3];
          if(op==='AND') state[var3] = var1 & var2;
          if(op==='OR') state[var3] = var1 | var2;
          if(op==='LSHIFT') state[var3] = var1 << var2;
          if(op==='RSHIFT') state[var3] = var1 >> var2;
          if(original!=state[var3]) solidstate = false;
        }
    
        // one parameter operation
        var oneparamop = lines[index].match(/^(NOT)\s([a-z0-9]{1,})\s->\s([a-z]{1,})$/);
        if(oneparamop) {
          var op = oneparamop[1];
          var var1 = isNaN(oneparamop[2]) ? state[oneparamop[2]] : Number(oneparamop[2]);
          var var2 = oneparamop[3];
          var original = state[var2];
          if(op==='NOT') state[var2] = ~var1;
          if(original!=state[var2]) solidstate = false;
        }
    
        // assignment operation
        var assignop = lines[index].match(/^([a-z0-9]{1,})\s->\s([a-z]{1,})$/);
        if(assignop) {
          var var1 = isNaN(assignop[1]) ? state[assignop[1]] : Number(assignop[1]);
          var var2 = assignop[2];
          var original = state[var2];
          state[var2] = var1;
          if(original!=state[var2]) solidstate = false;
        }
      }
    }
  };

  var state = {};
  run();

  console.log('a:'+state['a']);
});