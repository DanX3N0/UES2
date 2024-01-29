const express = require('express')
const Airtable = require('airtable')
const bodyParser = require('body-parser')
const routeRecords = require('./routes/records')

const app = express()

const base = new Airtable({
  apiKey:
    'patoi1hElggc1gKsQ.cfd3279fdb4cffdb240228ec646416fd8e0c161611d84717fa3bff465534de6a',
}).base('apphsdij83m655XYj')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/records', routeRecords)

app.use((req, res) => {
  res.status(404).send('Pagina no existente.')
})

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, (req, res) => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})
