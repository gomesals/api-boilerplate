'use strict'

const ru = require('../tools/router')

module.exports = app => {
  app.get('/', (req, res) => {
    return ru.text(res, 'ok')
  })
  app.use('/api/public', require('./public'))
  // 404
  app.all('*', (req, res) => {
    return ru.status(res, 404)
  })
}
