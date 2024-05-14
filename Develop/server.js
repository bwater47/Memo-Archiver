// Variables for requiring the express module, the path module, the clog function from the middleware folder, and the notes.js file from the routes folder.
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const api = require('./routes/notes.js');
// Constants for the port the server will run on and the app itself.
const PORT = process.env.PORT || 3001;

const app = express();
// Middleware console log function.
app.use(clog);