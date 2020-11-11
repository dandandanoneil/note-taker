// Dependency for file paths
const path = require("path");

// Exports a function (to server.js) that handles routing to html docs
module.exports = function(app) {
  // Returns notes.html when requested
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  // Returns index.html in all other cases
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};  