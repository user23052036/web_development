"use strict";

/*
const numbers = [1,2,3,45];
const array = [2,4,55,6,true,"True",34.32,numbers];
// all elements are zero based indexing

const newArr = new Array(1,2,3,45,77);
// only diff
//newArray(5) // -> creates an empty array of length 5
// [] is predictable. new Array() has traps. Use brackets unless you really know why.

numbers.push(99);
numbers.push(87.634);
console.log(numbers);
numbers.pop(); // pops the last element
console.log(numbers);
numbers.unshift(89); // adds at the very beginning high timeconsuming as all the values behind needs to be shifted right
console.log(numbers);
numbers.shift(); // moes left like the << binary operation but not same literally
console.log(numbers);
*/

// join tyrns array into string
const arr1 = [1,2,3,6,2,265,8];
const arr2 = arr1.join();

console.log(arr1);
console.log(arr2);
console.log(typeof arr1);
console.log(typeof arr2);

// slice and splice
console.log("A ",arr1);
const my1 = arr1.slice(1,3);
console.log(my1);

console.log("B ",arr1);
const my2 = arr1.splice(1,3);
console.log(my2);
console.log("C ",arr1);

const ind_gm = ["vishi","gukesh","prag","arjun"];
const world_gm = ["rapod","hikaru","fisher","magnus","nepo","tal"];
// console.log(world_gm);
// world_gm.push(ind_gm); // pushes into the existing array
// console.log(world_gm);

// accessing inner elements
// console.log(`${world_gm[6][2]} and ${world_gm[6][3]}`);

// concat combines and returns a new array this only joins two array
const all_gm = ind_gm.concat(world_gm);
console.log(all_gm);

// spread operator ----> multiple array can be joined into one at a time and returns a new array
const all_new_gm = [...ind_gm,...world_gm];
console.log(all_new_gm);

// flat operation --> we need to mention the depth
const nested_array = [1,2,3,[4,5,6,[7,88,6],3,],[44,66],22];
const flat_array = nested_array.flat(2);
console.log(nested_array);
console.log(flat_array);

// converting diff datatypes to aray
// step-1) ask ifArray
// step-2) from

console.log(Array.isArray("morichika"));
console.log(Array.from("morichika"));

let num1=11,num2=12,num3=13;
console.log(Array.of(num1,num2,num3));

