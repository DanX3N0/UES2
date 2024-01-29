const express = require('express')
const Airtable = require('airtable')

const router = express.Router()

const base = new Airtable({
  apiKey:
    'patoi1hElggc1gKsQ.cfd3279fdb4cffdb240228ec646416fd8e0c161611d84717fa3bff465534de6a',
}).base('apphsdij83m655XYj')

router.get('/', (req, res) => {
  const items = []
  base('Records')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          items.push(record.fields)
        })
        fetchNextPage()
      },
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener los datos' })
        } else {
          res.json(items)
        }
      }
    )
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const items = []
  base('Records')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          items.push(record.fields)
        })
        fetchNextPage()
      },
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener los datos' })
        } else {
          if (id - 1 >= 0 && id - 1 <= items.length - 1) {
            res.json(items.at(id - 1))
          } else {
            res.json({ error: 'no se encontro el porducto' })
          }
        }
      }
    )
})

router.post('/', (req, res) => {
  const newItem = req.body
  base('Records').create(newItem, (err, record) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear un nuevo producto' })
    } else {
      res.status(201).json(record.find)
    }
  })
})

module.exports = router
