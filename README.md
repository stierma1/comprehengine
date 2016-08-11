## Comprehengine

Useful tool to check whether an object passes a series of JSONPath queries

## Usage

```js
var Comprehengine = require("comprehengine");

var Bob = {
  name: "Bob",
  age:35,
  ssn:1234,
  felon:true
}

var Jill = {
  name: "Jill",
  age:20,
  ssn:4321,
  felon:false
}

var Jack = {
  name: "Jack",
  age:40,
  ssn:null, //Foreigner
  felon: false;
}

//Raw form see expressions section below for another way of stating the rules
var canDrinkAlcohol = ["$[?(@.age >= 21)]"];
Comprehengine(canDrinkAlcohol, Bob); //--> returns true
Comprehengine(canDrinkAlcohol, Jill); //--> returns false
Comprehengine(canDrinkAlcohol, Jack); //--> returns true

var canRunForPresident = ["$[?(@.age >= 35)]", "$[?(@.ssn)]"]
Comprehengine(canRunForPresident, Bob); //--> returns true
Comprehengine(canRunForPresident, Jill); //--> returns false
Comprehengine(canRunForPresident, Jack); //--> returns false because ssn check will fail

var cantVote = {
  or:[
    "$[?(@.age < 18)]",
    "$[?(@.ssn === null)]",
    "$[?(@.felon)]"
  ]
}
Comprehengine(cantVote, Bob); //--> returns true
Comprehengine(cantVote, Jill); //--> returns false
Comprehengine(cantVote, Jack); //--> returns true

```

## Signature
###Comprehengine(Expression expr, Object obj[, Class classConstructor]) --> Boolean
Will process an expression against a given piece of data if a Class is given then it will type check the data before processing.


##Expressions

Supports NOT, AND, OR

###Example
```js
var Comprehengine = require("comprehengine");
var Expressions = Comprehengine.Expressions;
var Bob = {
  name: "Bob",
  age:35,
  ssn:1234,
  felon:true,
  gender: "M"
}



var canBeDrafted = Expressions.AND(
  "$[?(@.age >= 18)]",
  "$[?(@.age < 30)]",
  "$[?(@.gender === 'M')]"
)
assert(!Comprehengine(canBeDrafted, Bob)); //--> returns false

//Create new Expressions
var NAND = function(){
  return Expressions.NOT(Expressions.AND(Array.from(arguments)));
}

var cantBeDrafted = NAND(
  "$[?(@.age >= 18)]",
  "$[?(@.age < 30)]",
  "$[?(@.gender === 'M')]"
)


assert(Comprehengine(cantBeDrafted, Bob)); //--> returns true

```
