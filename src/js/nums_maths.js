const score = 550;  // stack we onlt have copy
console.log(score.toFixed(3)); // after decimal 3 digit, for e-commerce application
// Returns a string representing a number in fixed-point notation.

const balance = new Number(440.34); // heap we have reference 
console.log(balance);
console.log(balance.toString());

const num = 27.5753;
console.log(num.toPrecision(2)); // no-of significat digits mentioned inside precision -> 28

const hundreds = 10000000;
console.log(hundreds.toLocaleString('en-IN')); // Converts a number to a string by using the current or specified locale.

console.log(Number.MAX_VALUE);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_VALUE);
console.log(Number.MIN_SAFE_INTEGER);

//-------------------------------------------- Maths--------------------------------------------------------------------

console.log(Math); // Object [Math] {}
console.log(typeof Math);        // "object"
console.log(Math.PI);            // 3.141592653589793
console.log(Math.max(2, 5, 9));  // 9

console.log(Math.abs(-2));
console.log(Math.round(4.56));
console.log(Math.ceil(4.4));
console.log(Math.floor(4.4));
// new Math(); // ❌ TypeError: Math is not a constructor


Math.min(3, 7, 1, 9);   // 1
Math.max(3, 7, 1, 9);   // 9
Math.pow(2, 5);        // 32   (2^5)
2 ** 5;                // 32   (modern JS)

Math.sqrt(49);         // 7
Math.cbrt(27);         // 3
Math.random();         // 0 <= value < 1

// random integer between 1 and 10
Math.floor(Math.random() * 10) + 1;
Math.trunc(4.9);       // 4   (removes decimal)

Math.sign(-15);        // -1
Math.sign(0);          // 0
Math.sign(15);         // 1

Math.exp(1);           // e^1
Math.log(Math.E);      // 1   (natural log)
Math.log10(100);       // 2
Math.log2(8);          // 3

Math.sin(Math.PI / 2); // 1
Math.cos(0);           // 1
Math.tan(0);           // 0

Math.E;                // 2.718281828...
Math.PI;               // 3.141592653...
Math.SQRT2;            // √2
Math.LN2;              // ln(2)


Math.hypot(3, 4);      // 5   (√(3² + 4²))
Math.imul(2, 4);       // 8   (32-bit integer multiply)
Math.fround(1.337);   // nearest 32-bit float


/**
const obj = {};   // object without class
Objects in JS are not born from classes.
Classes are just syntax sugar added later.
Math is a built-in singleton object created by the JS runtime (V8, SpiderMonkey, etc.) when the program starts.
No new, no class, just an object literal internally.

In Java → objects come from classes
In JavaScript → classes come from objects

 */
