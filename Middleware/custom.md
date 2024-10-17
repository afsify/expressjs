# **Custom Middleware in Express.js**

Custom middleware in Express.js is a powerful feature that allows developers to write reusable functions that can handle request-response cycles. Middleware functions can perform tasks such as logging, modifying the request or response objects, handling errors, or implementing authentication checks.

---

## **1. Function Signature of Middleware**

In Express.js, a middleware function is essentially a function that has access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle (`next`).

### **Function Signature of Middleware:**

```javascript
function middlewareFunction(req, res, next) {
  // Perform some operation
  next();
}
```

The middleware function is defined with three arguments:

- **`req`**: The request object representing the incoming HTTP request.
- **`res`**: The response object representing the HTTP response that will be sent back to the client.
- **`next`**: A function that, when called, passes control to the next middleware in the stack. If the current middleware doesn’t call `next()`, the request-response cycle will be left hanging, and the server won’t respond to the client.

#### **Basic Example of Custom Middleware:**

```javascript
const express = require('express');
const app = express();

// Custom middleware to log the request method and URL
function logRequestDetails(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route handler
}

app.use(logRequestDetails); // Apply middleware to all routes

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - In this example, the custom middleware `logRequestDetails` logs the request method (e.g., `GET`, `POST`) and URL.
  - The `next()` function is called to pass control to the next middleware or route handler. Without calling `next()`, the request would hang, and the server wouldn't respond.

---

### **2. Passing Control with `next()`**

The `next()` function is crucial in the middleware stack because it indicates that the middleware function is done, and control should pass to the next middleware or route handler in line.

#### **What happens if `next()` is not called?**

If `next()` is not called within a middleware function, the request-response cycle is left incomplete, and the client will not receive a response.

##### **Example of Custom Middleware Using `next()`:**

```javascript
const express = require('express');
const app = express();

// Middleware to check if a 'token' query parameter is present
function checkToken(req, res, next) {
  if (req.query.token) {
    console.log('Token found:', req.query.token);
    next(); // If token is found, proceed to the next middleware/route
  } else {
    res.status(401).send('Unauthorized: Token is missing');
  }
}

app.use(checkToken); // Apply middleware globally

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The custom middleware `checkToken` checks if a `token` query parameter is present in the request URL.
  - If the token is found, `next()` is called, and the request proceeds to the next middleware or route handler.
  - If the token is not found, the middleware sends an `Unauthorized` response, ending the request-response cycle without calling `next()`.

---

### **3. More Complex Custom Middleware Example**

Middleware functions can perform a variety of tasks, such as logging requests, checking user authentication, validating data, or even modifying the request/response objects.

#### **Example: Logging Requests and Adding Custom Headers**

```javascript
const express = require('express');
const app = express();

// Custom middleware to log the request details and add a custom header
function logAndAddHeader(req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`);

  // Add a custom header to the response
  res.setHeader('X-Custom-Header', 'This is a custom header');

  // Continue to the next middleware or route handler
  next();
}

app.use(logAndAddHeader);

app.get('/', (req, res) => {
  res.send('Home Page with a Custom Header');
});

app.get('/about', (req, res) => {
  res.send('About Page with a Custom Header');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The `logAndAddHeader` middleware logs the request details and adds a custom header (`X-Custom-Header`) to the response.
  - After performing these tasks, it calls `next()` to allow the request to proceed to the respective route handler.
  - Both the `/` and `/about` routes will now receive the custom header in their responses.

---

### **4. Middleware Example with Request Modification**

Middleware can also modify the request object (`req`) before it reaches the route handler.

#### **Example: Adding a Custom Property to `req`:**

```javascript
const express = require('express');
const app = express();

// Custom middleware to add a 'timestamp' property to the request
function addTimestamp(req, res, next) {
  req.timestamp = new Date(); // Add a new property 'timestamp' to the req object
  next();
}

app.use(addTimestamp); // Apply middleware globally

app.get('/', (req, res) => {
  res.send(`Request received at: ${req.timestamp}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - The `addTimestamp` middleware adds a `timestamp` property to the `req` object, which contains the current date and time.
  - The route handler for `/` can access this custom property and display the timestamp in the response.

---

### **5. Subtopics Summary**

#### **5.1. Function Signature of Middleware**

- Middleware functions in Express.js take three arguments: `req`, `res`, and `next`.
- They can perform operations like logging, authentication checks, or modifying the request/response objects.
- **Syntax**: `function middleware(req, res, next) { /* logic */ next(); }`

#### **5.2. Passing Control with `next()`**

- **`next()`** is crucial for passing control to the next middleware or route handler.
- If `next()` is not called, the request-response cycle will be incomplete, and the client will not receive a response.
- You can pass an error to `next(err)` for error handling.

#### **5.3. Complex Middleware Logic**

- Middleware can modify the request object (`req`), add custom headers, or handle tasks like authentication.
- Custom middleware can be applied globally (via `app.use()`) or to specific routes.

---

### **6. Multiple Middleware in a Route**

You can also attach multiple middleware functions to a single route, allowing you to chain various logic checks or operations.

#### **Example: Multiple Middleware for a Single Route**

```javascript
const express = require('express');
const app = express();

// Middleware to check if user is authenticated
function checkAuth(req, res, next) {
  if (req.query.auth === 'true') {
    next(); // If authenticated, proceed
  } else {
    res.status(401).send('Unauthorized');
  }
}

// Middleware to log the request details
function logDetails(req, res, next) {
  console.log(`Authenticated request received: ${req.url}`);
  next();
}

app.get('/profile', [checkAuth, logDetails], (req, res) => {
  res.send('User Profile Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- **Explanation**:
  - Here, two middleware functions (`checkAuth` and `logDetails`) are applied to the `/profile` route. The request must first pass the authentication check, and if it succeeds, the request details will be logged. Only then does the route handler respond with the profile page.

---

### **Conclusion**

Custom middleware in Express.js is a flexible way to manage the request-response lifecycle. By writing your own middleware functions, you can enhance your application’s logic, such as logging, request validation, and adding custom properties. The `next()` function is essential for moving through the middleware stack, ensuring that control is passed to the appropriate middleware or route handler. Understanding how to create and apply custom middleware will greatly enhance your ability to build complex and efficient applications.
