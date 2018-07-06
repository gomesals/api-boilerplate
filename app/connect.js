'use strict'

const chalk = require('chalk')
const moment = require('moment')
const mongoose = require('mongoose')
const EventEmitter = require('../tools/event')

const now = () => moment().format()

const stopApp = () => {
  console.error(now(), chalk.bold.red('App stopped.'))
  process.exit(1)
}

const connected = () => {
  process.stdout.write(chalk.green('.'))
  process.stdout.write('\n')
  console.log(now(), chalk.green('Mongoose connected.'))
  EventEmitter.emit('database.connected')
}

const errConenection = err => {
  process.stdout.write(chalk.green('.'))
  process.stdout.write('\n')
  console.error(now(), chalk.bold.red('Error connecting to database.'))
  console.error(warning(`  |- ${err}`))
  stopApp()
}

const disconnected = () => {
  console.error(now(), chalk.yellow('Mongoose disconnected.'))
  stopApp()
}

process.on('SIGINT', stopApp)

module.exports = () => {
  process.stdout.write(now())
  process.stdout.write(' ')
  process.stdout.write(chalk.green('Starting app.'))
  if (!process.env.MONGO) {
    errConenection('Missing: env.MONGO')
    stopApp()
  }
  process.stdout.write(chalk.green('.'))
  mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
  mongoose.Promise = global.Promise
  mongoose.connection.on('connected', connected)
  mongoose.connection.on('error', errConenection)
  mongoose.connection.on('disconnected', disconnected)
}
