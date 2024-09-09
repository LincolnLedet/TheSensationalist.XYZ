// Step 1: Require express (after you installed it)
// Express is a Node.js framework that makes it easier to build web applications and APIs.
const express = require('express');

// Step 2: Create an instance of the express application
// 'app' is the object that represents our entire application. We use 'app' to define routes and middleware.
const app = express();

// Step 3: Define a basic route (AKA an endpoint)
// The app.get() method is defining a route for HTTP GET requests at the root URL ('/'). 
// When someone visits 'http://localhost:3000/', this function runs.
// req = request (info from the client), res = response (what we send back to the client).
app.get('/', (req, res) => {
  // Send a response to the client. In this case, just a simple 'Hello, World!' message.
  res.send('Hello, World!');
});

// Step 4: Set the port where the server will listen for incoming requests
// 'PORT' is the variable that sets the port number for the server. 
// It’s where your app will be available in your browser (e.g., http://localhost:3000).
const PORT = 3000;

// Step 5: Start the server
// The listen() method starts the server and makes it listen for connections on the specified port.
// Once it's running, the callback function prints a message to the console to let you know the server is live.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
