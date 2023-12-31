const express = require('express'); // express module to create a server application
const cors = require('cors'); // cors module to handle Preflight requests
const bodyParser = require('body-parser'); // body-parser module to parse JSON objects
const fs = require('fs'); // fs library to read and write files

const app = express(); // instance of an Express object
const port = 3000; // the port the server will be listening on
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8' });

const { updateScore } = require('./my_modules/score.js');
app.use(cors({
    origin: 'http://localhost:5000'
}));

app.options('/racedata', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, task"); // Allow the 'task 'header
    res.header('Access-Control-Allow-Methods', 'GET'); // Allow the GET method
    // res.header('Access-Control-Allow-Methods', 'POST'); // Allow the POST method
    // res.header('Access-Control-Allow-Methods', 'PUT'); // Allow the POST method
    res.sendStatus(200);
});


app.get('/racedata', async (req, res) => {
    console.log('receiveing Get request at /racedata with task: ' + req.headers['task']);
    if (req.headers['task'] === 'getStuff') {
        try {
            const fileData = await fs.promises.readFile('data/points.json');
            const racers = JSON.parse(fileData);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(racers);
        } catch {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error' });
        }
    } else {
        console.error('task errada');
        res.status(500).json({ error: 'Error' });
    }
})

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

app.post('/score', textBodyParser, async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers);
    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    if (reqTask == 'updateScore') {
        console.log('req.query: ', req.body);
        let request = JSON.parse(req.body);
        filePath = './data/points.json';
        studentName = request.name.selectValue;
        score = request.points.inputValue;
        await updateScore(filePath, studentName, score);
        const fileData = await fs.promises.readFile('data/points.json');
        const results = JSON.parse(fileData);
        res.status(200).json(results);
    }
});

app.get('/score', textBodyParser, async function (req, res) {
    console.log('req.headers: ', req.headers);
    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    if (reqTask == 'getScore') {
        try {
            const fileData = await fs.promises.readFile('data/points.json');
            const results = JSON.parse(fileData);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
})