# **Performing CRUD Operations in MongoDB**

CRUD operations (Create, Read, Update, Delete) are fundamental actions in any database application. In the context of MongoDB, these operations allow you to manage data effectively, enabling you to create new documents, retrieve existing documents, update them, and delete documents as needed.

---

## **Subtopics and Details:**

1. **Introduction to CRUD Operations**
2. **Setting Up MongoDB with Mongoose**
3. **Create Operations**
4. **Read Operations**
5. **Update Operations**
6. **Delete Operations**
7. **Database Queries and Models**
8. **Example: Performing CRUD Operations**

---

### **1. Introduction to CRUD Operations**

CRUD stands for:

- **Create**: Adding new documents to a collection.
- **Read**: Retrieving documents from a collection.
- **Update**: Modifying existing documents in a collection.
- **Delete**: Removing documents from a collection.

These operations are essential for any application that needs to persist data, and they are typically implemented using database queries.

---

### **2. Setting Up MongoDB with Mongoose**

**Mongoose** is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data.

#### **Installation**

```bash
npm install mongoose
```

#### **Connecting to MongoDB**

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

- **Connection Options**: `useNewUrlParser` and `useUnifiedTopology` are options to avoid deprecation warnings.

---

### **3. Create Operations**

Creating a document in MongoDB involves defining a model and using the model to create instances.

#### **Example: Creating a Document**

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Create a new user
const createUser = async () => {
  const user = new User({ name: 'John Doe', email: 'john@example.com', age: 30 });
  await user.save();
  console.log('User created:', user);
};

createUser();
```

In this example:

- A user schema is defined, and a model `User` is created based on that schema.
- A new user is created and saved to the database.

---

### **4. Read Operations**

Reading documents allows you to retrieve information stored in your database.

#### **Example: Reading Documents**

```js
const readUsers = async () => {
  const users = await User.find(); // Retrieve all users
  console.log('Users:', users);
};

readUsers();
```

#### **Filtering Data**

You can also read documents based on specific criteria.

```js
const readSingleUser = async () => {
  const user = await User.findOne({ email: 'john@example.com' }); // Find user by email
  console.log('User:', user);
};

readSingleUser();
```

---

### **5. Update Operations**

Updating documents allows you to modify existing records in the database.

#### **Example: Updating a Document**

```js
const updateUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { age: 31 }, { new: true }); // Update age
  console.log('Updated User:', user);
};

// Call updateUser with the ID of the user to be updated
updateUser('someUserIdHere');
```

- **Options**: `{ new: true }` returns the updated document rather than the original.

---

### **6. Delete Operations**

Deleting documents removes records from the database.

#### **Example: Deleting a Document**

```js
const deleteUser = async (userId) => {
  const result = await User.findByIdAndDelete(userId); // Delete user by ID
  console.log('Deleted User:', result);
};

// Call deleteUser with the ID of the user to be deleted
deleteUser('someUserIdHere');
```

---

### **7. Database Queries and Models**

MongoDB allows for complex querying capabilities, enabling filtering, sorting, and more.

#### **Querying Examples**

- **Finding Documents**:

```js
const findUsersAboveAge = async (age) => {
  const users = await User.find({ age: { $gt: age } }); // Find users older than specified age
  console.log('Users above age:', users);
};

findUsersAboveAge(25);
```

- **Sorting Documents**:

```js
const sortedUsers = async () => {
  const users = await User.find().sort({ age: 1 }); // Sort users by age ascending
  console.log('Sorted Users:', users);
};

sortedUsers();
```

- **Limiting Results**:

```js
const limitedUsers = async () => {
  const users = await User.find().limit(5); // Limit results to 5 users
  console.log('Limited Users:', users);
};

limitedUsers();
```

---

### **8. Example: Performing CRUD Operations**

Here’s a comprehensive example that incorporates all CRUD operations using Mongoose.

```js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', userSchema);

// Create a new user
const createUser = async () => {
  const user = new User({ name: 'Alice', email: 'alice@example.com', age: 25 });
  await user.save();
  console.log('User created:', user);
};

// Read users
const readUsers = async () => {
  const users = await User.find();
  console.log('Users:', users);
};

// Update a user
const updateUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { age: 26 }, { new: true });
  console.log('Updated User:', user);
};

// Delete a user
const deleteUser = async (userId) => {
  const result = await User.findByIdAndDelete(userId);
  console.log('Deleted User:', result);
};

// Execute CRUD operations
const executeCRUD = async () => {
  await createUser();
  await readUsers();
  // Replace 'someUserIdHere' with an actual user ID
  // await updateUser('someUserIdHere');
  // await deleteUser('someUserIdHere');
};

// Start CRUD operations
executeCRUD();
```

In this example:

- A `User` model is created with a schema.
- CRUD functions are defined and executed sequentially, showcasing creating, reading, updating, and deleting documents in MongoDB.

---

### **Summary of Performing CRUD Operations in MongoDB**

- **CRUD Basics**: Create, Read, Update, and Delete operations are essential for managing data in MongoDB.
- **Using Mongoose**: Mongoose simplifies interactions with MongoDB, providing schema definitions and models for data management.
- **Database Queries**: Utilize various querying capabilities to filter, sort, and limit results when retrieving documents.
- **Error Handling**: Always implement error handling when performing database operations to manage potential issues gracefully.
- **Scalability**: As your application grows, consider implementing more complex data relationships, indexing, and optimizing queries for performance.

Performing CRUD operations effectively allows you to manage application data efficiently, ensuring your application remains responsive and robust.
