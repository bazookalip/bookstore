const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));

const PORT = 5000;

const pool = pg.Pool({
    host: 'localhost', 
    port: 5432, 
    database: 'bookstore', 
    max: 10, 
    idleTimeoutMillis: 30000 
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

app.get('/magazines', (req, res) => {
    console.log('/magazines GET route was hit');
    pool.query('SELECT * FROM "magazines"')
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with magazines select', error);
            res.sendStatus(500);
        });
});

app.post('/magazines', (req, res) => {
    console.log('/magazines POST route was hit');
    pool.query(`INSERT INTO "magazines" ("title", "issue_number", "pages")
    VALUES ($1, $2, $3);`, [req.body.title, req.body.issue_number, req.body.pages])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with magazines insert', error);
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
            console.log('error with books insert', error);
            res.sendStatus(500);
        });
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});