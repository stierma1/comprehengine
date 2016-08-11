var Comprehengine = require("../index");
var assert = require("assert");

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
  felon: false
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
