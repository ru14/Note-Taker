const express = require('express');
const app = express();
const fs = require("fs");
const util = require("util");
const notes = require("./db/db.json");
const path = require("path")
const publicDirectoryPath = path.join(__dirname, "./Develop/public");

app.use(express.urlencoded({ extended: true})) ;
app.use(express.json());
app.use(express.static("publicDirectoryPath"));


app.get('/api/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
});

app.post("/api/notes", (req, res) => {
const notes = Json.parse(fs.readFileSync("./Develop/db/db.json"));
const newNotes = req.body;
notes.push(newNotes);
fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
res.json(notes);
});
 
app.listen(3000)