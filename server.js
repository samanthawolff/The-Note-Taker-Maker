const express = require('express');
const mySQL = require('mysql');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () => {
    console.log('API server is ready on port ${PORT}')
});