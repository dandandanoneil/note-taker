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
    
    // "POST" method gives the request (an object with title and text keys) a unique id, adds it to the notesArray required in from db.json, writes over that file with the new array, and returns the new note as an object
    app.post("/api/notes", function(req, res) {
        // Creates a new note with the data provided, and adds a unique id
        let newNote = req.body;
        newNote.id = uniqid();

        // Adds the new note to the array
        notesArray.push(newNote);

        // Writes over the db file with the updated array of notes, then returns the new note object
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), err => {
            if (!err) res.json(newNote);
            else throw new Error(err);
        });
        
    });

    // "DELETE" method removes the specified note from the array, rewrites db.json to reflect the change, and returns the updated array of notes
    app.delete("/api/notes/:id", function(req, res) {
        // Find the note with the specified ID and remove it from notesArray
        let noteID = req.params.id;
        for (var i = 0; i < notesArray.length; i++) {
            if (noteID === notesArray[i].id) {
                notesArray.splice(i, 1);
                i--;
            }
        }

        // Write over the db file with the updates array, then return the updated array
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray), err => {
            if (!err) res.json(notesArray);
            else throw new Error(err);
        });
    });    
}