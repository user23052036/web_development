/**
 * Quick concept summary (one-liner each):
 * - Stack (primitives): number, string, boolean, null, undefined, symbol, bigint.
 *   These are stored by value; assignments copy the value.
 * - Heap (non-primitives): objects, arrays, functions.
 *   Variables store a reference (pointer-like) to a heap location; assignments copy the reference, not the object.
 *
 * Important caveats:
 * - "const" only prevents reassigning the variable binding; it does NOT freeze object contents.
 * - Equality (===) for objects checks identity (same reference), not deep equality of contents.
 * - To copy objects/arrays safely you must do shallow or deep copy explicitly.
 */

// -----------------------------------------------------------------------------
// SECTION 1: Primitives (stack) — assignment creates independent copies
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 1: Primitives (stack) ---");

let a = 5;           // primitive number stored on the stack (conceptually)
let b = a;           // b gets a copy of the value 5

console.log("before: a =", a, ", b =", b); // 5, 5

b = 99;              // mutating b does NOT affect a (each has its own copy)
console.log("after: a =", a, ", b =", b);  // 5, 99

// Strings are primitives too (immutable)
let s1 = "hello";
let s2 = s1;
s2 = s2.toUpperCase();
console.log("strings: s1 =", s1, ", s2 =", s2); // "hello", "HELLO"

let str = "hello";
str[0] = "H";

console.log(str); // "hello"
// toUpperCase() creates a new string in memory.
// The original string stays untouched.

// All string operations in JS return a new string.
// The original string is never modified.

// -----------------------------------------------------------------------------
// SECTION 2: Objects & arrays (heap) — assignment copies the reference
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 2: Objects & arrays (heap) ---");

let userOne = {
  email: "user@google.com",
  upi: "user@ybl",
  nested: { fav: "coffee" }
};
// userOne lives on the heap; variable userOne holds a reference to that heap location

let userTwo = userOne; // copy of the reference: both point to the same object on the heap
console.log("initial userOne.email =", userOne.email);
console.log("initial userTwo.email =", userTwo.email);

// mutate via one reference
userTwo.email = "hitesh@google.com";
console.log("after mutation userOne.email =", userOne.email); // changed
console.log("after mutation userTwo.email =", userTwo.email); // changed

// nested mutation shows shallow nature of shared references
userOne.nested.fav = "tea";
console.log("after nested mutation userTwo.nested.fav =", userTwo.nested.fav); // "tea"

// identity check: same reference -> true
console.log("userOne === userTwo ?", userOne === userTwo); // true

// The object lives in the heap
// userOne (on the stack) stores a reference
// That reference is an engine-managed pointer/handle to the object

// JS engines (V8, SpiderMonkey) use:
// hidden pointers
// object handles
// moving GC (objects can move!)
// So exposing real addresses would break GC.

// In JavaScript, assigning an object copies its reference — an engine-managed handle to a heap object — not the object itself. Both variables point to the same heap allocation.”



// -----------------------------------------------------------------------------
// SECTION 3: How to create a shallow copy (so top-level becomes independent)
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 3: Shallow copy (top-level) ---");

let copy1 = Object.assign({}, userOne); // shallow copy: top-level properties copied
let copy2 = { ...userOne };             // spread operator, also a shallow copy

console.log("userOne === copy1 ?", userOne === copy1); // false (different object identity)
console.log("copy1.email before =", copy1.email);

copy1.email = "copy1@example.com";
console.log("userOne.email after copy1 change =", userOne.email); // original unchanged

// BUT nested objects are still shared because copy is shallow:
console.log("copy1.nested === userOne.nested ?", copy1.nested === userOne.nested); // true
copy2.nested.fav = "juice";
console.log("userOne.nested.fav after copy2 nested change =", userOne.nested.fav); // "juice"

// -----------------------------------------------------------------------------
// SECTION 4: Deep copy approaches (caveats included)
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 4: Deep copy (making full independent replica) ---");

// 1) JSON deep copy (simple and common) — works for plain data but fails for functions, Dates, undefined, Symbols, circular refs
const deepJson = JSON.parse(JSON.stringify(userOne));
console.log("deepJson.nested === userOne.nested ?", deepJson.nested === userOne.nested); // false
deepJson.nested.fav = "water";
console.log("userOne.nested.fav after deepJson change =", userOne.nested.fav); // remains "juice"

// 2) structuredClone (modern; clones many types and handles circular refs) -- may not be available in old Node versions
// Uncomment if your environment supports structuredClone:
// const deepStructured = structuredClone(userOne);
// deepStructured.nested.fav = "milk";
// console.log("userOne.nested.fav after structuredClone change =", userOne.nested.fav);

// 3) Custom deep clone (libraries like lodash.cloneDeep are recommended for production)
// Note: deep cloning has cost (time & memory); don't deep clone unnecessarily.

// -----------------------------------------------------------------------------
// SECTION 5: Arrays are objects (references), array copying examples
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 5: Arrays ---");

let arrA = [1, 2, 3];
let arrB = arrA;           // reference copy
arrB.push(4);
console.log("arrA after arrB.push ->", arrA); // [1,2,3,4]

let arrShallow = arrA.slice(); // shallow copy
arrShallow.push(99);
console.log("arrA after arrShallow.push ->", arrA); // unchanged

let arrSpread = [...arrA];     // spread copy (shallow)
console.log("arrSpread equals arrA by identity?", arrSpread === arrA); // false

// arrays of objects: shallow copies still share element objects
let objArr = [{ id: 1 }, { id: 2 }];
let objArrCopy = [...objArr]; // shallow
console.log("objArr[0] === objArrCopy[0] ?", objArr[0] === objArrCopy[0]); // true

// -----------------------------------------------------------------------------
// SECTION 6: Functions and parameter passing
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 6: Functions & Params ---");

function mutatePrimitive(x) {
  x = x + 1;
  return x;
}
let num = 10;
mutatePrimitive(num);
console.log("num after mutatePrimitive call =", num); // 10 (primitive copied)

// functions with objects receive references:
function mutateObject(o) {
  o.flag = true;           // mutates original object via shared reference
}
let some = { flag: false };
mutateObject(some);
console.log("some.flag after mutateObject =", some.flag); // true

// If you reassign parameter to a new object, original variable is unaffected:
function reassignObject(o) {
  o = { flag: "new" };     // this reassigns local parameter only
}
reassignObject(some);
console.log("some after reassignObject =", some); // still { flag: true }

// -----------------------------------------------------------------------------
// SECTION 7: const vs let vs var (bindings and mutability)
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 7: const vs let vs var ---");

const C = { a: 1 };
C.a = 2; // allowed: mutating the object that C references
console.log("C after C.a = 2:", C);

try {
  // C = {}; // would throw: cannot reassign a const binding
} catch (err) {
  console.log("reassigning const causes error (uncomment to test)");
}

let L = 1;
L = 2; // allowed
var V = 3;
V = 4; // allowed (var has function scope historically)

// -----------------------------------------------------------------------------
// SECTION 8: Equality gotchas (objects compare by reference)
 // -----------------------------------------------------------------------------
console.log("\n--- SECTION 8: Equality gotchas ---");

const o1 = { x: 1 };
const o2 = { x: 1 };
console.log("o1 === o2 ?", o1 === o2);         // false, different heap objects
const o3 = o1;
console.log("o1 === o3 ?", o1 === o3);         // true, same reference

// For primitives, === checks value
console.log("5 === 5 ?", 5 === 5);             // true

// -----------------------------------------------------------------------------
// SECTION 9: Memory & garbage collection notes
// -----------------------------------------------------------------------------
console.log("\n--- SECTION 9: Memory & garbage collection notes ---");
console.log(`
- JavaScript has automatic garbage collection (GC). When there are no reachable references to a heap object,
  the runtime can reclaim that memory at some future point.
- "Reachable" means there exists some chain of references from roots (e.g. local variables, global objects, closures).
- Creating many long-lived references (e.g., a global cache that never clears) prevents GC and causes memory to grow.
- Be careful with large structures and circular references in environments where legacy cloning fails; structuredClone handles circulars.
`);

// -----------------------------------------------------------------------------
// FINAL TIP: When to copy vs share
// -----------------------------------------------------------------------------
console.log("\n--- FINAL TIP: When to copy vs share ---");
console.log(`
- Use reference sharing for performance when you want mutations to be visible across users/consumers.
- Use shallow copy (spread / Object.assign / slice) for independent top-level edits.
- Use deep copy when you must fully isolate nested state (but be mindful of cost and limitations).
- Prefer immutable patterns (create new objects rather than mutating) in large apps to reduce surprise bugs.
`);


/*
STACK (Primitive values & references)        HEAP (Objects / Non-Primitives)
───────────────────────────────────         ────────────────────────────────

userTwo ─────────────┐
                     │
userOne ─────────────┼───────────────▶  {
                     │                      email: "user@google.com",
myYoutubeName ──▶ "1LineCode"              upi:   "user@ybl"
                                          }

anotherName ──▶ "1LineCode"

────────────────────────────────────────────────────────────────────────────────────

KEY IDEAS:
• Stack stores:
  - Primitive values directly (number, string, boolean, null, undefined, symbol, bigint)
  - References (addresses) for non-primitive values

• Heap stores:
  - Actual objects, arrays, functions

• When you do:
    let userTwo = userOne;
  → NO new object is created
  → Both variables point to the SAME heap object

• Mutating through ANY reference changes the SAME object in heap
*/
