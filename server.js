const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// Endpoint to save credentials
app.post('/save-credentials', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const data = `"${username}" Cleartext-Password := "${password}"\n`;

  fs.appendFile('credentials.txt', data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error saving credentials.' });
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
