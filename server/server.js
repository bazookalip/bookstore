const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));

const PORT = 5000;

const pool = pg.Pool({
    host: 'localhost', // where is your database?
    port: 5432, // what port is your database on? (Almost always 5432)
    database: 'bookstore', // the name of your database
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect, otherwise cancel query
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/books', (req, res) => {
    console.log('/books GET route was hit');
    pool.query('SELECT * FROM "books"')
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with book select', error);
            res.sendStatus(500);
        });
});

app.post('/books', (req, res) => {
    console.log('/books POST route was hit');
    pool.query(`INSERT INTO "books" ("title", "author", "published")
    VALUES ($1, $2, $3);`, [req.body.title, req.body.author, req.body.published])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with songs insert', error);
            res.sendStatus(500);
        });
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});