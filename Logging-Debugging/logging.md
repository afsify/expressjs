# **Setting up Logging**

Logging is a crucial aspect of application development, as it provides insights into application behavior, tracks errors, and aids in debugging. In Node.js applications, setting up effective logging mechanisms helps maintain application health and supports troubleshooting. This section covers the use of the `morgan` logging middleware for HTTP request logging and how to implement custom logging solutions.

---

## **Subtopics and Details:**

1. **Using Morgan for Request Logging**
2. **Custom Logging Solutions**

---

### **1. Using Morgan for Request Logging**

**Morgan** is a popular HTTP request logger middleware for Node.js that helps log requests to the console or a file. It provides a variety of predefined formats for logging requests, including status codes, response times, and request methods.

#### **Installation:**

To use Morgan, install it via npm:

```bash
npm install morgan
```

#### **Basic Setup:**

After installing, you can set up Morgan in your Express application to log incoming requests.

**Example:**

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// Setup morgan for logging requests
app.use(morgan('combined')); // Use 'combined' for detailed logs

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

#### **Logging Formats:**

Morgan supports various predefined formats:

- **`combined`**: Standard Apache combined log output, including remote user, date, request line, status code, response time, etc.
- **`common`**: Similar to `combined` but omits the remote user.
- **`dev`**: Concise output colored by response status for development use.
- **`short`**: Shorter output including method, URL, status code, and response time.
- **`tiny`**: Minimal output with method, URL, and status code.

You can also create custom formats based on your needs.

**Example of Custom Format:**

```javascript
morgan.token('id', (req) => req.id);
app.use(morgan(':id :method :url :status :response-time ms'));
```

#### **Logging to a File:**

To log requests to a file instead of the console, you can use the `fs` module.

**Example:**

```javascript
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
```

This logs all requests in the combined format to `access.log` in the application directory.

---

### **2. Custom Logging Solutions**

While `morgan` is great for HTTP request logging, you might need more advanced logging capabilities, such as structured logging, logging levels, and log storage. Custom logging solutions can be built using popular logging libraries like `winston` or `bunyan`.

#### **Using Winston for Custom Logging:**

**Winston** is a versatile logging library for Node.js that supports multiple transports, logging levels, and formatting options.

#### **Installation**

```bash
npm install winston
```

#### **Basic Setup**

You can set up Winston for logging messages to the console and a file.

**Example:**

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Example usage
logger.info('Server started on port 3000');
logger.error('An error occurred');
```

#### **Logging Levels:**

Winston supports several logging levels, such as `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`, allowing you to categorize logs based on severity.

#### **Custom Logging Functions:**

You can create custom logging functions to encapsulate logging logic and add metadata.

**Example:**

```javascript
function logRequest(req) {
  logger.info(`Request: ${req.method} ${req.url}`, { userId: req.userId });
}

app.use((req, res, next) => {
  logRequest(req);
  next();
});
```

#### **Asynchronous Logging:**

For high-performance applications, consider using asynchronous logging to avoid blocking the main thread.

**Example:**

```javascript
logger.add(new winston.transports.File({
  filename: 'logs/combined.log',
  format: winston.format.json(),
  level: 'info',
  handleExceptions: true,
  json: true,
  timestamp: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  tailable: true,
  zippedArchive: true
}));
```

This configuration allows logs to be rotated, ensuring that older logs are archived and not lost.

---

### **Summary of Setting up Logging**

- **Morgan**: A middleware for logging HTTP requests with various predefined formats. It can log to the console or a file and is easy to set up in Express applications.
- **Winston**: A robust logging library that supports custom logging levels, multiple transports, and structured logging. It allows for advanced logging capabilities tailored to application needs.
- **Custom Solutions**: Combine different logging methods to create a comprehensive logging strategy that suits your application, utilizing structured logs and error handling.

Implementing effective logging practices is essential for maintaining application health, troubleshooting issues, and understanding user interactions within your application.
