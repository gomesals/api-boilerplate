'use strict'

const chalk = require('chalk')
const moment = require('moment')
const mongoose = require('mongoose')

const error = chalk.bold.red
const warning = chalk.yellow
const success = chalk.green

const now = () => moment().format()

const connected = () => {
  console.log(success(`Mongoose connected: ${now()}`))
}

const errConenection = err => {
  console.log(error(`Error connecting to database: ${now()}`))
  console.error(warning(`\n|- ${err}`))
}

const disconnected = () => {
  console.error(error(`Mongoose disconnected: ${now()}`))
  console.error(error(`App stopped: ${now()}`))
  process.exit(1)
}

process.on('SIGINT', () => {
  console.log(warning(`App stopped: ${now()}`))
  process.exit(1)
})

module.exports = () => {
  console.log(success(`App started: ${now()}`))
  if (!process.env.MONGO) {
    console.error(
      error(
        'App initialization failed because it is not possible to connect to the database'
      ),
      warning('\n|- Missing: env.MONGO')
    )
    process.exit(1)
  }
  mongoose.connect(process.env.MONGO)
  mongoose.Promise = global.Promise
  mongoose.connection.on('connected', connected)
  mongoose.connection.on('error', errConenection)
  mongoose.connection.on('disconnected', disconnected)
}
