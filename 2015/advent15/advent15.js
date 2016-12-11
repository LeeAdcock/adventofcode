#!/usr/bin/env node

var fs = require('fs');
var decoder = require('string_decoder').StringDecoder;

fs.readFile("advent15.data", 'utf8', function(err, data) {
  if (err) throw err;

  var ingredients = {};

  // Load ingredient data
  var lines = data.split(/\n/g);
  for(var index = 0; index < lines.length; index++)
  {
    var matchName = lines[index].match(/([A-Z]{1}[a-z]{1,}):/)[1];
    ingredients[matchName] = {};
    var metricRegex = /([a-z]{1,})\s(-{0,1}[0-9]{1,2})/gm
    var metricMatch
    while (metricMatch = metricRegex.exec(lines[index])) {
      ingredients[matchName][metricMatch[1]] = metricMatch[2];
    }
    ingredients[matchName]['amount'] = 0;
  }

  var maxScore = 0;
  var maxScoreIngredients;

  while(true) {

    // Iterate through all possible ingredient amounts
    ingredients[Object.keys(ingredients)[0]].amount++;
    for(var ingredientIndex = 0; ingredientIndex<Object.keys(ingredients).length-1; ingredientIndex++) {
      if(ingredients[Object.keys(ingredients)[ingredientIndex]].amount>100) {
        ingredients[Object.keys(ingredients)[ingredientIndex]].amount = 0;
        ingredients[Object.keys(ingredients)[ingredientIndex+1]].amount++;
      }

      var sum = 0;
      for(var ingredientIndex2 = 0; ingredientIndex2<Object.keys(ingredients).length; ingredientIndex2++) {
        sum+=ingredients[Object.keys(ingredients)[ingredientIndex2]].amount;
      }
      
      if(sum===100) {

        var score = 
          Math.max(0, 
            (ingredients.Frosting.capacity * ingredients.Frosting.amount) +
            (ingredients.Candy.capacity * ingredients.Candy.amount) +
            (ingredients.Butterscotch.capacity * ingredients.Butterscotch.amount) +
            (ingredients.Sugar.capacity * ingredients.Sugar.amount)) *
          Math.max(0, 
            (ingredients.Frosting.durability * ingredients.Frosting.amount) +
            (ingredients.Candy.durability * ingredients.Candy.amount) +
            (ingredients.Butterscotch.durability * ingredients.Butterscotch.amount) +
            (ingredients.Sugar.durability * ingredients.Sugar.amount)) *
          Math.max(0, 
            (ingredients.Frosting.flavor * ingredients.Frosting.amount) +
            (ingredients.Candy.flavor * ingredients.Candy.amount) +
            (ingredients.Butterscotch.flavor * ingredients.Butterscotch.amount) +
            (ingredients.Sugar.flavor * ingredients.Sugar.amount)) *
          Math.max(0, 
            (ingredients.Frosting.texture * ingredients.Frosting.amount) +
            (ingredients.Candy.texture * ingredients.Candy.amount) +
            (ingredients.Butterscotch.texture * ingredients.Butterscotch.amount) +
            (ingredients.Sugar.texture * ingredients.Sugar.amount));
        
        if(score > maxScore) {
          maxScore = score;
          console.log(score);
        }
        
      }
    }
    if(ingredients[Object.keys(ingredients)[Object.keys(ingredients).length-1]].amount===100) {
      break;
    }
  }
  console.log('*'+maxScore);

});