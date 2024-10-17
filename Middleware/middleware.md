# **Middleware in Express.js**

Middleware is one of the core concepts of Express.js. It refers to functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the request-response cycle of an Express application. Middleware functions can modify the request and response objects, terminate the request-response cycle, or pass control to the next middleware function using `next()`.

---

## **1. What is Middleware?**

Middleware functions are the building blocks of Express applications. They sit between the request and the final route handler and perform tasks such as:

- Executing any code.
- Modifying the request and response objects.
- Ending the request-response cycle (i.e., sending a response).
- Calling the next middleware in the stack using `next()`.

### **Syntax of Middleware:**

A basic middleware function looks like this:

```javascript
function middlewareExample(req, res, next) {
  // Do some processing
  console.log('Middleware executed');
  next();  // Pass control to the next middleware or route handler
}

app.use(middlewareExample);
```

- **`req`**: The request object containing data from the client (like parameters, headers, body, etc.).
- **`res`**: The response object used to send a response back to the client.
- **`next()`**: A function that passes control to the next middleware in the chain.

---

### **2. Introduction to Middleware in Express.js**

In Express.js, middleware functions can be classified based on their scope and functionality:

- **Application-level middleware**: Applies to the entire application or specific routes.
- **Router-level middleware**: Applies to specific route groups or routers.
- **Error-handling middleware**: Handles errors that occur during the request-response cycle.
- **Built-in middleware**: Provided by Express, such as `express.static` for serving static files.
- **Third-party middleware**: Middleware from external libraries, such as `body-parser`, `cors`, etc.

---

### **3. Types of Middleware**

#### **3.1. Application-Level Middleware**

Application-level middleware is bound to the `app` object using `app.use()` or `app.METHOD()`. It runs for all routes or specific routes, depending on how it is defined.

##### **Example of Application-Level Middleware:**

```javascript
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();  // Pass control to the next handler or middleware
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The middleware function logs the URL of every incoming request and then calls `next()` to pass control to the next middleware or route handler.
  - This middleware applies to **all routes** in the application.

##### **Example of Application-Level Middleware for Specific Route:**

```javascript
// Middleware for a specific route
app.use('/about', (req, res, next) => {
  console.log('About page requested');
  next();
});
```

- This middleware runs only when the `/about` route is accessed.

---

#### **3.2. Router-Level Middleware**

Router-level middleware works exactly like application-level middleware, but it is bound to an instance of `express.Router()`. This allows you to organize your routes better and apply middleware to specific route groups.

##### **Example of Router-Level Middleware:**

```javascript
const express = require('express');
const app = express();
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log('Router-level middleware');
  next();
});

router.get('/profile', (req, res) => {
  res.send('User Profile');
});

router.get('/settings', (req, res) => {
  res.send('User Settings');
});

// Register the router
app.use('/user', router);  // Apply router-level middleware to /user routes

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The router-level middleware logs "Router-level middleware" whenever a request is made to any of the `/user` routes (e.g., `/user/profile`, `/user/settings`).

---

#### **3.3. Error-Handling Middleware**

Error-handling middleware is used to catch and process errors that occur during the request-response cycle. Express.js identifies error-handling middleware by the fact that it has **four parameters**: `(err, req, res, next)`.

##### **Example of Error-Handling Middleware:**

```javascript
// Simulating an error by throwing it in a route
app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  next(error);  // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);  // Log the error message
  res.status(500).send('Internal Server Error');  // Send a 500 status code and response
});
```

- **Explanation**:
  - When an error is thrown or passed using `next(error)`, the error-handling middleware is triggered.
  - The error-handling middleware logs the error and sends a 500 Internal Server Error response.

---

### **4. Built-In Middleware**

Express.js provides several built-in middleware functions that simplify common tasks.

#### **Examples of Built-In Middleware:**

1. **`express.static`**: Serves static files like HTML, CSS, JavaScript, and images.

   ```javascript
   app.use(express.static('public'));
   ```

   - **Explanation**: This middleware serves files from the `public` directory. For example, if you have `style.css` in the `public` folder, it can be accessed via `/style.css`.

2. **`express.json()`**: Parses incoming requests with JSON payloads.

   ```javascript
   app.use(express.json());
   ```

   - **Explanation**: This middleware parses the incoming request body as JSON and makes it available in `req.body`.

3. **`express.urlencoded()`**: Parses incoming requests with URL-encoded payloads (typically from HTML forms).

   ```javascript
   app.use(express.urlencoded({ extended: true }));
   ```

   - **Explanation**: This middleware parses form data and makes it available in `req.body`.

---

### **5. Third-Party Middleware**

Express.js supports third-party middleware that can be installed via npm and used in your app. These middleware functions add extended functionality like handling CORS, session management, logging, etc.

#### **Examples of Third-Party Middleware:**

1. **`body-parser`**: A commonly used middleware for parsing request bodies (although its functionality is now included in Express’s built-in middleware).

   ```bash
   npm install body-parser
   ```

   ```javascript
   const bodyParser = require('body-parser');
   app.use(bodyParser.json());
   ```

   - **Explanation**: This middleware parses JSON bodies and makes the parsed data available in `req.body`.

2. **`morgan`**: HTTP request logger middleware.

   ```bash
   npm install morgan
   ```

   ```javascript
   const morgan = require('morgan');
   app.use(morgan('dev'));
   ```

   - **Explanation**: `morgan` logs HTTP requests in a concise format for debugging and monitoring.

3. **`cors`**: Enables Cross-Origin Resource Sharing (CORS).

   ```bash
   npm install cors
   ```

   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

   - **Explanation**: This middleware allows your Express app to handle cross-origin requests.

---

### **6. Subtopics with Examples**

#### **6.1. Order of Middleware Execution**

Middleware functions are executed in the order in which they are defined in the code. Once a middleware calls `next()`, the next middleware in the stack is executed.

- **Example of Middleware Execution Order**:

  ```javascript
  app.use((req, res, next) => {
    console.log('First Middleware');
    next();
  });

  app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
  });

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  ```

  - **Explanation**: The first middleware logs "First Middleware," then calls `next()`, after which the second middleware logs "Second Middleware."

#### **6.2. Skipping Middleware**

If you want to skip the rest of the middleware functions in the stack, you can either send a response directly or throw an error.

- **Example of Skipping Middleware**:

  ```javascript
  app.use((req, res, next) => {
    if (!req.query.token) {
      return res.status(403).send('Forbidden');  // Stop the middleware chain
    }
    next();  // Proceed if token is present
  });
  ```

  - **Explanation**: If the `token` query parameter is missing, the response is sent directly, and the next middleware is not called.

#### **6.3. Multiple Middleware Functions for a Route**

You can specify multiple middleware functions for a single route. Each middleware can perform specific tasks, such as authentication, validation, etc.

- **Example

 with Multiple Middleware Functions**:

  ```javascript
  const validateToken = (req, res, next) => {
    if (!req.query.token) {
      return res.status(401).send('Unauthorized');
    }
    next();
  };

  const logRequest = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    next();
  };

  app.get('/dashboard', [validateToken, logRequest], (req, res) => {
    res.send('Welcome to the dashboard!');
  });
  ```

  **Explanation**: The `/dashboard` route requires two middleware functions. First, `validateToken` ensures the presence of a token, and `logRequest` logs the request URL.
