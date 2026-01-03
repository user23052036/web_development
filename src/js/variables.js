"use strict";// treat all js code as newer version

// alert("dinasaurss!!!!"); we are using node.js to run not browser... this will not work heree..
// documentation tc39.es and mdn

//JavaScript is a dynamically typed the language. This means that variable types are interpreted and enforced at runtime, rather than being manifestly declared and checked at the compile time

const rollNumber = 166345;
let emailId = "sonu@gmail.com";
var password = "756ty4@.1";
// city = "Mumbai";  // can not use this after enabling strict mode
let pinCode;

// rollNumber = 2; not allowed
console.table([rollNumber,emailId,password,pinCode]);
// we dont use var bacause of the problem in their scope.. it is depreciated

// primitive type:

// number
// bigint
// string
// boolean
// null - standalone value
// undefined - not defined
// symbol - uniqueness

// (reference type) non-primitive type:

// arrays
// object
// functions

console.log(typeof null);        // "object"  ← JS bug (historic)
console.log(typeof undefined);   // "undefined"
console.log(typeof 123);         // "number"
console.log(typeof 123n);        // "bigint"
console.log(typeof "chai");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof Symbol("id"));// "symbol"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof { a: 1 });    // "object"
console.log(typeof function(){});// "function"


//placeholders
var greet="hello", who="world";
console.log("%s, %s!",greet,who);

// Symbol returns diff id everysingle time even if the input is same
const Id = Symbol("sonu");
const anotherId = Symbol("sonu");
console.log("Id = ",Id,"anotherId = ",anotherId);
console.log(Id === anotherId);  //false
console.log(Id == anotherId); // false

// arrays
const beyblade = ["pegassis","leo","sagiterio"];

// objects
const beyblade1 = {
    name: "bull",
    type: "attack",
    age: 19,
    points: 1999.34,
}

// What you wrote is an object literal, but JS only allows it when it’s assigned, returned, or used as an expression. Standing alone, the engine doesn’t know what to do with it.

// functions
// in js functions are also treated as variables
const myfunc = function(){
    console.log("hiii @!!!");
}
console.log(typeof myfunc); // function
// all non-primitive datatypes returns object.
