const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config')
const { Client } = require('pg')
const sequelize_sync = require('../models/user')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`))

app.get('/posts', (req, res) => {
    res.send(
        [{
            title: "Hello World!",
            description: "Hi there! How are you?"
        }]
    )
})

const client = new Client({
    host: '94.228.196.246',
    port: 5434,
    user: 'lk',
    password: 'AJFGrLs6azpwE3k',
    database: 'service'
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

client.query(`SELECT site.receptiondocuments('{"customer_id" : "     YSEL" , "start_date" : "2019-09-01" , "stop_date" : "2019-12-01", "maximum_rows" : 600}');`)
    .then(result => console.log(result.rows[0].receptiondocuments.doc_lines.length))
    .catch(e => console.error(e.stack))
    .then(() => client.end())

sequelize_sync()