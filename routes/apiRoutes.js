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
        notesArray.push(req);
        fs.writeFile("../db/db.json", JSON.stringify(notesArray));
        res.json(req);
    });

    // "DELETE" methos removes the specified note from the array and rewrites db.json to reflect the change
    app.post("/api/notes/:id", function(req, res) {
        let noteID = req.params.id;

        for (var i = 0; i < notesArray.length; i++) {
            if (noteID === notesArray[i].id) {
              return res.json(characters[i]);
            }
        }

        fs.writeFile("../db/db.json", JSON.stringify(notesArray));
        res.json({ ok: true });
    });    
}