#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent14.data", 'utf8', function(err, data) {
  if (err) throw err;

  var reindeer = {};
  var maxPoints = 0;

  for(var duration = 1; duration <= 2503; duration++) {
    var maxDistance = 0;
  
    // Build map data structure
    var lines = data.split(/\n/g);
    for(var index = 0; index < lines.length; index++)
    {
      var match = lines[index].match(/([A-Z]{1}[a-z]{1,}).*?([0-9]{1,2}).*?([0-9]{1,2}).*?([0-9]{1,3})/);
      var name = match[1]
      var speed = Number(match[2])
      var ontime = Number(match[3])
      var offtime = Number(match[4])
      var dutycycle = (ontime+offtime);
      reindeer[name] = reindeer[name] ? reindeer[name] : {points: 0};
      reindeer[name].distance=((Math.floor(duration/dutycycle)*speed*ontime)+(Math.min(duration % dutycycle, ontime) * speed));
      maxDistance = Math.max(maxDistance, reindeer[name].distance);
    }
  
    Object.keys(reindeer).forEach(function(name) {
      if(reindeer[name].distance==maxDistance) {
        reindeer[name].points++;
        if(reindeer[name].points>maxPoints) maxPoints = reindeer[name].points;
      }
    });
  }
  
  Object.keys(reindeer).forEach(function(name) {
    console.log(reindeer[name].points==maxPoints ? '*' + name : name, reindeer[name].points);
  });
});