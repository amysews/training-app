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

async function getData(req, res) {
    {
        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM test_table');
            const results = { 'results': (result) ? result.rows : null};
            res.render('pages/home', results );
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    }
}

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.send('hello world'))
    .get('/db', async (req, res) => await getData(req, res))
    .get('*', (req, res) => res.status(200).send({message: 'Welcome to nothing'}))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

module.exports = app;