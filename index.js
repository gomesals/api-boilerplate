'use strict'
require('dotenv').load()

const chalk = require('chalk')
const express = require('express')
const app = express()
const ru = require('./tools/router')

const PORT = process.env.PORT || 8080

require('./app/connect')()
require('./app/settings')(app)

app.get('/', (req, res) => {
  return ru.text(res, 'ok')
})

// 404
app.all('*', (req, res) => {
  return ru.status(res, 404)
})

app.listen(PORT, () => {
  console.log(chalk.green(` *** Server started at port ${PORT} *** `))
})
