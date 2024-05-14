// Variables for requiring the express module, the uuid module, and the helper functions from fsUtils.js.
const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// DELETE Route for a specific note
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI note
notes.post("/", (req, res) => {
  const { title, note } = req.body;

  if (title && note) {
    const newNote = {
      title,
      note,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json")
      .then(() => res.json(`Note added successfully`))
      .catch((err) => res.status(500).send("Error in adding note"));
  } else {
    res.status(400).send("Both title and note ar required");
  }
});

module.exports = notes;
