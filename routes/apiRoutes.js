// Dependencies: fs, path
const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');

// Import notes array from db.json
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
        newNote.id = uniqid();
        notesArray.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), err => {
            if (!err) res.json(newNote);
            else throw new Error(err);
        });
        
    });

    // "DELETE" method removes the specified note from the array and rewrites db.json to reflect the change
    app.delete("/api/notes/:id", function(req, res) {
        let noteID = req.params.id;

        // Find the note with the specified ID and remove it from notesArray
        for (var i = 0; i < notesArray.length; i++) {
            if (noteID === notesArray[i].id) {
                notesArray.splice(i, 1);
                i--;
            }
        }

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), err => {
            if (!err) res.json(notesArray);
            else throw new Error(err);
        });
    });    
}