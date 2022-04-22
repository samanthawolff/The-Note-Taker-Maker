const express = require('express');
const mySQL = require('mysql');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, () => {
    console.log('API server is ready on port ${PORT}')
});