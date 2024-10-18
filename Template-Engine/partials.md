# **Template Inheritance and Partials in Express.js**

Template inheritance and partials are two powerful features provided by most templating engines to make your templates more maintainable and reusable. These concepts allow you to define common layouts or sections of HTML code (like headers, footers, and navigation bars) and reuse them across multiple pages of your application.

---

## **1. Template Inheritance**

Template inheritance refers to the ability of a child template to "inherit" a base layout or structure defined in a parent template. This allows for the reuse of common components across different pages, like a header or footer.

### **1.1. Example in Pug**

Pug (formerly known as Jade) supports template inheritance through the `extends` and `block` keywords.

#### **Step 1: Define a Base Layout (`views/layout.pug`)**

```pug
doctype html
html
  head
    title= title
  body
    header
      h1 My Website
    block content
    footer
      p © 2024 My Website
```

This is a base layout template with a common header and footer. The `block content` indicates that child templates can inject their own content in this area.

##### **Step 2: Create a Child Template (`views/index.pug`)**

```pug
extends layout

block content
  h2 Welcome to the Homepage
  p This is the main content of the homepage.
```

The `extends layout` tells Pug that this template inherits the layout defined in `layout.pug`. The `block content` section replaces the `block content` placeholder in the layout.

##### **Step 3: Render the Child Template**

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', { title: 'Homepage' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

When visiting the homepage, the base layout will be rendered with the content defined in `index.pug`, resulting in a reusable structure for different pages.

#### **1.2. Example in EJS**

EJS (Embedded JavaScript) uses `partials` and simple includes for template inheritance.

##### **Step 1: Define a Base Layout (`views/layout.ejs`)**

```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  
  <%- body %>

  <footer>
    <p>© 2024 My Website</p>
  </footer>
</body>
</html>
```

In EJS, `<%- body %>` is used to inject the content of the child templates.

##### **Step 2: Create a Child Template (`views/index.ejs`)**

```html
<h2>Welcome to the Homepage</h2>
<p>This is the main content of the homepage.</p>
```

##### **Step 3: Render the Child Template with the Layout**

In the route, you can combine the layout with the child content by rendering the layout and passing the content as a variable:

```javascript
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'views', 'index.ejs'), 'utf-8', (err, content) => {
    res.render('layout', { title: 'Homepage', body: content });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

In this example, the child template (`index.ejs`) is read and passed as the `body` to the layout, which combines it into one final HTML page.

---

### **2. Partials for Reusability**

Partials are small template fragments that you can include and reuse in other templates. Common examples of partials are navigation bars, sidebars, headers, and footers.

#### **2.1. Using Partials in EJS**

In EJS, partials are included using the `<%- include() %>` function, which allows you to include the content of another file.

##### **Example: Header Partial (`views/partials/header.ejs`)**

```html
<header>
  <h1>Welcome to My Website</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>
```

##### **Example: Footer Partial (`views/partials/footer.ejs`)**

```html
<footer>
  <p>© 2024 My Website</p>
</footer>
```

##### **Main Template Including Partials (`views/index.ejs`)**

```html
<%- include('partials/header') %>

<h2>Main Content of the Page</h2>
<p>This is the body of the homepage.</p>

<%- include('partials/footer') %>
```

In this example, the header and footer are stored in partials and included in the main template, making them reusable across different pages.

##### **Rendering the Page with Partials**

```javascript
app.get('/', (req, res) => {
  res.render('index', { title: 'Homepage' });
});
```

When visiting the homepage, the `header` and `footer` partials will be injected into the main content, resulting in a complete HTML page.

#### **2.2. Using Partials in Pug**

In Pug, partials are included using the `include` keyword.

##### **Example: Header Partial (`views/partials/header.pug`)**

```pug
header
  h1 Welcome to My Website
  nav
    ul
      li: a(href='/') Home
      li: a(href='/about') About
      li: a(href='/contact') Contact
```

##### **Example: Footer Partial (`views/partials/footer.pug`)**

```pug
footer
  p © 2024 My Website
```

##### **Main Template Including Partials (`views/index.pug`)**

```pug
include partials/header

h2 Main Content of the Page
p This is the body of the homepage.

include partials/footer
```

When this Pug template is rendered, the `header` and `footer` partials will be included in the final HTML output.

---

### **3. Conclusion**

Template inheritance and partials greatly enhance the maintainability of web applications by allowing developers to reuse common code across multiple pages. Templating engines like Pug and EJS make this process seamless. By using these features, you can maintain a consistent layout across your application and avoid code duplication, making your application easier to update and scale.

- **Template Inheritance**: Enables the creation of a base layout that child templates can extend.
- **Partials**: Allows the inclusion of reusable components (like headers and footers) in multiple templates.
