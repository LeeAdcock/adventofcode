#!/usr/bin/env node

var isValidTriangle = function(sides) {
  var isValid = sides[0]+sides[1]>sides[2] &&
    sides[0]+sides[2]>sides[1] &&
    sides[1]+sides[2]>sides[0];
  return isValid;
};

var countValidTriangles = function(triangles) {
  return triangles.filter(isValidTriangle).length;
};

module.exports = {
  isValidTriangle: isValidTriangle,
  countValidTriangles: countValidTriangles
};
