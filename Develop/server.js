// Variables for requiring the express module, the path module, the clog function from the middleware folder, and the notes.js file from the routes folder.
const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');
// Constants for the port the server will run on and the app itself.
const PORT = process.env.PORT || 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
// Middleware for serving static files.
app.use(express.static('public'));
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// GET Route for the notes API TO GET RENDERED notes
// app.get('/api/notes', (req, res) => {
//   console.log(note)
//   return res.json(note);
// });
// GET Route for all other pages
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// Listener for the server.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);