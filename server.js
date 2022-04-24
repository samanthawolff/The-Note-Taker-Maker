// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');


// Sets up express
const app = express();
const PORT = process.env.PORT || 3001;


// Link to assets and setting up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// link HTML files together (HTML routes)
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// API routes
fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    // GET request
    app.get('/api/notes', function (req, res) {
        res.json(notes);
    });

    // POST request
    app.post('/api/notes', function (req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDatabase();
        console.log('New Note Added!');
    });

    // My attempt at a DELETE request (it only somewhat works :/ )
    app.delete('/api/notes/:id', function (req, res) {
        notes.splice(req.params.id, 1);
        updateDatabase();
        console.log('Your note was deleted!')
    });
});

// Set up listener
app.listen(PORT, () => {
    console.log('API server is ready on port ${PORT}')
});