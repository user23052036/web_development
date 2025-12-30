
---

## Table of contents

1. Introduction & purpose
2. Basic HTML page (example)
3. Comments & case-sensitivity
4. Document structure & semantic layout tags
5. Text content & formatting tags
6. Grouping / container tags (block vs inline)
7. Lists
8. Tables (thead/tbody, caption, colspan)
9. Forms & form controls (inputs, labels, textarea, select)
10. Links & images (anchor, img)
11. Multimedia (video, iframe)
12. Misc / other commonly used tags (hr, br, pre, sub/sup)
13. Attributes (common + examples)
14. Quick reference: tags list (all tags from notes)
15. Best practices and notes

---

## 1. Introduction

**HTML (HyperText Markup Language)** is the language used to structure a web page and its content. The building blocks are *tags* — each tag usually surrounds content and defines its role. (See the structure diagram in your PDF.)

---

## 2. Basic HTML page (example)

A minimal HTML5 page and brief explanation (from the notes / page with "Basic HTML Page"):

```html
<!DOCTYPE html>          <!-- tells browser you are using HTML5 -->
<html lang="en">         <!-- root of document; lang attribute -->
  <head>                 <!-- container for metadata -->
    <meta charset="utf-8">
    <title>My First Page</title>  <!-- page title shown in browser tab -->
  </head>
  <body>                 <!-- contains all data rendered by the browser -->
    <p>Hello world</p>    <!-- paragraph tag -->
  </body>
</html>
```

---

## 3. Comments & case-sensitivity

* HTML comment syntax:

```html
<!-- This is an HTML comment -->
```

* HTML is **not** case-sensitive: `<p>` == `<P>`, `<html>` == `<HTML>`. (Reference: notes page mentioning case insensitivity.)

---

## 4. Document structure & semantic layout tags

Use semantic tags to structure layout and improve accessibility / SEO.

* `<header>` — top section of a page or section (logo, nav, heading).
* `<main>` — primary content for the page.
* `<footer>` — page footer (copyright, links).
* `<section>` — logical section of content (grouping, often with a heading).
* `<article>` — self-contained content that could be distributed (blog post, news item).
* `<aside>` — content tangential to the main content (ads, side notes).
* `<nav>` — navigation links.

**Example layout:**

```html
<body>
  <header>...site header...</header>
  <nav>...main nav...</nav>
  <main>
    <article>...article 1...</article>
    <section>...a section...</section>
    <aside>...sidebar/ads...</aside>
  </main>
  <footer>...footer...</footer>
</body>
```

(See "Page Layout Techniques" in your notes.)

---

## 5. Text content & formatting tags

### Headings

`<h1>` (most important) down to `<h6>` (least important)

```html
<h1>Main heading</h1>
<h2>Subheading</h2>
```

### Paragraph

`<p>` — paragraphs

```html
<p>This is a sample paragraph.</p>
```

### Inline/text formatting

* `<b>` — bold (visual emphasis)
* `<i>` — italic
* `<u>` — underline
* `<strong>` — strong importance (semantic for accessibility)
* `<em>` — emphasis (semantic)
* `<big>` / `<small>` — bigger or smaller text
* `<sub>` — subscript (H<sub>2</sub>O)
* `<sup>` — superscript (A<sup>n</sup>)

Example:

```html
<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>
<p>Water: H<sub>2</sub>O</p>
```

### Preformatted text

`<pre>` — preserves whitespace and line breaks:

```html
<pre>
  This
    is preformatted text.
</pre>
```

---

## 6. Grouping / container tags (block vs inline)

### Block-level (take full width)

* `<div>` — generic block container
* Semantic block tags: `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<aside>`, `<figure>`, `<figcaption>`, `<form>`, `<table>`, `<fieldset>` etc.

### Inline (take width as needed)

* `<span>` — generic inline container
* Text-level inline tags: `<a>`, `<abbr>`, `<b>`, `<code>`, `<em>`, `<img>`, `<input>`, `<label>`, `<time>`, `<q>`, `<samp>`, `<kbd>`, `<var>`, `<output>`, etc.

---

## 7. Lists

### Unordered list

```html
<ul>
  <li>Apple</li>
  <li>Mango</li>
</ul>
```

### Ordered list

```html
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
```

(Notes: Lists are used to represent real-life list data.)

---

## 8. Tables

Basic table elements:

* `<table>` — table container
* `<caption>` — optional caption/title for table
* `<thead>` — wrap table head row(s)
* `<tbody>` — wrap table body rows
* `<tr>` — table row
* `<th>` — table header cell
* `<td>` — table data cell
* `colspan="n"` — make a cell span multiple columns

Example:

```html
<table>
  <caption>Student Data</caption>
  <thead>
    <tr><th>Name</th><th>Roll No</th></tr>
  </thead>
  <tbody>
    <tr><td>Shradha</td><td>1664</td></tr>
    <tr><td>Aman</td><td>1890</td></tr>
  </tbody>
</table>
```

(See table notes & caption example in the PDF.)

---

## 9. Forms & form controls

### Form element

```html
<form action="/action.php" method="post">
  <!-- form content -->
</form>
```

* `action` attribute defines where the submission is sent.

### Common inputs

* Text input:

```html
<input type="text" name="username" placeholder="Enter Name">
```

* Radio buttons:

```html
<input type="radio" id="r1" name="class" value="classX">
<label for="r1">Class X</label>
```

* Checkboxes:

```html
<input type="checkbox" id="c1" name="subscribe">
<label for="c1">Subscribe</label>
```

* Textarea:

```html
<textarea id="feedback" name="feedback" placeholder="Please add feedback"></textarea>
```

* Select (dropdown):

```html
<select name="city" id="city">
  <option value="Delhi">Delhi</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Bangalore">Bangalore</option>
</select>
```

(Notes: labeling inputs correctly with `<label for="id">` improves accessibility.)

---

## 10. Links & images

### Anchor (links)

```html
<a href="https://google.com">Google</a>
<!-- open in new tab -->
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
<!-- clickable image -->
<a href="https://example.com"><img src="/img.png" alt="Example"></a>
```

(Notes: `target="_blank"` opens in a new tab — PDF shows `target="_main"` as example.)

### Image

```html
<img src="/image.png" alt="Random Image" width="200" height="150">
```

* `alt` is required for accessibility and SEO.
* Use `width` / `height` attributes or control via CSS.

---

## 11. Multimedia

### Video

```html
<video src="myVid.mp4" controls width="640" height="360" loop autoplay>
  Your browser does not support the video tag.
</video>
```

Attributes: `controls`, `height`, `width`, `loop`, `autoplay`. (From notes.)

### iframe

Embed a website inside a page:

```html
<iframe src="https://example.com" width="800" height="600" title="Embedded site"></iframe>
```

---

## 12. Misc / other commonly used tags

* `<br>` — line break (self-closing).
* `<hr>` — horizontal rule / separator.
* `<blockquote>` — long quoted text.
* `<figure>` / `<figcaption>` — image and its caption.
* `<canvas>` — drawing area for graphics.
* `<map>` / `<area>` — image maps.
* `<object>` — embed external resources.
* `<noscript>` — content shown when JS disabled.
  (These appear across the tag lists in your notes.)

---

## 13. Attributes (common)

* Global attributes: `id`, `class`, `lang`, `title`, `style`, `data-*`.
* Link/image attributes: `href`, `src`, `alt`, `target`.
* Form/control attributes: `type`, `name`, `value`, `placeholder`, `checked`, `disabled`, `action` (on `<form>`).
* Media attributes: `controls`, `autoplay`, `loop`, `muted`, `width`, `height`.

Example: `<html lang="en">` (notes show this).

---

## 14. Quick reference — tags list (from your notes)

Below is a consolidated list of tags shown in the PDF. Short description next to each:

* `<!DOCTYPE>` — declare HTML version (HTML5)
* `<html>` — root element
* `<head>` — metadata container
* `<meta>` — metadata (charset, viewport)
* `<title>` — page title
* `<body>` — page content
* `<header>` — page/section header
* `<nav>` — navigation
* `<main>` — main content
* `<section>` — document section
* `<article>` — self-contained composition
* `<aside>` — aside / tangential content
* `<footer>` — page footer
* `<h1>-<h6>` — headings
* `<p>` — paragraph
* `<a>` — anchor / link
* `<img>` — image
* `<figure>` — image wrapper
* `<figcaption>` — image caption
* `<ul>` / `<ol>` / `<li>` — lists
* `<table>` / `<caption>` / `<thead>` / `<tbody>` / `<tr>` / `<th>` / `<td>` — tables
* `<form>` / `<input>` / `<textarea>` / `<select>` / `<option>` / `<label>` / `<fieldset>` — forms & controls
* `<button>` — clickable button
* `<iframe>` — embed another page
* `<video>` — video element
* `<audio>` — audio element (not explicitly in your notes but common)
* `<canvas>` — drawing surface
* `<script>` — JS script
* `<noscript>` — fallback when JS disabled
* `<style>` — inline CSS (in head)
* `<div>` — block container
* `<span>` — inline container
* `<strong>` / `<em>` / `<b>` / `<i>` / `<u>` — text semantics/formatting
* `<small>` / `<big>` — size modifiers
* `<br>` — line break
* `<hr>` — horizontal rule
* `<pre>` — preformatted text
* `<sub>` / `<sup>` — subscript / superscript
* `<q>` — short inline quote
* `<cite>` — citation
* `<code>` / `<samp>` / `<kbd>` — code and sample tags
* `<var>` — variable
* `<output>` — output from scripts/calculations
* `<map>` / `<area>` — image map
* `<object>` — embed external content
* `<progress>` / `<meter>` — progress / measurement (useful to know)
  (These reflect the lists and examples in the uploaded class notes.)

---

## 15. Best practices & quick tips

* Always set `<!DOCTYPE html>` and `<meta charset="utf-8">`.
* Use semantic tags (`<main>`, `<article>`, `<section>`, `<nav>`) for accessibility and SEO.
* Use `alt` on images; pair inputs with `<label for="id">`.
* Prefer `<strong>`/`<em>` for semantic emphasis rather than only `<b>`/`<i>`.
* Avoid inline styles; use CSS files.
* Keep HTML valid and well-indented for readability.
* Use `rel="noopener"` with `target="_blank"` for security.

---

## How to use this `.md`

* Save as `notes.md`. It can be used directly in a GitHub repo README or rendered on a static site generator.
* Code blocks contain ready-to-use HTML snippets if you want to paste them into an `.html` file.
* The PDF diagrams and slide examples are a useful visual companion — see source.

---
