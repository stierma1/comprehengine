var Comprehengine = require("../index");
var Expressions = Comprehengine.Expressions;
var assert = require("assert");

var Bob = {
  name: "Bob",
  age:35,
  ssn:1234,
  felon:true,
  gender: "M"
}

var Jill = {
  name: "Jill",
  age:20,
  ssn:4321,
  felon:false,
  gender: "F"
}

var Jack = {
  name: "Jack",
  age:40,
  ssn:null, //Foreigner
  felon: false,
  gender: "M"
}

var canDrinkAlcohol = ["$[?(@.age >= 21)]"];
assert(Comprehengine(canDrinkAlcohol, Bob)); //--> returns true
assert(!Comprehengine(canDrinkAlcohol, Jill)); //--> returns false
assert(Comprehengine(canDrinkAlcohol, Jack)); //--> returns true

var canRunForPresident = ["$[?(@.age >= 35)]", "$[?(@.ssn)]"]
assert(Comprehengine(canRunForPresident, Bob)); //--> returns true
assert(!Comprehengine(canRunForPresident, Jill)); //--> returns false
assert(!Comprehengine(canRunForPresident, Jack)); //--> returns false because ssn check will fail

var cantVote = {
  or:[
    "$[?(@.age < 18)]",
    "$[?(@.ssn === null)]",
    "$[?(@.felon)]"
  ]
}
assert(Comprehengine(cantVote, Bob)); //--> returns true
assert(!Comprehengine(cantVote, Jill)); //--> returns false
assert(Comprehengine(cantVote, Jack)); //--> returns true
assert(!Comprehengine(cantVote, Jack, Array)); //--> returns false

var NAND = function(){
  return Expressions.NOT(Expressions.AND(Array.from(arguments)));
}

var canBeDrafted = Expressions.AND(
  "$[?(@.age >= 18)]",
  "$[?(@.age < 30)]",
  "$[?(@.gender === 'M')]"
)

var cantBeDrafted = NAND(
  "$[?(@.age >= 18)]",
  "$[?(@.age < 30)]",
  "$[?(@.gender === 'M')]"
)

assert(!Comprehengine(canBeDrafted, Bob)); //--> returns false
assert(Comprehengine(cantBeDrafted, Bob)); //--> returns true
