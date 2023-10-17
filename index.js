const express = require('express'); // express module to create a server application
const cors = require('cors'); // cors module to handle Preflight requests
const bodyParser = require('body-parser'); // body-parser module to parse JSON objects
const fs = require('fs'); // fs library to read and write files

const app = express(); // instance of an Express object
const port = 3000; // the port the server will be listening on
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});

app.use(cors({
    origin: 'http://localhost:5173' 
}));



// Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem: ", err);
        return;
    }
    console.log(`Server listening on http://localhost:${port}`);
})