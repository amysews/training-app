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

async function requestData(req, res, query, values, name) {
    {
        try {
            const client = await pool.connect()
            const result = await client.query(query, values);
            const results = { [name]: (result) ? result.rows : null};
            res.json(results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    }
}

function getAllMeasures(req, res) {
    return requestData(req, res, 'SELECT * FROM measures', [], 'measures')
}

function getMeasure(req, res) {
    return requestData(req, res, 'SELECT * FROM measures WHERE id = $1', [req.params.id], 'measure')
}

function getExercises(req, res) {
    return requestData(req, res, 'SELECT * FROM exercises', [], 'exercises')
}

app
    // .set('views', path.join(__dirname, 'views'))
    // .set('view engine', 'ejs')
    .get('/', (req, res) => res.send('hello world'))
    .get('/exercises', async (req, res) => await getExercises(req, res))
    .get('/measures', async (req, res) => await getAllMeasures(req, res))
    .get('/measures/:id', async (req, res) => await getMeasure(req, res))
    // .get('/form', async (req, res) => res.render('pages/home'))
    .get('*', (req, res) => res.status(200).send({message: 'Welcome to nothing'}))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;