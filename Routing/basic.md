# **Basic Routing**

Routing refers to how an application responds to client requests for specific URLs or endpoints. In Express.js, routing is used to define the structure of URLs and how the application responds to those URLs with various HTTP methods (GET, POST, PUT, DELETE). Express.js offers a simple and flexible routing mechanism.

---

## **1. Defining Routes in Express.js**

A **route** in Express.js is composed of:

- **Path (URL)**: The route path or endpoint.
- **HTTP Method**: The type of request (GET, POST, PUT, DELETE, etc.).
- **Callback function**: A function that gets executed when the route is matched.

### **Example of Defining a Basic Route:**

```javascript
const express = require('express');
const app = express();

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

In this example, we define a route for the root URL `/`. When a GET request is made to this URL, the server responds with the text "Hello, World!".

---

### **2. Route Methods: GET, POST, PUT, DELETE**

Express.js allows you to define routes for various HTTP methods. Here are the four primary ones:

- **GET**: Used to request data from a server (read).
- **POST**: Used to send data to a server (create).
- **PUT**: Used to update data on the server (update).
- **DELETE**: Used to delete data from the server (delete).

#### **Examples of Different Route Methods:**

```javascript
// GET method route: Retrieve data
app.get('/user', (req, res) => {
  res.send('GET request to /user');
});

// POST method route: Create data
app.post('/user', (req, res) => {
  res.send('POST request to /user');
});

// PUT method route: Update data
app.put('/user/:id', (req, res) => {
  res.send(`PUT request to /user with ID: ${req.params.id}`);
});

// DELETE method route: Delete data
app.delete('/user/:id', (req, res) => {
  res.send(`DELETE request to /user with ID: ${req.params.id}`);
});
```

In these examples:

- `app.get()` handles retrieving user information.
- `app.post()` handles creating new user information.
- `app.put()` updates the information of a user based on their ID.
- `app.delete()` deletes a user based on their ID.

---

### **3. Route Parameters**

Route parameters are placeholders in route paths, defined using the `:` symbol. They allow you to capture values from the URL and use them in your application logic.

#### **Example of Using Route Parameters:**

```javascript
// Define a route with a parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;  // Extract the ID from the URL
  res.send(`User ID is: ${userId}`);
});
```

- In this case, `:id` is the route parameter. When the client sends a GET request to `/user/123`, the server responds with "User ID is: 123".
  
- You can also define multiple route parameters:

  ```javascript
  app.get('/user/:userId/post/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.send(`User ID: ${userId}, Post ID: ${postId}`);
  });
  ```

---

### **4. Query Strings**

Query strings are key-value pairs that come after the `?` in the URL. They are typically used to pass additional data to the server.

#### **Example of Using Query Strings:**

```javascript
app.get('/search', (req, res) => {
  const { query } = req.query;  // Extract the 'query' value from the query string
  res.send(`Search query is: ${query}`);
});
```

- If the user visits `/search?query=express`, the server will respond with "Search query is: express".
  
- Multiple query parameters can be passed:

  ```javascript
  app.get('/search', (req, res) => {
    const { query, page } = req.query;  // Extract multiple query string values
    res.send(`Search query is: ${query}, Page: ${page}`);
  });
  ```

  Example URL: `/search?query=express&page=2`

---

### **5. Serving Static Files**

Express can serve static files like HTML, CSS, JavaScript, and images from a directory. Static files are files that don’t change and can be directly served to the client (like CSS files for styling).

#### **Serving Static Files Example:**

1. **Create a folder named `public`** in your project directory.

   Place your static files (like `style.css` or `index.html`) inside this folder.

2. **Serve the `public` directory using `express.static()`:**

   ```javascript
   // Serve files from the 'public' directory
   app.use(express.static('public'));

   app.listen(3000, () => {
     console.log('Server running on http://localhost:3000');
   });
   ```

3. **Accessing Static Files:**
   If you have a file named `style.css` in the `public` directory, it can be accessed via `http://localhost:3000/style.css`.

---

### **Subtopics with Examples**

#### **1. Route Chaining for Similar Routes**

You can chain multiple HTTP methods for the same route to handle different request types (GET, POST, etc.).

- **Example:**

  ```javascript
  app.route('/book')
    .get((req, res) => {
      res.send('Get a book');
    })
    .post((req, res) => {
      res.send('Add a book');
    })
    .put((req, res) => {
      res.send('Update a book');
    });
  ```

  This code handles all GET, POST, and PUT requests for `/book` in one route definition.

#### **2. Route Handling for 404 Errors**

Express doesn’t have a built-in way to handle unknown routes (404 errors), so you must manually define a fallback route at the end of your route definitions.

- **Example:**

  ```javascript
  app.use((req, res) => {
    res.status(404).send('Page not found');
  });
  ```

  This sends a 404 error message for any routes that don’t match previously defined ones.

#### **3. Route Redirection**

Express can redirect requests from one route to another.

- **Example of Redirection:**

  ```javascript
  app.get('/old-route', (req, res) => {
    res.redirect('/new-route');
  });

  app.get('/new-route', (req, res) => {
    res.send('Welcome to the new route!');
  });
  ```

  In this case, visiting `/old-route` will redirect the user to `/new-route`.

---

### **Summary of Key Concepts:**

- **Defining Routes**: Use `app.get()`, `app.post()`, `app.put()`, `app.delete()` to define routes for different HTTP methods.
- **Route Parameters**: Use `req.params` to extract values from dynamic URLs.
- **Query Strings**: Use `req.query` to extract query parameters from the URL.
- **Serving Static Files**: Use `express.static()` to serve CSS, HTML, and JavaScript files.
