// Import the 'express' module to create an Express application
const express = require("express");
// Create an instance of an Express application
const app = express();
const path = require("path");
const printDate = require("./middleware/date");
const profileRouter = require("./router/profile.router");

// Mount the profile router at the root path
app.use("/", profileRouter);

// Application level Middleware to log the time and date of each request
app.use(printDate)
//! app level middlewares always put on top

// Respond with an HTML message when a GET request is made to the root URL
app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

// Respond with JSON content for the "/contact" route
app.get("/contact", (req, res) => {
  res.json("Contact");
});

// Set EJS as the view engine
app.set("view engine", "ejs");
// Specify the directory for template files
app.set("views", path.join(__dirname, "views"));

// Render the 'about' template view instead of a raw HTML string
app.get("/about", (req, res) => {
  res.render("about"); // This will look for 'about.ejs' in the 'views' directory
});

// Define a route for the "/blog" URL
// Serve an HTML file located in the "views" directory as a response
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "blog.html"));
});

// Define a catch-all route for undefined paths (wildcard "*")
// Respond with a 404 status and a "404" HTML message if no route matches
app.get("*", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

// Define the port on which the server will listen
// Use the environment variable PORT if available; otherwise, use port 8080
const PORT = process.env.PORT || 8080;

// Start the server and log a message indicating the server is running
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
