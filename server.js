const express = require('express');
const app = express();
const fs = require("fs");
const util = require("util");
const notes = require("./Develop/db/db.json");
const path = require("path")
const publicDirectoryPath = path.join(__dirname, "./Develop/public");

app.use(express.urlencoded({ extended: true})) ;
app.use(express.json());
app.use(express.static(publicDirectoryPath));

// join and save notes
app.get('/api/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
});


// new note
const uuid = require("uuid");
app.post("/api/notes", (req, res) => {
const notes = Json.parse(fs.readFileSync("./Develop/db/db.json"));
const newNotes = req.body;
newNotes.id = uuid.v4();
notes.push(newNotes);
fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
res.json(notes);
});
 
// delete specific notes
app.delete("/api/notes/:id", (req, res) => {
const notes = Json.parse(fs.readFileSync("./Develop/db/db.json"));
const deletelNote = notes.filter((removeNote) => removeNote.id !== req.parse.id);
res.json(deletelNote);
});


// getting Htmls
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})
app.listen(3000)