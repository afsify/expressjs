# **User Authentication in Express.js**

User authentication is a critical aspect of web applications, allowing users to securely log in, maintain sessions, and protect resources. This overview covers various methods of authentication, including JWT (JSON Web Tokens), session-based authentication, and OAuth authentication.

---

## **Subtopics and Details:**

1. **JWT (JSON Web Tokens) Authentication**
2. **Session-based Authentication**
3. **OAuth Authentication (Google, Facebook login)**
4. **Comparative Summary of Authentication Methods**

---

### **1. JWT (JSON Web Tokens) Authentication**

JWT is a compact and self-contained way for securely transmitting information between parties as a JSON object. It is commonly used for stateless authentication, allowing users to authenticate without the need for server-side sessions.

#### **Installation:**

Install the required packages:

```bash
npm install jsonwebtoken bcryptjs
```

#### **Example (JWT Authentication):**

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const users = []; // Simulated user database
const secretKey = 'yourSecretKey'; // Secret key for JWT signing

app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send('User registered');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token }); // Send token to the client
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Protected route
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  
  if (!token) return res.sendStatus(403);
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    res.send(`Hello, ${user.username}! This is a protected route.`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

In this example:

- Users can register and log in. Passwords are hashed for security.
- Upon successful login, a JWT is generated and sent to the client for subsequent requests.
- A protected route verifies the token before granting access.

---

### **2. Session-based Authentication**

Session-based authentication involves creating a session on the server side when a user logs in. The session ID is sent back to the client as a cookie, allowing subsequent requests to identify the user.

#### **Install**

Install the required package:

```bash
npm install express-session
```

#### **Example (Session-Based Authentication):**

```js
const express = require('express');
const session = require('express-session');

const app = express();
const users = [{ id: 1, username: 'user1', password: 'pass1' }];

app.use(express.json());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.userId = user.id; // Store user ID in session
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Protected route
app.get('/protected', (req, res) => {
  if (!req.session.userId) {
    return res.status(403).send('Unauthorized access');
  }
  res.send('Welcome to the protected route!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

In this example:

- The server uses the `express-session` middleware to handle user sessions.
- On successful login, the user’s ID is stored in the session, allowing access to protected routes.

---

### **3. OAuth Authentication (Google, Facebook Login)**

OAuth is an open standard for access delegation, commonly used for user authentication via third-party services like Google or Facebook. It allows users to log in without creating a new account.

#### **Installation**

Install the required packages:

```bash
npm install passport passport-google-oauth20 passport-facebook express-session
```

#### **Example (OAuth Authentication with Google):**

```js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(express.json());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
}));

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you would typically save the user profile to your database
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Google authentication route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.send('Google login successful');
  }
);

// Protected route
app.get('/protected', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send('Unauthorized access');
  }
  res.send('Welcome to the protected route!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

In this example:

- The `passport` library is used to handle Google OAuth authentication.
- Upon successful login, the user is redirected to a protected route.

#### **Example (OAuth Authentication with Facebook):**

```js
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: '/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you would typically save the user profile to your database
    done(null, profile);
  }
));

// Facebook authentication route
app.get('/auth/facebook',
  passport.authenticate('facebook')
);

// Facebook callback route
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.send('Facebook login successful');
  }
);
```

In this example:

- Similar to Google, the Facebook authentication is configured using Passport.
- The user can log in using their Facebook account.

---

### **4. Comparative Summary of Authentication Methods**

| Authentication Method | Description | Advantages | Disadvantages |
|-----------------------|-------------|------------|---------------|
| **JWT Authentication** | Uses tokens for stateless authentication. | No server-side sessions, scalable, easy to implement. | Tokens can be compromised if not handled properly, stateless nature can lead to invalidating tokens. |
| **Session-Based Authentication** | Creates sessions on the server side and uses cookies. | Simpler for server-side management, easy to invalidate sessions. | Requires server memory, less scalable for distributed systems. |
| **OAuth Authentication** | Delegates authentication to third-party services. | Users can log in with existing accounts, reduces password management. | Dependency on external providers, potential for privacy issues. |

---

### **Summary of User Authentication Methods**

- **JWT (JSON Web Tokens) Authentication**: A stateless method using tokens for user authentication, suitable for scalable applications.
- **Session-Based Authentication**: Maintains sessions on the server, easier for managing user states but requires server memory.
- **OAuth Authentication (Google, Facebook)**: Allows users to authenticate via third-party services, enhancing user convenience but introducing external dependencies.

By understanding these authentication methods, you can choose the best approach for your application’s security and user experience needs.
