#!/usr/bin/env node

var fs = require('fs');

fs.readFile("advent18.data", 'utf8', function(err, data) {
    if (err) throw err;
    
    // Load the grid
    var grid = [];
    var off = '.';
    var on = '#';
    var lines = data.split(/\n/g);
    for(var index = 0; index < lines.length; index++)
    {
        grid[index] = lines[index].split('');
    }
    
    // For each iteration
    for(var cycle = 1; cycle <= 100; cycle++) {
        var queue = [];
        // For each position
        for(var x = 0; x<grid.length; x++) {
            for(var y = 0; y<grid[0].length; y++) {
                // Calculate the number of neighbors turned on
                var neighborcount = 0;
                [
                    {x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},
                    {x:-1,y:0},{x:1,y:0},
                    {x:-1,y:1},{x:0,y:1},{x:1,y:1},
                ].forEach(function(delta) {
                    if(x+delta.x>=0 && x+delta.x<grid.length && y+delta.y>=0 && delta.y<grid[0].length) {
                        if(grid[x+delta.x][y+delta.y]===on) neighborcount++;
                    }
                });
                
                if(grid[x][y]===on && neighborcount!==2 && neighborcount!==3) {
                    queue.push({x:x, y:y, value:'.'}); // turn off
                }
                if(grid[x][y]===off && neighborcount==3) {
                    queue.push({x:x, y:y, value:'#'}); // turn on
                }
            }
        }    
        
        // Apply queued changes
        while(queue.length>0) {
            var change = queue.pop();
            grid[change.x][change.y] = change.value;
        }
    }

    console.log('count', JSON.stringify(grid).match(/#/g).length);
});