'use strict'
require('dotenv').load()

const chalk = require('chalk')
const moment = require('moment')
const express = require('express')
const eventEmitter = require('./tools/event')

const app = express()

const PORT = process.env.PORT || 8080

require('./app/connect')()
require('./app/settings')(app)
require('./routes')(app)

const startServer = () => {
  app.listen(PORT, () => {
    console.log(
      moment().format(),
      chalk.green(`App running at port ${chalk.bold(PORT)}!`)
    )
  })
}

eventEmitter.on('database.connected', () => {
  startServer()
})
