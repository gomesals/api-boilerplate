'use strict'

const ru = require('../tools/router')

module.exports = app => {
  app.use('/api/public', require('./public'))
  app.use('/api/users', require('./users'))
  // 404
  app.all('*', (req, res) => {
    return ru.status(res, 404)
  })
}
