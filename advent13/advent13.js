#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent13.data", 'utf8', function(err, data) {
  if (err) throw err;

  var people = {};
  var shortest = {distance:Number.MAX_SAFE_INTEGER};
  var longest = {distance:0};
  
  // Build map data structure
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var match = lines[index].match(/([A-Z]{1}[a-z]{1,}).*?(gain|lose).*?([0-9]+).*([A-Z]{1}[a-z]{1,})/);
    var name1 = match[1]
    var gainlose = match[2];
    var points = Number(match[3]);
    var name2 = match[4];
    if(!people[name1]) people[name1] = {};
    if(!people[name2]) people[name2] = {};
    people[name1][name2] = isNaN(people[name1][name2]) ? 0 : people[name1][name2];
    people[name2][name1] = isNaN(people[name2][name1]) ? 0 : people[name2][name1];
    people[name1][name2] += (gainlose === 'gain' ? points : -points);
    people[name2][name1] += (gainlose === 'gain' ? points : -points);
  }
  
  // Recursive search routine
  var walkPath = function(path, distance) {

    // If we have hit every city, is this the shortest or longest found so far?
    if(path.length === Object.keys(people).length) 
    {
      distance += people[path[path.length-1]][path[0]];
      if(distance<shortest.distance) {
        shortest = {route:path, distance:distance};
      }
      if(distance>longest.distance) {
        longest = {route:path, distance:distance};
      }
    }

    // For each location we could go to
    Object.keys(people).forEach(function(nextPerson) {
      // If its a place we havn't been to before
      if(path.indexOf(nextPerson)===-1)
      {
        // Add this location to our path
        walkPath(
          path.concat([nextPerson]),
          distance + people[path[path.length-1]][nextPerson]
        );
      } 
    });
  };
  
  // Iterate through each possible starting position
  Object.keys(people).forEach(function(personName) {
    walkPath([personName], 0);
  });
  
  console.log('unhappy', shortest);
  console.log('happy', longest);
});