const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const path = require('path')

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const app = express()

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requestData(req, res, query, page) {
    {
        try {
            const client = await pool.connect()
            const result = await client.query(query);
            const results = { 'results': (result) ? result.rows : null};
            res.json(results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    }
}

function getExercises(req, res) {
    return requestData(req, res, 'SELECT * FROM exercises', 'pages/exercises')
}

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.send('hello world'))
    .get('/exercises', async (req, res) => await getExercises(req, res))
    .get('/form', async (req, res) => res.render('pages/home'))
    .get('*', (req, res) => res.status(200).send({message: 'Welcome to nothing'}))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;