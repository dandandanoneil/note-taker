// Dependency
const express = require("express");

// Create a server
const app = express();

// Set the port for local & Heroku use
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Establish listener
app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
});  