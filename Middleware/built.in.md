# **Built-In Middleware in Express.js**

Express.js comes with several built-in middleware functions that simplify common tasks like parsing request bodies, serving static files, and handling form submissions. These middleware functions make it easy to manage data coming from the client and perform actions such as serving static assets (CSS, JavaScript, images, etc.).

---

## **1. `express.json()` and `express.urlencoded()` Middleware**

### **1.1. `express.json()`**

The `express.json()` middleware parses incoming requests with JSON payloads and makes the parsed data available in the `req.body` object. This middleware is essential for handling API requests where data is sent in JSON format.

#### **Example of `express.json()`:**

```javascript
const express = require('express');
const app = express();

// Use express.json() middleware
app.use(express.json());

app.post('/api/data', (req, res) => {
  // Access JSON data sent in the request body
  const data = req.body;
  res.send(`Received data: ${JSON.stringify(data)}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**: In this example, the `express.json()` middleware allows the server to handle incoming JSON data. When the client sends a `POST` request with a JSON body, the data can be accessed via `req.body`.

---

#### **1.2. `express.urlencoded()`**

The `express.urlencoded()` middleware parses incoming requests with URL-encoded payloads (typically from HTML form submissions). This middleware is used for processing form data, making it available in `req.body`.

- **`extended` Option**:
  - When set to `true`, it allows parsing of complex, nested objects (like arrays or objects).
  - When set to `false`, it uses the traditional `querystring` library for simpler key-value pairs.

##### **Example of `express.urlencoded()` (with HTML form):**

```html
<!-- index.html -->
<form action="/submit" method="POST">
  <input type="text" name="username" placeholder="Enter your name" />
  <button type="submit">Submit</button>
</form>
```

```javascript
const express = require('express');
const app = express();

// Use express.urlencoded() middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  // Access form data sent in the request body
  const username = req.body.username;
  res.send(`Received form submission: ${username}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**: This example shows how `express.urlencoded()` parses form data (in URL-encoded format) from an HTML form submission. The form data is then accessible in `req.body`.

---

### **2. `express.static()` Middleware**

The `express.static()` middleware is used to serve static files such as HTML, CSS, JavaScript, and images. It allows you to expose a folder or directory to serve static content for your web application.

#### **How `express.static()` Works:**

- **Syntax**: `app.use(express.static(path_to_directory))`
- Express will serve all the files within the specified folder when requested through their paths.
  
##### **Example of `express.static()` Middleware:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**: In this example, the `express.static()` middleware serves all files from the `public` directory. If there’s an `index.html` file inside the `public` folder, it will be served when accessing the root URL (`/`). Other assets like CSS or images can also be served from this folder.

#### **Example Directory Structure for `express.static()`**

```bash
project/
│
├── app.js
└── public/
    ├── css/
    │   └── styles.css
    ├── images/
    │   └── logo.png
    └── index.html
```

- Access the CSS file: `http://localhost:3000/css/styles.css`
- Access the image: `http://localhost:3000/images/logo.png`
- Access `index.html`: `http://localhost:3000/`

---

### **3. Body Parsing in Express.js**

Body parsing refers to reading the incoming request body and parsing the data into a format that the server can use. This is a crucial step for APIs and form handling in web applications.

#### **3.1. JSON Body Parsing (`express.json()`)**

This is used to handle JSON payloads from the client. For example, in an API that expects JSON data from the client, you would use `express.json()` to parse the incoming request body.

##### **Example of JSON Body Parsing:**

```javascript
app.use(express.json());

app.post('/api/users', (req, res) => {
  const user = req.body;  // req.body will contain the parsed JSON
  res.send(`User received: ${user.name}, ${user.email}`);
});
```

- **Explanation**: The server expects the client to send JSON data like `{"name": "John", "email": "john@example.com"}`. `express.json()` parses the JSON and makes it available in `req.body`.

#### **3.2. URL-encoded Body Parsing (`express.urlencoded()`)**

This is used for form submissions with `application/x-www-form-urlencoded` content type. When a form is submitted, the key-value pairs are URL-encoded, and `express.urlencoded()` parses the data into `req.body`.

##### **Example of URL-encoded Body Parsing:**

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const formData = req.body;
  res.send(`Form data received: ${formData.name}, ${formData.email}`);
});
```

- **Explanation**: When an HTML form is submitted, `express.urlencoded()` parses the URL-encoded form data and makes it accessible in `req.body`.

#### **3.3. File Upload Handling with Middleware**

To handle file uploads, Express doesn’t provide a built-in solution, but you can use third-party middleware like `multer`.

##### **Example Using `multer` for File Uploads:**

```bash
npm install multer
```

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send(`File uploaded: ${req.file.originalname}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - Here, we use the `multer` middleware to handle file uploads. The uploaded file is stored in the `uploads` directory, and the file details are available in `req.file`.
  - The client would upload a file through a form, and the server can process it using the middleware.

---

### **4. Subtopics Summary**

#### **4.1. `express.json()`**

- Parses JSON data from incoming requests.
- Used when API clients send JSON data.
- Data is made available in `req.body`.

#### **4.2. `express.urlencoded()`**

- Parses URL-encoded data (form submissions).
- Handles HTML form data.
- Data is made available in `req.body`.
- Supports `extended: true` for parsing nested objects.

#### **4.3. `express.static()`**

- Serves static files like HTML, CSS, JavaScript, images.
- Specifies a folder to expose files to the client.
- Useful for serving assets in web applications.

#### **4.4. Body Parsing**

- Refers to parsing incoming data from requests (JSON, form data).
- Crucial for handling API requests and form submissions.
- JSON data is parsed with `express.json()`.
- URL-encoded data (form submissions) is parsed with `express.urlencoded()`.

---

### **Conclusion**

Express.js provides essential built-in middleware for common tasks like body parsing (`express.json()` and `express.urlencoded()`) and serving static files (`express.static()`). Understanding these middleware functions is key to building scalable and robust Express applications, allowing efficient handling of various types of client data.
