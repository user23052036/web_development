// ============================================
// SHALLOW COPY vs DEEP COPY in JavaScript
// ============================================

console.log("=== UNDERSTANDING COPIES IN JAVASCRIPT ===\n");

// ============================================
// PART 1: PRIMITIVE VALUES (for context)
// ============================================
console.log("--- PART 1: Primitives (strings, numbers, booleans) ---");

let a = 10;
let b = a; // Copy by value
b = 20;

console.log("a:", a); // 10 (unchanged)
console.log("b:", b); // 20
console.log("Primitives are always copied by VALUE\n");

// ============================================
// PART 2: OBJECTS - THE REFERENCE PROBLEM
// ============================================
console.log("--- PART 2: Objects are passed by REFERENCE ---");

const user1 = { name: "Alice", age: 25 };
const user2 = user1; // NOT a copy! Just another reference

user2.age = 30;

console.log("user1:", user1); // { name: 'Alice', age: 30 } ❌ Changed!
console.log("user2:", user2); // { name: 'Alice', age: 30 }
console.log("Both point to the SAME object in memory\n");

// ============================================
// PART 3: SHALLOW COPY - Top Level Only
// ============================================
console.log("--- PART 3: SHALLOW COPY ---");

const original = {
  name: "Souvik",
  age: 28,
  account: {
    balance: 100,
    currency: "INR"
  }
};

// Method 1: Spread operator (most common)
const shallow1 = { ...original };

// Method 2: Object.assign()
const shallow2 = Object.assign({}, original);

console.log("Original:", original);
console.log("Shallow copy created\n");

// ✅ TEST 1: Changing top-level property
console.log("TEST 1: Changing top-level property (age)");
shallow1.age = 35;
console.log("original.age:", original.age); // 28 ✅ Unchanged
console.log("shallow1.age:", shallow1.age); // 35
console.log("✅ Top-level properties are independent\n");

// ❌ TEST 2: Changing nested object
console.log("TEST 2: Changing nested object (account.balance)");
shallow1.account.balance = 0;
console.log("original.account.balance:", original.account.balance); // 0 ❌ Changed!
console.log("shallow1.account.balance:", shallow1.account.balance); // 0
console.log("❌ Nested objects are SHARED (same reference)\n");

// Proof: They point to the same nested object
console.log("Are nested objects the same?");
console.log("original.account === shallow1.account:", 
            original.account === shallow1.account); // true
console.log();

// ============================================
// PART 4: SHALLOW COPY - MORE EXAMPLES
// ============================================
console.log("--- PART 4: More Shallow Copy Examples ---");

const student = {
  name: "John",
  scores: [85, 90, 78], // Array is also an object!
  address: {
    city: "Mumbai",
    pincode: 400001
  }
};

const shallowStudent = { ...student };

// Changing primitive
shallowStudent.name = "Jane";
console.log("Original name:", student.name); // "John" ✅
console.log("Shallow name:", shallowStudent.name); // "Jane"

// Changing array (nested object)
shallowStudent.scores.push(95);
console.log("Original scores:", student.scores); // [85, 90, 78, 95] ❌
console.log("Shallow scores:", shallowStudent.scores); // [85, 90, 78, 95]

// Changing nested object
shallowStudent.address.city = "Delhi";
console.log("Original city:", student.address.city); // "Delhi" ❌
console.log("Shallow city:", shallowStudent.address.city); // "Delhi"
console.log();

// ============================================
// PART 5: DEEP COPY - Fully Independent
// ============================================
console.log("--- PART 5: DEEP COPY ---");

const originalUser = {
  name: "Souvik",
  age: 28,
  account: {
    balance: 100,
    currency: "INR",
    transactions: [
      { type: "credit", amount: 50 },
      { type: "debit", amount: 20 }
    ]
  }
};

// Method 1: JSON methods (most common, but has limitations)
const deepCopy1 = JSON.parse(JSON.stringify(originalUser));

// Method 2: structuredClone() (modern, recommended)
const deepCopy2 = structuredClone(originalUser);

console.log("Deep copy created\n");

// ✅ TEST 1: Changing nested object
console.log("TEST 1: Changing nested object");
deepCopy1.account.balance = 0;
console.log("original.account.balance:", originalUser.account.balance); // 100 ✅
console.log("deepCopy1.account.balance:", deepCopy1.account.balance); // 0
console.log("✅ Completely independent!\n");

// ✅ TEST 2: Changing deeply nested array
console.log("TEST 2: Changing deeply nested array");
deepCopy1.account.transactions.push({ type: "credit", amount: 100 });
console.log("original transactions length:", 
            originalUser.account.transactions.length); // 2 ✅
console.log("deepCopy1 transactions length:", 
            deepCopy1.account.transactions.length); // 3
console.log();

// Proof: They are different objects
console.log("Are nested objects the same?");
console.log("original.account === deepCopy1.account:", 
            originalUser.account === deepCopy1.account); // false
console.log();

// ============================================
// PART 6: COMPARISON TABLE
// ============================================
console.log("--- PART 6: COMPARISON ---");
console.log(`
┌─────────────────────┬──────────────────┬──────────────────┐
│                     │  SHALLOW COPY    │   DEEP COPY      │
├─────────────────────┼──────────────────┼──────────────────┤
│ Top-level props     │   Independent ✅  │  Independent ✅  │
│ Nested objects      │   Shared ❌       │  Independent ✅  │
│ Arrays              │   Shared ❌       │  Independent ✅  │
│ Performance         │   Fast           │  Slower          │
│ Methods             │   {...}, assign  │  JSON, clone     │
└─────────────────────┴──────────────────┴──────────────────┘
`);

// ============================================
// PART 7: COMMON PITFALLS
// ============================================
console.log("--- PART 7: Common Pitfalls ---\n");

// Pitfall 1: Thinking = creates a copy
console.log("PITFALL 1: Using = doesn't create a copy");
const obj1 = { x: 10 };
const obj2 = obj1; // ❌ Not a copy!
obj2.x = 20;
console.log("obj1.x:", obj1.x); // 20 (both changed)
console.log();

// Pitfall 2: JSON limitations
console.log("PITFALL 2: JSON.parse/stringify limitations");
const withFunction = {
  name: "Test",
  greet: function() { return "Hello"; }, // ❌ Lost!
  date: new Date(), // ❌ Becomes string
  undef: undefined // ❌ Lost!
};
const jsonCopy = JSON.parse(JSON.stringify(withFunction));
console.log("Original:", withFunction);
console.log("JSON copy:", jsonCopy);
console.log("Notice: function, Date, and undefined are lost!\n");

// ============================================
// PART 8: WHEN TO USE WHAT?
// ============================================
console.log("--- PART 8: When to Use What? ---");
console.log(`
USE SHALLOW COPY when:
- Object has only primitive values
- You need better performance
- You're okay with shared nested objects

USE DEEP COPY when:
- Object has nested objects/arrays
- You need complete independence
- You're modifying nested data

EXAMPLE SCENARIOS:
- User settings (flat object) → Shallow Copy ✅
- Shopping cart (nested items) → Deep Copy ✅
- Form data (nested fields) → Deep Copy ✅
- Simple config (no nesting) → Shallow Copy ✅
`);

// ============================================
// PART 9: PRACTICE EXERCISE
// ============================================
console.log("--- PART 9: Practice Exercise ---");
console.log(`
Try to predict the output before running:

const data = {
  id: 1,
  items: [{ name: "Apple" }]
};

const copy = { ...data };
copy.items[0].name = "Orange";

What will data.items[0].name be?
Answer: "Orange" (because items array is shared in shallow copy!)
`);

// ============================================
// FINAL SUMMARY
// ============================================
console.log("\n=== SUMMARY ===");
console.log(`
🔑 KEY TAKEAWAY:
- Shallow Copy: New box, but same toys inside 📦→🧸
- Deep Copy: New box AND new toys 📦→🧸(clone)

💡 REMEMBER:
Shallow copy = {...obj} or Object.assign()
Deep copy = structuredClone(obj) or JSON.parse(JSON.stringify(obj))

⚠️ WARNING:
Nested objects in shallow copies are DANGEROUS!
They share the same reference!
`);
