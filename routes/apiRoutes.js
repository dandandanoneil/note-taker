// Dependencies: fs & notes array from db.json
const fs = require("fs");
const notesArray = require("../db/db.json");

// Exports a function (to server.js) that handles all api requests
module.exports = function(app) {
    // "GET" method returns the array of notes required in from db.json
    app.get("/api/notes", function(req, res) {
        res.json(notesArray);
    });
    
    // "POST" method adds the request (an object with title and text keys) to the notesArray required in from db.json, then writes over that file with the new array
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notesArray.push(newNote);
        fs.writeFile("../db/db.json", JSON.stringify(notesArray), err => throw err);
        res.json(newNote);
    });

    // "DELETE" methos removes the specified note from the array and rewrites db.json to reflect the change
    app.post("/api/notes/:id", function(req, res) {
        let noteID = req.params.id;

        // Find the note with the specified ID and remove it from notesArray
        for (var i = 0; i < notesArray.length; i++) {
            if (noteID === notesArray[i].id) {
                notesArray.splice(i, 1);
                i--;
            }
        }

        fs.writeFile("../db/db.json", JSON.stringify(notesArray), err => throw err);
        res.json(notesArray);
    });    
}