#!/usr/bin/env node

var value = 20151125;
var row = 1;
var col = 1;
var maxRow = 1;

while(row!=2981 || col!=3075) {
  // move to next cell
  row-=1;
  col+=1;
  if(row==0) {
    col = 1;
    maxRow = row = maxRow+1;
  }
  // calculate value
  value = (value * 252533) % 33554393;
}
console.log(value);
