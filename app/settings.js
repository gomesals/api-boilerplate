'use strict'

const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

module.exports = app => {
  app.use(
    helmet({
      referrerPolicy: { policy: 'same-origin' }
    })
  )
  app.use((req, res, next) => {
    res.append('Server', 'Powered by ME')
    return next()
  })
  app.use(compression())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(morgan('dev'))
  app.use(cookieParser())
}
