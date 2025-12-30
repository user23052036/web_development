# CSS Comprehensive Guide & Notes

## Table of Contents
1. [Foundations](#foundations)
2. [Core Properties](#core-properties)
3. [The Box Model](#the-box-model)
4. [Positioning & Layout](#positioning--layout)
5. [Modern Layout Systems](#modern-layout-systems)
6. [Responsive Design](#responsive-design)
7. [Advanced Features](#advanced-features)
8. [Best Practices & Performance](#best-practices--performance)
9. [Practical Examples & Exercises](#practical-examples--exercises)
10. [Quick Reference](#quick-reference)

---

## Foundations

### What is CSS?

**CSS (Cascading Style Sheets)** is a styling language used to describe the presentation of HTML documents. While HTML provides the structure and content, CSS handles the visual appearance - colors, fonts, layouts, animations, and more.

Think of HTML as the skeleton of a webpage and CSS as the skin, clothes, and makeup that make it look beautiful.

### CSS Syntax Structure

Every CSS rule follows this basic pattern:

```css
selector {
  property: value;
  /* Each property-value pair is called a declaration */
  /* Semicolons separate declarations */
}
```

**Example:**
```css
h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}
```

### Three Ways to Include CSS

#### 1. Inline CSS (Least Recommended)
Adding styles directly to HTML elements using the `style` attribute.

```html
<h1 style="color: red; font-size: 24px;">Hello World</h1>
```

**Pros:**
- Highest specificity (overrides other styles)
- Quick for testing

**Cons:**
- Hard to maintain
- Mixes content with presentation
- Cannot reuse styles

#### 2. Internal CSS (Document-Level)
Using `<style>` tags in the HTML document's `<head>` section.

```html
<head>
  <style>
    h1 {
      color: blue;
      font-size: 24px;
    }
  </style>
</head>
```

**Pros:**
- Good for single-page documents
- Better organization than inline

**Cons:**
- Cannot reuse across multiple pages
- Still mixes HTML and CSS

#### 3. External CSS (Recommended)
Linking to a separate `.css` file from your HTML document.

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

**Pros:**
- Clean separation of concerns
- Reusable across multiple pages
- Easier to maintain and debug
- Better performance (caching)

**Cons:**
- Requires an additional HTTP request

### CSS Specificity Hierarchy

When multiple rules target the same element, CSS uses specificity to determine which rule wins:

1. **Inline styles** (highest priority)
2. **ID selectors** (`#header`)
3. **Class selectors, attributes, pseudo-classes** (`.btn`, `[type="text"]`, `:hover`)
4. **Element selectors, pseudo-elements** (`p`, `::before`)
5. **Universal selector** (`*`) (lowest priority)

**Example:**
```css
/* This will be overridden by inline styles */
p { color: blue; }

/* This has higher specificity */
.special-text { color: red; }

/* This has even higher specificity */
#main-title { color: green; }
```

**Important:** `!important` overrides all specificity rules (use sparingly!).

---

## Core Properties

### Color Systems

CSS supports multiple ways to specify colors:

#### Named Colors
```css
color: red;
color: blue;
color: green;
/* Limited to about 140 predefined names */
```

#### RGB (Red, Green, Blue)
```css
color: rgb(255, 0, 0);     /* Red */
color: rgb(0, 255, 0);     /* Green */
color: rgb(0, 0, 255);     /* Blue */
color: rgba(255, 0, 0, 0.5); /* Red with 50% opacity */
```

#### Hexadecimal
```css
color: #ff0000;    /* Red */
color: #00ff00;    /* Green */
color: #0000ff;    /* Blue */
color: #f00;       /* Short form for #ff0000 */
```

#### HSL (Hue, Saturation, Lightness)
```css
color: hsl(0, 100%, 50%);     /* Red */
color: hsl(120, 100%, 50%);   /* Green */
color: hsla(0, 100%, 50%, 0.5); /* Red with 50% opacity */
```

### Units of Measurement

#### Absolute Units
- `px` (pixels) - most common
- `cm`, `mm`, `in` - physical measurements

#### Relative Units
- `%` - percentage of parent element
- `em` - relative to current element's font size
- `rem` - relative to root element's font size (recommended for typography)
- `vh`/`vw` - percentage of viewport height/width
- `vmin`/`vmax` - smaller/larger of viewport height or width

**Best Practice:** Use `rem` for typography and `em` for component-relative sizing.

### Text Properties

#### Font Properties
```css
font-family: Arial, "Helvetica Neue", sans-serif;
/* Always provide fallback fonts */

font-size: 16px;        /* Absolute size */
font-size: 1rem;        /* Relative to root (recommended) */
font-size: 1.2em;       /* Relative to parent */

font-weight: normal;    /* 400 */
font-weight: bold;      /* 700 */
font-weight: 300;       /* Light weight */
```

#### Text Alignment & Decoration
```css
text-align: left | right | center | justify;

text-decoration: none;              /* Remove underlines */
text-decoration: underline;         /* Add underline */
text-decoration: overline;          /* Add line above */
text-decoration: line-through;      /* Strikethrough */

text-transform: uppercase;          /* All caps */
text-transform: lowercase;          /* All lowercase */
text-transform: capitalize;         /* First letter caps */
```

#### Line Height & Spacing
```css
line-height: 1.5;        /* Unitless (recommended) */
line-height: 24px;       /* Fixed pixels */

letter-spacing: 1px;     /* Space between letters */
word-spacing: 2px;       /* Space between words */
```

### Background Properties

#### Background Color
```css
background-color: #ffffff;    /* White */
background-color: rgba(0,0,0,0.5); /* Black with 50% opacity */
```

#### Background Images
```css
background-image: url('image.jpg');

/* Control how image displays */
background-repeat: no-repeat;           /* Don't repeat */
background-position: center;            /* Center the image */
background-size: cover;                 /* Fill container */
background-size: contain;               /* Fit entirely */
background-size: 100px 200px;          /* Specific dimensions */
```

#### Multiple Backgrounds
```css
background-image: 
  url('pattern.png'), 
  linear-gradient(to bottom, #fff, #000);
```

### Opacity & Transparency

```css
opacity: 0.5;                    /* 50% transparent (affects children) */
color: rgba(255, 0, 0, 0.5);     /* Red with 50% opacity (doesn't affect children) */
```

**Tip:** Use `rgba()` or `hsla()` for transparency to avoid affecting child elements.

---

## The Box Model

Every HTML element is a rectangular box composed of four layers:

```
┌─────────────────────────────────────┐
│              Margin                 │  ← Space outside the border
├─────────────────────────────────────┤
│              Border                 │  ← Edge around padding/content
├─────────────────────────────────────┤
│              Padding                │  ← Space inside the border
├─────────────────────────────────────┤
│             Content                 │  ← Actual content area
└─────────────────────────────────────┘
```

### Box Model Properties

#### Width & Height
```css
width: 300px;        /* Content width */
height: 200px;       /* Content height */
```

#### Padding
```css
padding: 10px;                    /* All sides */
padding: 10px 20px;               /* Vertical | Horizontal */
padding: 10px 20px 15px 5px;      /* Top | Right | Bottom | Left */

/* Individual sides */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 15px;
padding-left: 5px;
```

#### Border
```css
border: 2px solid black;          /* Width | Style | Color */

/* Individual properties */
border-width: 2px;
border-style: solid;
border-color: black;

/* Individual sides */
border-top: 2px solid black;
border-right: 1px dashed red;
```

#### Border Radius
```css
border-radius: 10px;              /* Rounded corners */
border-radius: 50%;               /* Circular (if width=height) */
```

#### Margin
```css
margin: 20px;                     /* All sides */
margin: 10px 20px;                /* Vertical | Horizontal */
margin: 10px 20px 15px 5px;       /* Top | Right | Bottom | Left */

/* Individual sides */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 15px;
margin-left: 5px;
```

### Box Sizing

By default, `width` and `height` only apply to the content area. Padding and border are added on top.

```css
/* Default behavior */
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300px + 40px (padding) + 10px (border) = 350px */
}

/* Better approach - include padding and border in width */
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300px (includes padding and border) */
}
```

**Best Practice:** Use `* { box-sizing: border-box; }` globally to avoid layout surprises.

---

## Positioning & Layout

### Display Property

Controls how elements are displayed and interact with the document flow.

#### Block Elements
```css
display: block;
/* Takes full width, starts on new line */
/* Examples: div, p, h1-h6, ul, li */
```

#### Inline Elements
```css
display: inline;
/* Takes only content width, flows with text */
/* Examples: span, a, strong, em */
```

#### Inline-Block Elements
```css
display: inline-block;
/* Flows like inline but accepts width/height */
```

#### None (Hidden)
```css
display: none;
/* Completely removes from document flow */
```

### Position Property

Controls how elements are positioned in the document.

#### Static (Default)
```css
position: static;
/* Normal document flow */
/* top, right, bottom, left have no effect */
```

#### Relative
```css
position: relative;
top: 10px;      /* Moves 10px down from normal position */
left: 20px;     /* Moves 20px right from normal position */
/* Space is preserved in normal flow */
```

#### Absolute
```css
position: absolute;
top: 0;
left: 0;
/* Removed from normal flow */
/* Positioned relative to nearest positioned ancestor */
/* If no positioned ancestor, uses viewport */
```

#### Fixed
```css
position: fixed;
top: 0;
left: 0;
/* Removed from normal flow */
/* Positioned relative to viewport (stays during scroll) */
```

#### Sticky
```css
position: sticky;
top: 0;
/* Hybrid of relative and fixed */
/* Stays in normal flow until crossing threshold, then becomes fixed */
```

### Z-Index and Stacking Context

Controls which elements appear on top when they overlap.

```css
.z-index-example {
  position: relative;  /* Must be positioned */
  z-index: 1;          /* Higher values appear on top */
}
```

**Stacking Order (lowest to highest):**
1. Background and borders
2. Negative z-index elements
3. Block elements in normal flow
4. Float elements
5. Inline elements
6. Positive z-index elements

---

## Modern Layout Systems

### Flexbox (One-Dimensional Layout)

Perfect for aligning items in a single row or column.

#### Flex Container
```css
.container {
  display: flex;
  
  /* Main axis alignment */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* Cross axis alignment */
  align-items: flex-start | flex-end | center | baseline | stretch;
  
  /* Flex direction */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* Wrapping */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* Shorthand */
  flex-flow: row wrap;
}
```

#### Flex Items
```css
.item {
  /* Grow factor */
  flex-grow: 1;        /* Takes available space */
  
  /* Shrink factor */
  flex-shrink: 1;      /* Shrinks if needed */
  
  /* Initial size */
  flex-basis: 200px;   /* Initial size before growing/shrinking */
  
  /* Shorthand: grow shrink basis */
  flex: 1 1 200px;
  
  /* Individual alignment override */
  align-self: center;
}
```

#### Common Flexbox Patterns

**Center an element:**
```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Space items evenly:**
```css
.nav {
  display: flex;
  justify-content: space-between;
}
```

**Equal height columns:**
```css
.row {
  display: flex;
}
.column {
  flex: 1;  /* Equal width */
}
```

### CSS Grid (Two-Dimensional Layout)

Perfect for complex layouts with rows and columns.

#### Grid Container
```css
.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 100px 200px auto;
  grid-template-columns: 1fr 2fr 1fr;  /* Fractions */
  grid-template-columns: repeat(3, 1fr);  /* Repeat pattern */
  
  /* Define rows */
  grid-template-rows: 100px auto 200px;
  
  /* Gap between cells */
  gap: 20px;
  
  /* Alignment */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

#### Grid Items
```css
.item {
  /* Span multiple columns */
  grid-column: 1 / 3;     /* From line 1 to line 3 */
  grid-column: span 2;    /* Span 2 columns */
  
  /* Span multiple rows */
  grid-row: 1 / 3;
  grid-row: span 2;
  
  /* Place in specific cell */
  grid-column: 2;
  grid-row: 1;
}
```

#### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

### When to Use Flexbox vs Grid

**Use Flexbox when:**
- Layout is primarily one-dimensional (row OR column)
- You need to align items along a single axis
- You want flexible, content-based sizing

**Use Grid when:**
- Layout is two-dimensional (rows AND columns)
- You need precise control over both axes
- You're creating page layouts or complex grids

---

## Responsive Design

### Media Queries

Apply different styles based on device characteristics.

```css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 20px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}
```

#### Common Breakpoints
```css
/* Mobile (default) */
/* No media query needed */

/* Small tablet */
@media (min-width: 576px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Small desktop */
@media (min-width: 992px) { }

/* Large desktop */
@media (min-width: 1200px) { }
```

#### Orientation Queries
```css
/* Portrait */
@media (orientation: portrait) {
  .sidebar { display: none; }
}

/* Landscape */
@media (orientation: landscape) {
  .content { width: 100%; }
}
```

### Responsive Units

#### Viewport Units
```css
.full-height {
  height: 100vh;    /* 100% of viewport height */
}

.full-width {
  width: 100vw;     /* 100% of viewport width */
}

.min-size {
  min-height: 50vmin;  /* 50% of smaller dimension */
}
```

#### Fluid Typography
```css
/* Clamp: min, preferred, max */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Calc for calculations */
.container {
  width: calc(100% - 40px);  /* Full width minus 40px */
}
```

### Mobile-First Approach

1. **Start with mobile styles** (no media query)
2. **Progressively enhance** for larger screens
3. **Use min-width** queries (not max-width)

**Benefits:**
- Better performance on mobile
- Cleaner, more maintainable code
- Future-proof for new screen sizes

---

## Advanced Features

### Transforms

Modify the appearance of elements without affecting layout.

#### 2D Transforms
```css
.transformed {
  /* Move element */
  transform: translate(50px, 100px);
  
  /* Rotate element */
  transform: rotate(45deg);
  
  /* Scale element */
  transform: scale(1.5);        /* 150% size */
  transform: scale(0.5, 2);     /* 50% width, 200% height */
  
  /* Skew element */
  transform: skew(10deg, 20deg);
  
  /* Multiple transforms */
  transform: translate(50px, 100px) rotate(45deg) scale(1.2);
}
```

#### 3D Transforms
```css
.three-d {
  /* Enable 3D space */
  transform-style: preserve-3d;
  
  /* 3D rotation */
  transform: rotateX(45deg) rotateY(30deg);
  
  /* 3D translation */
  transform: translate3d(50px, 100px, 200px);
  
  /* Perspective */
  perspective: 1000px;
}
```

### Transitions

Smoothly animate property changes.

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: red;
  transform: translateY(-2px);
}
```

#### Transition Properties
```css
transition-property: background-color, transform;
transition-duration: 0.3s, 0.2s;
transition-timing-function: ease, ease-in-out;
transition-delay: 0s, 0.1s;

/* Shorthand */
transition: property duration timing-function delay;
```

### Animations

Create complex, multi-step animations.

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-element {
  animation: slideIn 1s ease-out;
}

/* Animation properties */
animation-name: slideIn;
animation-duration: 1s;
animation-timing-function: ease-out;
animation-delay: 0.5s;
animation-iteration-count: infinite;
animation-direction: alternate;
animation-fill-mode: forwards;
```

### Pseudo-Classes and Pseudo-Elements

#### Pseudo-Classes (State-based)
```css
/* Interactive states */
a:hover { color: red; }
button:focus { outline: 2px solid blue; }
input:disabled { background: #eee; }

/* Structural */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: #ffffff; }

/* Attribute-based */
input[type="text"] { border: 1px solid gray; }
a[target="_blank"]::after { content: " ↗"; }
```

#### Pseudo-Elements (Content-based)
```css
/* Add decorative content */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }

/* Generated content */
.btn::before { content: "▶ "; }
.quote::after { content: " — Author"; }

/* Custom bullets */
li::marker { color: blue; font-weight: bold; }
```

### CSS Custom Properties (Variables)

Define reusable values.

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 8px;
  --spacing: 16px;
}

.component {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: var(--spacing);
}

/* Override in specific contexts */
.dark-theme {
  --primary-color: #0d6efd;
  --secondary-color: #adb5bd;
}
```

#### Benefits of CSS Variables
- **Maintainability**: Change one value, update everywhere
- **Theming**: Easy dark/light mode switching
- **Calculation**: Use with `calc()` for dynamic values
- **Inheritance**: Variables cascade like other CSS properties

---

## Best Practices & Performance

### CSS Organization

#### Methodologies
- **BEM** (Block Element Modifier): `.card`, `.card__title`, `.card--featured`
- **SMACSS** (Scalable Modular Architecture)
- **OOCSS** (Object-Oriented CSS)

#### File Structure
```
styles/
├── base/           # Reset, typography, base styles
├── components/     # Reusable components
├── layout/         # Page layout styles
├── pages/          # Page-specific styles
├── utilities/      # Helper classes
└── main.css        # Main stylesheet
```

### Performance Optimization

#### Reduce Render Blocking
```css
/* Critical CSS: Inline above-the-fold styles */
<style>
  .above-the-fold { /* essential styles */ }
</style>

/* Non-critical: Load asynchronously */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### Minimize Reflows and Repaints
```css
/* Avoid animating expensive properties */
.bad {
  animation: width-change 1s;    /* Triggers reflow */
}

/* Prefer transform and opacity */
.good {
  animation: move-slide 1s;      /* GPU accelerated */
}
```

#### Efficient Selectors
```css
/* Fast */
.class { }
#id { }

/* Slow */
div > * > .class { }
ul li a span { }
```

### Accessibility Considerations

#### Color and Contrast
```css
/* Ensure sufficient contrast */
.text {
  color: #333;           /* Dark text on light background */
  background: #fff;      /* High contrast ratio */
}

/* Don't rely on color alone */
.icon::after {
  content: " (required)";
  color: red;
}
```

#### Focus Management
```css
/* Visible focus indicators */
button:focus {
  outline: 3px solid #007bff;
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
```

#### Reduced Motion
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Debugging Techniques

#### Browser DevTools
- **Computed tab**: See final computed styles
- **Box model**: Visualize padding, border, margin
- **Forced states**: Test `:hover`, `:focus`, etc.
- **Layout panel**: Inspect grid/flex layouts

#### CSS Linting
```css
/* Use tools like stylelint for consistent code */
/* Example configuration */
{
  "rules": {
    "color-hex-case": "lower",
    "declaration-colon-space-after": "always",
    "indentation": 2
  }
}
```

---

## Practical Examples & Exercises

### Exercise 1: Navigation Bar

**Goal**: Create a responsive navigation bar using Flexbox.

```html
<nav class="navbar">
  <div class="logo">Brand</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: #555;
}
```

### Exercise 2: Card Layout

**Goal**: Create a responsive card grid using CSS Grid.

```html
<div class="card-grid">
  <div class="card">
    <img src="image1.jpg" alt="Card 1">
    <h3>Card Title 1</h3>
    <p>Card description goes here.</p>
  </div>
  <!-- Repeat for more cards -->
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card h3 {
  padding: 1rem 1rem 0.5rem;
  margin: 0;
}

.card p {
  padding: 0 1rem 1rem;
  color: #666;
}
```

### Exercise 3: Modal Dialog

**Goal**: Create an accessible modal using positioning and z-index.

```html
<div class="modal-overlay" id="modal">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="close-btn" aria-label="Close modal">×</button>
    <h2 id="modal-title">Modal Title</h2>
    <p>Modal content goes here.</p>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none; /* Hidden by default */
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Show modal */
.modal-overlay.active {
  display: flex;
}
```

### Exercise 4: Responsive Image Gallery

**Goal**: Create a responsive image gallery with hover effects.

```html
<div class="gallery">
  <div class="gallery-item">
    <img src="image1.jpg" alt="Gallery image 1">
    <div class="overlay">
      <h3>Image Title</h3>
      <p>Image description</p>
    </div>
  </div>
  <!-- More gallery items -->
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 2rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .overlay {
  transform: translateY(0);
}
```

---

## Quick Reference

### CSS Properties Cheat Sheet

#### Layout
```css
/* Display */
display: block | inline | inline-block | none | flex | grid;

/* Position */
position: static | relative | absolute | fixed | sticky;

/* Box Model */
width, height, padding, margin, border, border-radius;

/* Flexbox */
display: flex;
justify-content, align-items, flex-direction, flex-wrap;

/* Grid */
display: grid;
grid-template-columns, grid-template-rows, gap;
```

#### Typography
```css
font-family, font-size, font-weight, line-height;
text-align, text-decoration, text-transform;
color, background-color;
```

#### Effects
```css
/* Transforms */
transform: translate() | rotate() | scale() | skew();

/* Transitions */
transition: property duration timing-function delay;

/* Animations */
animation: name duration timing-function delay iteration-count direction;
```

### Common Patterns

#### Centering
```css
/* Block element */
margin: 0 auto;

/* Flexbox centering */
display: flex;
justify-content: center;
align-items: center;

/* Absolute centering */
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
```

#### Responsive Images
```css
img {
  max-width: 100%;
  height: auto;
}
```

#### Clearfix
```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

### Browser Support Notes

- **Flexbox**: IE10+, all modern browsers
- **Grid**: IE11+ (partial), all modern browsers
- **CSS Variables**: IE not supported, all modern browsers
- **Grid Gap**: IE not supported, all modern browsers

### Performance Tips

1. **Use `transform` and `opacity`** for animations (GPU accelerated)
2. **Avoid animating layout properties** like `width`, `height`, `margin`
3. **Use `will-change`** to hint browser about upcoming changes
4. **Minimize selector complexity** - keep selectors simple
5. **Use `box-sizing: border-box`** globally to avoid layout surprises

---

## Practice Sets (Based on PDF Exercises)

### Practice Set 1: Basic Styling
Create a simple div with an id "box". Add some text content inside the div. Set its background color to blue.

### Practice Set 2: Text Properties
Create 3 headings with h1, h2 & h3. Give them all a class "heading" & set color of "heading" to red. Create a button & set its background color to green using css stylesheet, blue using `<style>` tag, pink using inline style.

### Practice Set 3: Box Model
Create a div with height & width of 100px. Set its background color to green & the border radius to 50%. Create the navbar from the PDF examples.

### Practice Set 4: Layout
Create a webpage layout with a header, a footer & a content area containing 3 divs. Set the height & width of divs to 100px. Add borders to all the divs. Add a different background color to each div with an opacity of 0.5.

### Practice Set 5: Positioning
Create the following layout using the given html. Use the appropriate position property for the div element to place it at the right end of the page. (The div should not move even on scroll) Use z-index to place the div on top of page. Give the div a height, width & some background image.

### Practice Set 6: Flexbox
Create a navbar with 4 options in the form of anchor tags inside list items. Now, use flexbox to place them all spaced equally in a single line. Use flexbox to center one div inside another div. Which has higher priority - align-items or align-self?

### Practice Set 7: Media Queries
Add a media query to implement the following: the color of a div changes to green for viewport width less than 300px, pink for width between 300px & 400px, red for width between 400px & 600px, blue for width above 600px.

### Practice Set 8: Animations
Create a simple loader using CSS. Step 1: create a div with circular shape & a thick border from one end. Step 2: To make it spin create an animation which transforms it from 0deg to 360deg. Step 3: Add the animation property to the loader with infinite duration.

---

**Remember**: CSS is about experimentation and practice. Try these examples, modify them, and create your own variations to truly master the concepts!
