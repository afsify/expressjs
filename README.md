# Express.js

## What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It simplifies the process of building server-side applications by offering various HTTP utility methods and middleware, which allows for a cleaner API to build dynamic websites.

## Uses

Express.js is commonly used for:

- **Web Applications:** Enables rapid development of dynamic web pages and applications.
  
- **API Development:** Simplifies the creation of RESTful APIs.

- **Middleware Integration:** Facilitates the use of middleware for handling requests, responses, and routing.

## Important Topics

### 1. Routing

Express.js provides a powerful routing mechanism for handling different HTTP methods (GET, POST, PUT, DELETE, etc.) and URL paths.

### 2. Middleware

Middleware functions are used in Express.js to handle request and response objects. They are executed sequentially before the final route handler is called.

### 3. Templating Engines

Express.js supports templating engines like Pug, EJS, or Handlebars to dynamically render HTML pages on the server side.

## Key Features

1. **Routing:** Express.js provides a robust routing system, allowing developers to define URL paths and HTTP methods for requests.
  
2. **Middleware:** It allows the integration of middleware to process requests, which can be used for logging, authentication, error handling, and more.

3. **Minimalistic Framework:** Despite being feature-rich, Express.js is lightweight and minimal, giving developers the flexibility to customize as needed.

4. **Templating Engines:** Supports templating engines like Pug, EJS, and Handlebars for rendering dynamic HTML pages.

5. **Scalability:** Express.js can be used to build scalable applications, especially with Node.js’ non-blocking I/O.

6. **Error Handling:** Provides built-in error-handling middleware to manage errors across the application.

## Best Practices for Express.js

Below are some best practices when working with Express.js to ensure efficient and maintainable applications.

### Error Handling

**Handle Errors Gracefully:**

- Use error-handling middleware to capture errors and respond appropriately.
- Always return meaningful status codes (e.g., 404 for Not Found, 500 for Server Error).

**Example:**

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Modularization

**Organize Code into Routes and Middleware:**

- Break down your app into smaller route handlers and middleware.
- Use separate files for routes and modularize code for better maintainability.

**Example:**

```javascript
// routes/user.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User home page');
});

module.exports = router;

// app.js
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);
```

### Use Environment Variables

**Store Configuration in Environment Variables:**

- Keep sensitive information like API keys, database URLs, and ports in environment variables using tools like `dotenv`.

**Example:**

```javascript
require('dotenv').config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Security Best Practices

**Secure Your Application:**

- Use the `helmet` middleware to add essential HTTP headers for security.
- Sanitize user input to avoid injection attacks.
- Avoid using `eval()` or other unsafe JavaScript functions.

**Example:**

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Performance Optimization

**Improve Performance:**

- Use `compression` middleware to compress responses for faster delivery.
- Implement caching strategies to minimize unnecessary database hits.

**Example:**

```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

## Getting Started

To get started with Express.js, follow these steps:

1. [Install Node.js](https://nodejs.org/): Make sure you have Node.js installed on your system.

2. Create a new Express.js project:

    ```bash
    mkdir express-app
    cd express-app
    ```

3. Initialize the project and install Express.js:

    ```bash
    npm init -y
    npm install express
    ```

4. Create an `app.js` file and start coding:

    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    ```

## Common Express.js Commands

**Start the Server:**

```bash
node app.js
```

**Install a Middleware Package:**

```bash
npm install body-parser
```

**Remove a Package:**

```bash
npm uninstall body-parser
```

## Clone the Repository

In the terminal, use the following command:

```bash
git clone https://github.com/afsify/expressjs.git
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Official Website](https://nodejs.org/)
