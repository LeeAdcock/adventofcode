var fs = require('fs')

fs.readFile("advent2.data", 'utf8', function(err, data) {
  if (err) throw err;

  var boxes = data.split(/\n/g);
  var paperNeeded = 0;
  var ribbonNeeded = 0;

  for(var index = 0; index < boxes.length; index++)
  {
      var box = boxes[index].split(/x/g);
      
      // wrap box
      paperNeeded+=2*box[0]*box[1] + 2*box[1]*box[2] + 2*box[0]*box[2];
      
      // extra
      paperNeeded+=Math.min(box[0]*box[1], box[1]*box[2], box[0]*box[2]);
      
      // wrap box
      ribbonNeeded+=box[0]*2+box[1]*2+box[2]*2-Math.max(box[0], box[1], box[2])*2;
      
      // bow
      ribbonNeeded+=box[0]*box[1]*box[2];
  }

  console.log("paper", paperNeeded);
  console.log("ribbon", ribbonNeeded);
});