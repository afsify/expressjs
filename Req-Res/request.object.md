# **Request Object (`req`) in Express.js**

In Express.js, the `req` (request) object represents the incoming HTTP request and contains various properties and methods that provide details about the request. These properties allow the server to access and manipulate data sent by the client, such as parameters, query strings, and the body of the request.

---

## **1. Key Properties of the Request Object (`req`)**

### **1.1. `req.body`**

The `req.body` property contains data that is submitted in the body of the HTTP request. This property is mainly used in `POST`, `PUT`, or `PATCH` requests where form data or JSON is sent to the server.

To parse `req.body`, middleware like `express.json()` and `express.urlencoded()` are required.

**Common Use Cases**:

- Submitting form data (e.g., user registration, contact forms)
- Sending JSON data (e.g., APIs sending structured data)

**Example: Handling Form Data (Using `express.urlencoded()`)**

```javascript
const express = require('express');
const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
  const name = req.body.name;  // Access form field 'name'
  const email = req.body.email;  // Access form field 'email'
  res.send(`Form submitted with Name: ${name}, Email: ${email}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - `express.urlencoded()` is used to parse form data. When the form is submitted, the server can access the form fields via `req.body.name` and `req.body.email`.

**Example: Handling JSON Data (Using `express.json()`)**

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.post('/submit-json', (req, res) => {
  const { username, age } = req.body;  // Destructure JSON data
  res.send(`Received JSON with Username: ${username}, Age: ${age}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - `express.json()` parses incoming JSON requests. The server can access the submitted JSON fields through `req.body`.

---

#### **1.2. `req.query`**

The `req.query` property contains the query string parameters sent in the URL of an HTTP request. Query strings are often used to filter or search for data and are appended to the URL after a `?`.

**Common Use Cases**:

- Searching for products (e.g., `/products?category=shoes&price=low`)
- Filtering and sorting data
- Pagination (e.g., `/articles?page=2&limit=10`)

- **Example: Handling Query Strings**

```javascript
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const category = req.query.category;  // Access the 'category' query parameter
  const price = req.query.price;  // Access the 'price' query parameter
  res.send(`Searching for Category: ${category}, Price Range: ${price}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The URL `/search?category=shoes&price=low` would extract the query parameters, making them available through `req.query.category` and `req.query.price`.

---

#### **1.3. `req.params`**

The `req.params` property contains route parameters, which are defined as part of the URL path. Route parameters are dynamic segments of the URL that can be used to access specific resources, such as user profiles or product details.

**Common Use Cases**:

- Accessing user profiles by ID (e.g., `/users/:id`)
- Accessing blog posts by slug or ID (e.g., `/blog/:postId`)

- **Example: Handling Route Parameters**

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;  // Access the dynamic route parameter 'id'
  res.send(`User Profile for ID: ${userId}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - In this example, `/user/:id` defines a dynamic route parameter. The value passed in the URL (e.g., `/user/123`) can be accessed using `req.params.id`.

---

### **2. Handling Form Data and JSON**

#### **2.1. Handling Form Data**

Form data is typically submitted in `POST` requests using `application/x-www-form-urlencoded` encoding. Express requires the `express.urlencoded()` middleware to parse this data.

- **Example: Basic HTML Form Submission**

```html
<form action="/submit-form" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <button type="submit">Submit</button>
</form>
```

**Server-side Handling**:

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
  const { name, email } = req.body;
  res.send(`Form submitted: Name - ${name}, Email - ${email}`);
});
```

#### **2.2. Handling JSON Data**

APIs typically send and receive data in JSON format. Express.js provides the `express.json()` middleware to parse incoming JSON data.

- **Example: Sending JSON from Client (with fetch API)**

```javascript
fetch('/submit-json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'JohnDoe', age: 30 })
});
```

**Server-side Handling**:

```javascript
app.use(express.json());

app.post('/submit-json', (req, res) => {
  const { username, age } = req.body;
  res.send(`Received JSON: Username - ${username}, Age - ${age}`);
});
```

---

### **3. Subtopics Summary**

#### **3.1. `req.body`**

- **Purpose**: Contains data sent in the body of `POST`, `PUT`, and `PATCH` requests.
- **Common Uses**: Handling form submissions and JSON data.
- **Example**: Parsing form data using `express.urlencoded()` and JSON data using `express.json()`.

#### **3.2. `req.query`**

- **Purpose**: Contains the query string parameters sent in the URL.
- **Common Uses**: Searching, filtering, and pagination.
- **Example**: Accessing query strings like `/search?category=shoes&price=low`.

#### **3.3. `req.params`**

- **Purpose**: Contains dynamic route parameters defined in the URL.
- **Common Uses**: Accessing specific resources like `/user/:id` or `/product/:productId`.
- **Example**: Extracting the route parameter from `/user/123` using `req.params.id`.

---

### **4. Conclusion**

The request object (`req`) in Express.js provides powerful tools for accessing data sent by the client. By understanding and effectively utilizing `req.body`, `req.query`, and `req.params`, developers can handle form submissions, API requests, and dynamic URLs with ease. These features are essential for building interactive, data-driven web applications.
