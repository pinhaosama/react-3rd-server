const express = require('express'); // express module to create a server application
const cors = require('cors'); // cors module to handle Preflight requests
const bodyParser = require('body-parser'); // body-parser module to parse JSON objects
const fs = require('fs'); // fs library to read and write files

const app = express(); // instance of an Express object
const port = 3000; // the port the server will be listening on
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});

app.use(cors({
    origin: 'http://localhost:5000' 
}));



// Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem: ", err);
        return;
    }
    console.log(`Server listening on http://localhost:${port}`);
})

app.use(bodyParser.json());

app.options('/utility', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Headers', 'task');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.sendStatus(200);
});

app.get('/getScore', textBodyParser, async function (req,res){ 
     console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

 })