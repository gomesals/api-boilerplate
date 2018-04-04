'use strict'

const ru = require('../tools/router')

module.exports = app => {
  app.use('/api/auth', require('./auth'))
  app.use('/api/public', require('./public'))

  app.use(ru._jwtAllRoutes)

  app.use('/api/users', require('./users'))
  // 404
  app.all('*', (req, res) => {
    return ru.status(res, 404)
  })
}
