const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const posts = require('./routes/api/posts');

// routes
app.use('/api/posts/', posts);

// handle production
if (process.env.NODE_ENV) {
  // static folder
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Handle SPA
  app.get(/.*/, (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
