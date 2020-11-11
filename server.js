// Dependency
const express = require("express");

// Create a server & set the port for localhost & Heroku use
const app = express();
const PORT = process.env.PORT || 8080;

// Create req.params and req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tell the server to look in the public folder for static files (css, js, html, etc)
app.use(express.static('public'));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);	

// Establish listener
app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
});  
