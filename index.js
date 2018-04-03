'use strict'
require('dotenv').load()

const chalk = require('chalk')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

require('./app/connect')()
require('./app/settings')(app)
require('./routes')(app)

app.listen(PORT, () => {
  console.log(chalk.green(` *** Server started at port ${PORT} *** `))
})
