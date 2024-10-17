# **Integrating a Templating Engine in Express.js**

Integrating a templating engine into an Express.js application is crucial for rendering dynamic HTML pages. This process involves setting up the templating engine as the view engine and using it to render HTML content based on dynamic data passed from the server.

---

## **1. Setting Up a View Engine**

To integrate a templating engine in Express.js, you first need to install the chosen engine and configure it within your application. The following steps outline how to set up a view engine using examples for popular engines like EJS and Pug.

### **1.1. Installing the Templating Engine**

You can install the templating engine using npm. Here’s how to do it for both EJS and Pug.

#### **Example: Installing EJS**

```bash
npm install ejs
```

##### **Example: Installing Pug**

```bash
npm install pug
```

#### **1.2. Configuring the View Engine**

After installing the templating engine, configure it in your Express application. This involves setting the view engine and specifying the directory where your template files are located.

##### **Example: Setting Up EJS**

```javascript
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

##### **Example: Setting Up Pug**

```javascript
const express = require('express');
const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');

// Set the views directory
app.set('views', './views');

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### **2. Rendering HTML with Dynamic Content Using `res.render()`**

Once the templating engine is set up, you can render HTML pages dynamically using the `res.render()` method. This method takes the name of the template file and an object containing the data to be passed to the template.

#### **2.1. Creating Template Files**

You need to create template files in the specified views directory. The template files will contain HTML with placeholders for dynamic content.

##### **Example: Creating an EJS Template (`views/index.ejs`)**

```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome to <%= title %></h1>
  <ul>
    <% items.forEach(function(item) { %>
      <li><%= item %></li>
    <% }); %>
  </ul>
</body>
</html>
```

##### **Example: Creating a Pug Template (`views/index.pug`)**

```pug
doctype html
html
  head
    title= title
  body
    h1 Welcome to #{title}
    ul
      each item in items
        li= item
```

#### **2.2. Rendering the Template with Dynamic Data**

Now, set up a route in your Express application to render the template and pass dynamic data to it.

##### **Example: Rendering an EJS Template**

```javascript
app.get('/', (req, res) => {
  const data = {
    title: 'My EJS Page',
    items: ['Item 1', 'Item 2', 'Item 3'],
  };
  res.render('index', data);
});
```

##### **Example: Rendering a Pug Template**

```javascript
app.get('/', (req, res) => {
  const data = {
    title: 'My Pug Page',
    items: ['Item A', 'Item B', 'Item C'],
  };
  res.render('index', data);
});
```

#### **2.3. Full Example: Express Application with EJS**

Here’s a complete example of an Express application that uses EJS as the templating engine:

```javascript
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Define a route to render the EJS template
app.get('/', (req, res) => {
  const data = {
    title: 'My EJS Page',
    items: ['Item 1', 'Item 2', 'Item 3'],
  };
  res.render('index', data);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

#### **2.4. Full Example: Express Application with Pug**

Here’s a complete example of an Express application that uses Pug as the templating engine:

```javascript
const express = require('express');
const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Define a route to render the Pug template
app.get('/', (req, res) => {
  const data = {
    title: 'My Pug Page',
    items: ['Item A', 'Item B', 'Item C'],
  };
  res.render('index', data);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### **3. Conclusion**

Integrating a templating engine into an Express.js application is a straightforward process that enhances the ability to render dynamic content. By setting up the view engine and using the `res.render()` method, developers can create dynamic HTML pages that respond to user input and display data effectively. This integration is essential for building modern web applications that provide rich user experiences.
