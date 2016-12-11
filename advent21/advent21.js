#!/usr/bin/env node

var enemy = {
  hitPoints: 109,
  damage: 8,
  armor: 2
};

var weapons = [
  {name: 'Dagger',     cost: 8,    damage: 4, armor: 0},
  {name: 'Shortsword', cost: 10,   damage: 5, armor: 0},
  {name: 'Warhammer',  cost: 25,   damage: 6, armor: 0},
  {name: 'Longsword',  cost: 40,   damage: 7, armor: 0},
  {name: 'Greataxe',   cost: 74,   damage: 8, armor: 0}
];

var armors = [
  {name: 'Leather',    cost: 13,   damage: 0, armor: 1},
  {name: 'Chainmail',  cost: 31,   damage: 0, armor: 2},
  {name: 'Splintmail', cost: 53,   damage: 0, armor: 3},
  {name: 'Bandedmail', cost: 75,   damage: 0, armor: 4},
  {name: 'Platemail',  cost: 102,  damage: 0, armor: 5}
];

var rings = [
  {name: 'Damage +1',  cost: 25,   damage: 1, armor: 0},
  {name: 'Damage +2',  cost: 50,   damage: 2, armor: 0},
  {name: 'Damage +3',  cost: 100,  damage: 3, armor: 0},
  {name: 'Defense +1', cost: 20,   damage: 0, armor: 1},
  {name: 'Defense +2', cost: 40,   damage: 0, armor: 2},
  {name: 'Defense +3', cost: 80,   damage: 0, armor: 3}
];

var outfits = [];

var sum = (previous, current) => previous + current;

// compare two sets of equipment by total cost
var costSort = function(equipA, equipB) {
  var isWinA  = fight(equipA, enemy);
  var isWinB = fight(equipB, enemy);
  if(isWinA == isWinB) {
    var costA = equipA.map(item => item.cost).reduce(sum);
    var costB = equipB.map(item => item.cost).reduce(sum);
    return costB - costA;
  }
  return isWinA ? 1 : -1;
};

// given a set of equipment, returns true of you win or false if enemy wins
var fight = function(equipment) {
  var me = {
    hitPoints: 100,
    damage: equipment.map(item => item.damage).reduce(sum),
    armor: equipment.map(item => item.armor).reduce(sum)
  }

  var myLifespan = Math.ceil(me.hitPoints/Math.max(1, enemy.damage - me.armor));
  var enemyLifespan = Math.ceil(enemy.hitPoints/Math.max(1, me.damage - enemy.armor));

  return enemyLifespan > myLifespan ? false : true;
};

// for each type of weapon
weapons.forEach(function(weapon) {

  // for each type of armor, or none
  var armorOptions =  armors.concat([{name: 'nothing (armor)', cost: 0, damage: 0, armor: 0}])
  armorOptions.forEach(function(armor) {

    // for each two types of rings, or none
    var leftRingOptions =  rings.concat([{name: 'nothing (left ring)', cost: 0, damage: 0, armor: 0}])
    var rightRingOptions =  rings.concat([{name: 'nothing (right right)', cost: 0, damage: 0, armor: 0}])
    leftRingOptions.forEach(function(leftRing){
      rightRingOptions.forEach(function(rightRing){
        if(leftRing.name!==rightRing.name) {
          // given the equipment list
          outfits.push([weapon, armor, leftRing, rightRing]);
        }
      });    
    });    
  });  
});

// sort from best solution (lowest cost) to worst 
// solution (highest cost), output lowest cost solution
outfits = outfits.sort(costSort);
console.log('most expensive loss', outfits[0].map(item => item.cost).reduce(sum), outfits[0]);
console.log('least expensive win', outfits[outfits.length-1].map(item => item.cost).reduce(sum), outfits[outfits.length-1]);