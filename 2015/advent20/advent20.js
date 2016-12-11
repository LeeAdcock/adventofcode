#!/usr/bin/env node

var input = 36000000;
var quess = 830000; // brute force is slow, giving it a starting point helps

while(true) {
  for(var house = quess ; house <= input; house+=1) {
    var presents = 0;
    for(var elf = 1 ; elf <= house; elf++) {
      presents += (house % elf === 0) ? (elf * 10) : 0;
    }
    
    if(presents >= input) {
      console.log(house);
      return;  
    }
  }
}