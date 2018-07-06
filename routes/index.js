'use strict'

const ru = require('../tools/router')

module.exports = app => {
  app.use('/api/auth', require('./auth'))
  app.use('/api/users', require('./users'))

  // 404
  app.all('*', (req, res) => ru.status(res, 404))
}
