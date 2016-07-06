#!/usr/bin/env node

var fs = require('fs');

var packages = []; // array of package sizes

// reduce functions
var sumFunction = ( previous, current ) => previous + current;
var productFunction = ( previous, current ) => previous * current;
var highToLowSort = function(a, b) {return b-a;};
var arrayProductSort = function(a, b) {return a.reduce(productFunction, 1)-b.reduce(productFunction, 1)};

fs.readFile("advent24.data", 'utf8', function(err, data) {
  if (err) throw err;

  // Load the list of packages sizes
  data.split(/\n/g).forEach(function(line) {
    packages.push(Number(line));
  });
  packages = packages.sort(highToLowSort);
  
  // A set of packages must be a third of the sum of all packages to
  // be a valid solution
  var targetSum = packages.reduce(sumFunction, 0)/4;

  var pack = function(solution, packages, length) {
    var solutions = [];

    // If we've hit six packages in the array, then our solution 
    // set is as big as we want to let it get. Either it is a good
    // solution, or it isn't.
    if(length==0) {
      if(solution.reduce(sumFunction, 0)===targetSum) {
        solutions.push(solution);
      }
    } else {
      // Recursivly add more packages to the current set, looking for more
      // good solutions.
      packages.forEach(function(package, index) {
        var nowRemaining = packages.slice(0)
        nowRemaining.splice(0, index+1);
        var newSolution = solution.concat([package]);
        solutions = solutions.concat(pack(newSolution, nowRemaining, length-1));
      });
    }    
    return solutions;
  }

  // find a set of six packages with sums to a third of the sum of all packages, 
  // and has the smallest productFunction
  var solutions = [];
  for(var length = 1; solutions.length===0; length++) {
    solutions = pack([], packages, length);
  }
  solutions.sort(arrayProductSort); // Sort solutions from best to worst.
  console.log(solutions[0], solutions[0].reduce(productFunction, 1));

});