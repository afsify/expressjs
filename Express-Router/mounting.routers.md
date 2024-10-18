# **Mounting Routers in Express.js**

In Express.js, organizing your routes is crucial as your application grows. Instead of defining all routes in a single file, you can **mount routers** to modularize your routing logic. This enhances code maintainability and scalability. The `app.use()` method is commonly used to mount routers to specific route paths, enabling a clean structure for your API or web application.

---

## **Subtopics and Details:**

1. **What is a Router in Express.js?**
2. **Using `app.use()` to Mount Routers**
3. **Prefixing Routes with Routers**
4. **Modular Route Handling**
5. **Example of a Router Module**

---

### **1. What is a Router in Express.js?**

A **router** in Express.js is a mini-instance of an Express application, capable of handling requests and middleware like the main app. It's used to define route handlers for specific endpoints, allowing you to modularize and organize routes for different parts of your application (e.g., `/users`, `/products`, etc.).

#### **Example of a Basic Router**

```js
const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
  res.send('This is the user info page.');
});

module.exports = router;
```

In this example:

- We create a new router instance using `express.Router()`.
- The router handles a GET request to `/info`.

---

### **2. Using `app.use()` to Mount Routers**

The `app.use()` method is used to **mount** the router onto a specific path in the main Express application. When a request hits the defined path, the corresponding router will handle it.

#### **Example (Mounting a Router)**

```js
const express = require('express');
const app = express();
const userRouter = require('./routes/user'); // Import the user router

// Mount the user router at /users
app.use('/users', userRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
```

In this example:

- The `userRouter` is mounted to the `/users` path.
- Any requests starting with `/users` (e.g., `/users/info`) will be handled by the `userRouter`.

---

### **3. Prefixing Routes with Routers**

When you mount a router using `app.use()`, the router is **prefixed** with the base path specified. This means all the routes inside the router will be relative to that base path.

#### **Example (Route Prefixing)**

```js
// user.js (Router Module)
const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('User profile page.');
});

router.get('/settings', (req, res) => {
  res.send('User settings page.');
});

module.exports = router;
```

```js
// app.js (Main Application)
const userRouter = require('./routes/user');
app.use('/users', userRouter);
```

In this example:

- The route `/users/profile` will be handled by the router’s `/profile` endpoint.
- Similarly, `/users/settings` will map to the `/settings` route inside the router.

---

### **4. Modular Route Handling**

By using routers, you can modularize your route handlers into separate files, making the code easier to manage, especially in larger applications. Each module can handle different parts of the application independently.

#### **Example (Modular Structure)**

```bash
project/
├── routes/
│   ├── user.js
│   ├── product.js
├── app.js
```

```js
// product.js (Router Module)
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.send('Product list');
});

router.get('/:id', (req, res) => {
  res.send(`Product details for ID: ${req.params.id}`);
});

module.exports = router;
```

```js
// app.js (Main Application)
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

// Mount routers
app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
```

In this modular setup:

- `/users` routes are handled by the `userRouter`.
- `/products` routes are handled by the `productRouter`, which includes product listings and product details based on dynamic `id`.

---

### **5. Example of a Router Module**

Let's see an example of a **userRouter** that manages different user-related operations.

```js
// routes/user.js
const express = require('express');
const router = express.Router();

// Handle GET request to /users/
router.get('/', (req, res) => {
  res.send('User homepage');
});

// Handle GET request to /users/profile
router.get('/profile', (req, res) => {
  res.send('User profile');
});

// Handle POST request to /users/signup
router.post('/signup', (req, res) => {
  res.send('User signed up');
});

module.exports = router;
```

In this example:

- The `/users/` route responds with "User homepage."
- The `/users/profile` route responds with "User profile."
- The `/users/signup` route handles a POST request to sign up a user.

---

### **Summary of Mounting Routers in Express.js**

- **Routers**: Routers are mini Express apps that handle specific sets of routes, making the code modular and maintainable.
- **Mounting Routers**: Use `app.use()` to mount a router at a specific base path.
- **Route Prefixing**: When a router is mounted, all the routes inside the router are prefixed with the base path.
- **Modular Structure**: Organize your routes into separate modules for better structure, especially in large applications.
- **Example Usage**: You can have multiple routers for different resources (e.g., users, products), making it easier to handle requests based on resource type.

By mounting routers in Express.js, you can keep your routes clean, modular, and scalable as your application grows.
