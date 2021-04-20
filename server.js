const express = require('express');
const app = express();
const fs = require("fs");
const notes = require("./Develop/db/db.json");
const path = require("path")
const publicDirectoryPath = path.join(__dirname, "./Develop/public");

const PORT = process.env.PORT || 3000
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
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./Develop/db/db.json")));
const newNotes = req.body;
console.log({newNotes});
newNotes.id = uuid.v4();
notes.push(newNotes);
fs.writeFileSync(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(notes));
res.json(notes);
});
 
// delete specific notes
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./Develop/db/db.json")));
const deletelNote = notes.filter(removeNote => removeNote.id !== req.params.id);
fs.writeFileSync(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(deletelNote));

console.log({deletelNote})
res.json(notes);
});


// getting Htmls
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});


app.listen(PORT, () => {
console.log("The server is running on port 3000")
});