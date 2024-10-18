# **Uploading Files in Express.js**

Handling file uploads is a common feature in web applications, especially for functionalities like profile picture updates, document uploads, or media sharing. Express.js makes it easy to handle file uploads using middleware such as **multer**. This guide will walk through the process of uploading files, validating files, and configuring file storage in an Express.js application.

---

## **Subtopics and Details:**

1. **Handling File Uploads with `multer` Middleware**
2. **File Validation (Size, Type)**
3. **File Storage Configuration**
4. **Handling Multiple Files**
5. **Responding to File Uploads**

---

### **1. Handling File Uploads with `multer` Middleware**

**multer** is a middleware used for handling `multipart/form-data`, which is primarily used for file uploads in forms. It provides an easy way to configure how and where files are stored on the server.

#### **Installation**

To use multer, you need to install it via npm:

```bash
npm install multer
```

#### **Basic Example (Single File Upload):**

```html
<!-- HTML Form for File Upload -->
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="profilePic" />
  <button type="submit">Upload</button>
</form>
```

```js
const express = require('express');
const multer = require('multer');
const app = express();

// Set up multer for file uploads (memory storage)
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

In this example:

- **multer** is configured to store files in the `uploads/` directory.
- The `upload.single()` method is used to handle a single file upload from the form field named `profilePic`.
- After the upload, file metadata is available in the `req.file` object.

---

### **2. File Validation (Size, Type)**

Validating uploaded files is crucial to ensure that users don’t upload malicious or unsupported files. **multer** provides mechanisms to restrict file uploads based on size, type, and other criteria.

#### **File Type Validation (MIME Type):**

You can validate file types by checking the MIME type or file extension. For example, you might want to allow only image uploads (e.g., JPEG, PNG).

#### **Example (Validating File Type):**

```js
const multer = require('multer');

// Define allowed file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .jpeg and .png files are allowed!'), false); // Reject the file
  }
};

// Configure multer with file filter
const upload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter,
});

app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.send('File uploaded successfully');
});
```

In this example:

- A `fileFilter` function checks the MIME type of the file.
- If the file is of an allowed type (JPEG/PNG), it's uploaded; otherwise, an error is returned.

#### **File Size Validation:**

You can limit the size of uploaded files by specifying a `limits` option in the multer configuration.

#### **Example (Validating File Size):**

```js
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1 MB
});

app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.send('File uploaded successfully');
});
```

In this example:

- The `limits` option restricts the file size to 1 MB. If the file exceeds the size limit, multer will throw an error.

---

### **3. File Storage Configuration**

By default, multer stores uploaded files in a temporary directory (e.g., `/uploads`). However, you can configure the storage location, file naming conventions, and more using **multer's disk storage engine**.

#### **Example (Configuring File Storage):**

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Customize file name
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('profilePic'), (req, res) => {
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
```

In this example:

- **multer.diskStorage()** is used to configure custom storage.
- The `destination` option specifies where files should be stored.
- The `filename` option is used to customize the file name (in this case, by appending a unique suffix).

---

### **4. Handling Multiple Files**

Multer also supports uploading multiple files from a form. You can use the `upload.array()` method to handle multiple files.

#### **Example (Handling Multiple File Uploads):**

```html
<!-- HTML Form for Multiple File Upload -->
<form action="/upload-multiple" method="POST" enctype="multipart/form-data">
  <input type="file" name="photos" multiple />
  <button type="submit">Upload Files</button>
</form>
```

```js
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  res.send(`Uploaded ${req.files.length} files`);
});
```

In this example:

- **upload.array()** is used to handle multiple file uploads from the `photos` field.
- The second argument (`5`) limits the number of files that can be uploaded at once.

---

### **5. Responding to File Uploads**

After a successful file upload, you can send various types of responses to the client. You might send a success message, the file's URL, or other details.

#### **Example (Responding with File Details):**

```js
app.post('/upload', upload.single('profilePic'), (req, res) => {
  const fileDetails = {
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  };
  res.json({ message: 'File uploaded successfully', fileDetails });
});
```

In this example:

- After the file upload, the server responds with a JSON object containing the file's metadata, such as the file name, path, and size.

---

### **Summary of Uploading Files in Express.js**

- **multer**: Use multer middleware to handle file uploads in Express applications.
- **File Validation**: Validate files based on their MIME type and size using the `fileFilter` and `limits` options.
- **Custom Storage**: Configure multer to use custom storage locations and file names with `diskStorage()`.
- **Multiple File Uploads**: Handle multiple file uploads from a form using `upload.array()`.
- **Response Handling**: Send appropriate responses after file uploads, such as success messages or file metadata.

By following these steps and using multer's rich feature set, you can securely and efficiently handle file uploads in your Express applications.
