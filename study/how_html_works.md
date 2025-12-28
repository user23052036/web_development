
---

# 🌐 How HTML Is Internally Implemented (Browser Internals)

HTML is **not executed**.
It is **parsed, converted into data structures, and rendered** by the browser.

Think of HTML as **input data**, not a program.

---

## 1️⃣ HTML starts as raw bytes

When you open a webpage:

```
Disk / Network
     ↓
Raw bytes (01001001...)
```

These bytes are decoded using:

* UTF-8 (most common)
* Other encodings (rare now)

Result:

```text
"<html><body><h1>Hello</h1></body></html>"
```

📌 Still just **plain text**

---

## 2️⃣ HTML Parsing (Tokenizer → Parser)

The browser has an **HTML parser** written in C/C++.

### Step 1: Tokenization

Characters are converted into **tokens**:

```html
<h1>Hello</h1>
```

Becomes:

```
START_TAG(h1)
TEXT("Hello")
END_TAG(h1)
```

### Step 2: Tree Construction

Tokens are inserted into a tree structure.

---

## 3️⃣ DOM (Document Object Model)

The parser builds a **DOM tree in memory (RAM)**.

### Example HTML

```html
<html>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

### DOM Tree (Logical Structure)

```
Document
 └── html
     └── body
         ├── h1
         │    └── "Hello"
         └── p
              └── "World"
```

![Image](https://www.conceptdraw.com/solution-park/resource/images/solutions/dom-tree/SOFTWARE-DEVELOPMENT-DOM-Tree-DOM-Hierarchy-in-HTML88.png)

![Image](https://i.sstatic.net/kBF3j.png)

![Image](https://www.w3schools.com/js/pic_htmltree.gif)

📌 **Key points**

* DOM is **mutable**
* Stored **in RAM**
* JavaScript talks only to the DOM

---

## 4️⃣ HTML vs DOM (CRITICAL)

| HTML          | DOM                |
| ------------- | ------------------ |
| Text file     | In-memory object   |
| Static        | Dynamic            |
| On disk       | In RAM             |
| Never changes | Changes constantly |

```js
document.body.append("Hi");
```

➡ modifies **DOM**, not the HTML file.

---

## 5️⃣ CSS Parsing → CSSOM

CSS is parsed **separately**.

```css
h1 {
  color: red;
}
```

Becomes a **CSS Object Model (CSSOM)**:

```
CSSOM
 └── h1
      └── color: red
```

![Image](https://miro.medium.com/0%2AFp3mesmVsWB7z0OD)

![Image](https://i.sstatic.net/l9uwf.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2Acc_QnU-DGTRgt9vMRMSLVg.png)

---

## 6️⃣ Render Tree (DOM + CSSOM)

Browser now combines:

* DOM (structure)
* CSSOM (styles)

➡ Creates **Render Tree**

### Render Tree Characteristics

* Only **visible elements**
* Includes **computed styles**
* Excludes:

  * `display: none`
  * `<head>`

```
Render Tree
 └── body
     ├── h1 (red, font-size: 32px)
     └── p  (black, font-size: 16px)
```

![Image](https://web.dev/static/articles/critical-rendering-path/render-tree-construction/image/dom-cssom-are-combined-8de5805b2061e.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/0%2A_mUaF4ho09lojJ7D.png)

![Image](https://webperf.tips/static/d77eb220c5dd10181dc361c4ff0051da/906b5/BrowserRenderingPipeline17.png)

---

## 7️⃣ Layout (Reflow) — Geometry phase

Browser now calculates **exact positions**.

### For every render node

* Width
* Height
* X, Y position
* Margin / Padding / Border

This is **pure math**.

```
h1:
  x = 20px
  y = 40px
  width = 200px
  height = 50px
```

📌 Called:

* **Layout**
* or **Reflow**

---

## 8️⃣ Paint — Pixels appear

Now browser converts layout into **pixels**.

Steps:

1. Draw background
2. Draw borders
3. Draw text glyphs
4. Draw images

![Image](https://developer.chrome.com/static/blog/inside-browser-part3/image/paint-records-151165f18a91e.png)

![Image](https://miro.medium.com/1%2Ab3BgflJLLrKABZ5BCXnegw.png)

![Image](https://www.webperf.tips/static/2f9f8c70b3d2602ae88bda913d336fbb/cd052/LayersAndCompositing04.png)

Modern browsers:

* Use **GPU**
* Split page into **layers**
* Composite efficiently

---

## 9️⃣ Composite (GPU accelerated)

Instead of repainting everything:

* Browser moves GPU layers
* Used for:

  * Scrolling
  * Animations
  * Transforms

```
Layer 1: background
Layer 2: text
Layer 3: animation
```

📌 This is why `transform: translate()` is fast
📌 This is why `top/left` is slow

---

## 🔁 10️⃣ JavaScript Interaction Cycle

When JS runs:

```js
document.querySelector("h1").textContent = "Hi";
```

Browser does:

```
JS modifies DOM
     ↓
DOM marked dirty
     ↓
Layout (if needed)
     ↓
Paint (if needed)
     ↓
Composite
```

⚠ Too many DOM updates = slow page

---

## 11️⃣ Error-tolerant HTML parsing (IMPORTANT)

HTML is **not strict** like C/C++.

Broken HTML:

```html
<h1>Hello
<p>World
```

Browser auto-fixes it internally:

```
<h1>Hello</h1>
<p>World</p>
```

📌 HTML parser is **fault-tolerant by design**

---

## 12️⃣ Why HTML is Declarative

HTML says **WHAT**, not **HOW**

```html
<button>Click</button>
```

Browser decides:

* Shape
* Behavior
* Accessibility
* Keyboard handling

HTML does **zero logic**.

---

## 13️⃣ Full Browser Pipeline (ONE DIAGRAM)

```
HTML bytes
   ↓
Tokenizer
   ↓
HTML Parser
   ↓
DOM Tree
   ↓
        CSS bytes
           ↓
        CSS Parser
           ↓
        CSSOM
           ↓
DOM + CSSOM
   ↓
Render Tree
   ↓
Layout (Reflow)
   ↓
Paint
   ↓
Composite (GPU)
   ↓
Screen
```

---

## 14️⃣ Low-level takeaway (OS / C mindset)

* HTML ≈ **data structure description**
* Browser ≈ **runtime engine**
* DOM ≈ **heap-allocated object graph**
* Layout ≈ **geometry solver**
* Paint ≈ **rasterization**

If you understand **compilers, ASTs, memory trees**, HTML will feel familiar.

---
