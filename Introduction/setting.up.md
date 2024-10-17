# **Setting Up the Environment**

When building web applications or RESTful APIs with **Express.js**, the first step is setting up the development environment. This includes installing Node.js, npm (Node Package Manager), and Express.js itself. Below are detailed steps for setting up the environment and creating a basic server using Express.js.

---

## **1. Installing Node.js and npm**

Before using **Express.js**, you need to install **Node.js** on your system because Express runs on top of Node.js. Node.js also comes with **npm**, the Node Package Manager, which is essential for managing dependencies like Express.

### **Step-by-Step Guide for Installing Node.js:**

1. **Download Node.js:**
   - Visit the official Node.js website at [nodejs.org](https://nodejs.org/).
   - Choose the **LTS (Long Term Support)** version for stability.

2. **Install Node.js:**
   - Run the installer and follow the instructions on your operating system (Windows, macOS, or Linux).
   - After installation, Node.js and npm will be installed globally on your system.

3. **Verify Installation:**
   - To verify that Node.js and npm are installed correctly, open your terminal (or command prompt) and run the following commands:

   ```bash
   node -v    # This checks the Node.js version
   npm -v     # This checks the npm version
   ```

   You should see version numbers printed on the terminal, confirming the installation.

#### **Example Output:**

```bash
$ node -v
v18.0.0

$ npm -v
8.5.0
```

---

### **2. Installing Express.js**

After setting up Node.js, the next step is to install Express.js. This will be done through npm, which is already installed with Node.js.

#### **Creating a Project Directory:**

1. **Create a project folder** where you’ll set up your Express application:

   ```bash
   mkdir express-app
   cd express-app
   ```

2. **Initialize the project** by creating a `package.json` file. This file will store all the dependencies (like Express) and metadata about your project:

   ```bash
   npm init -y   # The -y flag automatically fills default options
   ```

   This will generate a `package.json` file with default settings. You can always edit this file later to configure it as needed.

#### **Installing Express.js:**

3.Install Express.js as a dependency using npm:

   ```bash
   npm install express --save
   ```

   The `--save` flag ensures that Express.js is added to the `dependencies` section of your `package.json` file.

4.After installation, check your `package.json` file. It should have Express listed as a dependency:

   ```json
   {
     "dependencies": {
       "express": "^4.17.1"
     }
   }
   ```

---

### **3. Creating a Basic Express Server**

Once Express.js is installed, you can now create your first basic server. This is how you handle HTTP requests (like GET and POST) and send responses to the client.

#### **Step-by-Step Example:**

1. **Create a new file** (usually named `app.js` or `server.js`):

   ```bash
   touch app.js
   ```

2. **Write the Basic Server Code** in `app.js`:

   ```javascript
   // Import the express module
   const express = require('express');

   // Create an instance of express
   const app = express();

   // Define a route for the root URL (/)
   app.get('/', (req, res) => {
     res.send('Hello, World!');  // Send a response to the client
   });

   // Start the server on port 3000
   app.listen(3000, () => {
     console.log('Server is running on http://localhost:3000');
   });
   ```

3. **Run the Express Server:**

   Now that your `app.js` file is set up, you can run your Express server by typing the following command in your terminal:

   ```bash
   node app.js
   ```

4. **Visit the Server:**
   - Open a browser and go to `http://localhost:3000`.
   - You should see the text `Hello, World!` displayed in the browser.

---

### **Subtopics and Details with Examples**

#### **1. Routing in Express.js**

Routing in Express allows the server to handle different URL paths and HTTP methods (GET, POST, PUT, DELETE).

- **Basic Routing Example:**

   ```javascript
   app.get('/about', (req, res) => {
     res.send('About Page');
   });

   app.post('/submit', (req, res) => {
     res.send('Form Submitted');
   });
   ```

- `app.get()` handles GET requests.
- `app.post()` handles POST requests.

#### **2. Middleware in Express.js**

Middleware functions are executed during the lifecycle of a request to the Express app. They can modify the request or response objects.

- **Example of Middleware:**

   ```javascript
   // This middleware will log the method and URL for every request
   app.use((req, res, next) => {
     console.log(`${req.method} request for '${req.url}'`);
     next();  // Pass control to the next middleware/route
   });
   ```

   Middleware is placed **before** route definitions and usually ends with the `next()` function to pass control to the next middleware.

#### **3. Handling JSON Data**

Express can handle JSON data in POST requests using built-in middleware `express.json()`.

- **Example of handling JSON data:**

   ```javascript
   app.use(express.json());  // Parse JSON data from requests

   app.post('/api/data', (req, res) => {
     console.log(req.body);  // Access JSON data from the client
     res.send('Data received');
   });
   ```

   Now, when the client sends a POST request with JSON data, it will be accessible in `req.body`.

#### **4. Serving Static Files**

Express can serve static files like HTML, CSS, and images using the `express.static()` middleware.

- **Example:**

   ```javascript
   app.use(express.static('public'));  // Serve files from the 'public' folder
   ```

   If you place files like `style.css` or `index.html` in the `public` folder, they will be accessible at `http://localhost:3000/style.css`.

#### **5. Templating Engines**

Express supports templating engines like **Pug** to generate dynamic HTML.

- **Example using Pug:**
   1. Install Pug:

      ```bash
      npm install pug
      ```

   2. Set Pug as the templating engine:

      ```javascript
      app.set('view engine', 'pug');
      ```

   3. Create a `views` folder and add a file `index.pug`:

      ```pug
      html
        head
          title= title
        body
          h1= message
      ```

   4. Render the template:

      ```javascript
      app.get('/', (req, res) => {
        res.render('index', { title: 'Home', message: 'Welcome to Express with Pug!' });
      });
      ```

---

### **Summary of Key Steps:**

1. **Install Node.js**: Download and install from the official website.
2. **Initialize npm**: Run `npm init -y` to create a `package.json` file.
3. **Install Express**: Run `npm install express --save`.
4. **Create Basic Server**: Write the basic server code in `app.js`.
5. **Run the Server**: Start the server with `node app.js`.
