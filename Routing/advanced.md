# **Advanced Routing**

Advanced routing in Express.js allows you to organize routes more efficiently and handle complex routing scenarios. This includes using route groups, chaining route handlers, handling multiple requests for the same route, and implementing route-level middleware.

---

## **1. Route Groups**

Route groups allow you to organize and structure routes in a more modular way. You can group similar routes (e.g., routes for a specific entity like users or products) under a common base path. In Express.js, route groups are created using the `express.Router()` method.

### **Example of Route Groups:**

```javascript
const express = require('express');
const app = express();
const router = express.Router();  // Create a new router instance

// Group routes under /user
router.get('/profile', (req, res) => {
  res.send('User Profile');
});

router.get('/settings', (req, res) => {
  res.send('User Settings');
});

// Register the router with a base path
app.use('/user', router);  // All routes in the router are prefixed with /user

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- In this example, the routes `/user/profile` and `/user/settings` are grouped under `/user`.
- The `express.Router()` instance acts like a mini app that contains all the routes and middleware associated with a specific section of your app (e.g., user management).

---

### **2. Chaining Route Handlers**

Route handlers can be chained together in Express.js to break down logic into smaller, more reusable pieces. This is especially useful when multiple functions need to be executed sequentially for a single route.

#### **Example of Chaining Route Handlers:**

```javascript
// Middleware functions to handle different parts of the request
const logRequest = (req, res, next) => {
  console.log('Request Type:', req.method);
  next();  // Pass control to the next handler
};

const validateUser = (req, res, next) => {
  if (req.query.user === 'admin') {
    next();  // Pass control if validation passes
  } else {
    res.status(403).send('Access Denied');
  }
};

// Chain multiple handlers for the same route
app.get('/dashboard', logRequest, validateUser, (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});
```

- **logRequest** logs the type of request (GET, POST, etc.).
- **validateUser** checks if the user is an admin.
- If both middlewares pass, the final function sends a response.

This way, you can organize middleware logic in a clean and reusable way.

---

### **3. Handling Multiple Requests with the Same Route**

Sometimes, multiple requests (with different HTTP methods) are made to the same route. Express.js provides a simple way to handle this using `app.route()`.

#### **Example of Handling Multiple Requests for the Same Route:**

```javascript
app.route('/product')
  .get((req, res) => {
    res.send('Get a product');
  })
  .post((req, res) => {
    res.send('Create a new product');
  })
  .put((req, res) => {
    res.send('Update a product');
  });
```

- `app.route('/product')` is used to define multiple handlers for the same `/product` route.
- Each handler corresponds to a different HTTP method (GET, POST, PUT).
  
This makes the route definition more concise and better organized compared to writing separate routes for each HTTP method.

---

### **4. Route-Level Middleware**

Middleware is typically used to process requests before they reach the route handler. Route-level middleware is middleware that applies only to a specific route or group of routes. This is useful for implementing features like authentication, logging, and validation on a per-route basis.

#### **Example of Route-Level Middleware:**

```javascript
// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  if (req.query.auth === 'true') {
    next();  // Proceed to the next handler
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Apply middleware only to the /protected route
app.get('/protected', checkAuth, (req, res) => {
  res.send('Welcome to the protected route');
});
```

- The `checkAuth` middleware checks if the `auth` query parameter is `true`. If so, it allows the request to proceed to the next handler.
- If the authentication check fails, the middleware responds with a 401 Unauthorized status.
  
#### **Route-Level Middleware with Router:**

You can also apply middleware to all routes within a route group by using the `router.use()` method.

```javascript
const express = require('express');
const router = express.Router();

// Middleware to check for authentication
router.use((req, res, next) => {
  if (req.query.auth === 'true') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Protected routes under /admin
router.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

router.get('/settings', (req, res) => {
  res.send('Admin Settings');
});

app.use('/admin', router);
```

In this example, all routes under `/admin` are protected by the authentication middleware. Any requests to `/admin/dashboard` or `/admin/settings` will be checked for authentication.

---

### **Subtopics and Examples**

#### **1. Dynamic Route Grouping with Parameters**

Express supports dynamic route parameters even when using route groups. This allows you to handle more specific resources under grouped routes.

- **Example:**

  ```javascript
  const express = require('express');
  const router = express.Router();

  // Dynamic route for users
  router.get('/user/:id', (req, res) => {
    res.send(`User ID is: ${req.params.id}`);
  });

  // Register the router with the app
  app.use('/api', router);
  ```

  In this case, the `/api/user/:id` route can handle dynamic user IDs, making it more flexible.

#### **2. Error Handling in Chained Handlers**

When chaining route handlers, you can include error-handling middleware to catch any issues that occur during the request cycle.

- **Example:**

  ```javascript
  const validateData = (req, res, next) => {
    if (!req.body.name) {
      next(new Error('Name is required'));  // Pass error to the error handler
    } else {
      next();
    }
  };

  const errorHandler = (err, req, res, next) => {
    res.status(400).send(`Error: ${err.message}`);
  };

  app.post('/submit', validateData, (req, res) => {
    res.send('Data submitted');
  });

  // Error handler middleware
  app.use(errorHandler);
  ```

  In this example, if validation fails in the `validateData` middleware, the error is passed to the `errorHandler` middleware, which responds with an error message.

#### **3. Route Middleware for Logging and Analytics**

You can use route-level middleware to add logging or analytics tracking to specific routes.

- **Example:**

  ```javascript
  const logRoute = (req, res, next) => {
    console.log(`Route accessed: ${req.originalUrl}`);
    next();
  };

  // Apply logging middleware to all product-related routes
  app.use('/products', logRoute);

  app.get('/products', (req, res) => {
    res.send('Product list');
  });

  app.get('/products/:id', (req, res) => {
    res.send(`Product details for ID: ${req.params.id}`);
  });
  ```

  This middleware logs every time a product-related route is accessed.

---

### **Summary of Key Concepts:**

1. **Route Groups**: Organize routes under a common base path using `express.Router()`.
2. **Chaining Route Handlers**: Chain multiple middleware functions for a single route to handle complex logic.
3. **Handling Multiple Requests for the Same Route**: Use `app.route()` to handle different HTTP methods (GET, POST, etc.) for the same URL path.
4. **Route-Level Middleware**: Apply middleware to specific routes or route groups to handle authentication, logging, validation, etc.
