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

##Expressions

todo: and, or, not
