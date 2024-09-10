const express = require('express');
const app = express();

// Step 1: Serve static files (CSS, images, JS)
app.use(express.static('public'));

// Step 2: Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

// Step 3: Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

