#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent9.data", 'utf8', function(err, data) {
  if (err) throw err;

  var locations = {};
  var shortest = {distance:Number.MAX_SAFE_INTEGER};
  var longest = {distance:0};
  
  // Build map data structure
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var match = lines[index].match(/([a-zA-Z]{1,})\sto\s([a-zA-Z]{1,})\s=\s([0-9]{1,})/);
    var locationA = match[1]
    var locationB = match[2];
    var distance = Number(match[3]);
    
    if(!locations[locationA]) locations[locationA] = {};
    if(!locations[locationB]) locations[locationB] = {};
    locations[locationA][locationB] = distance;
    locations[locationB][locationA] = distance;
  }
  
  // Recursive search routine
  var walkPath = function(path, distance) {
    // If we have hit every city, is this the shortest or longest found so far?
    if(path.length === Object.keys(locations).length) 
    {
      if(distance<shortest.distance) {
        shortest = {route:path, distance:distance};
      }
      if(distance>longest.distance) {
        longest = {route:path, distance:distance};
      }
    }

    // For each location we could go to
    Object.keys(locations).forEach(function(nextLocation) {
      // If its a place we havn't been to before
      if(path.indexOf(nextLocation)===-1)
      {
        // Add this location to our path
        walkPath(
          path.concat([nextLocation]),
          distance + locations[path[path.length-1]][nextLocation]
        );
      } 
    });
  };
  
  // Iterate through each possible starting position
  Object.keys(locations).forEach(function(locationName) {
    walkPath([locationName], 0);
  });
  
  console.log('shortest', shortest);
  console.log('longest', longest);
  
});