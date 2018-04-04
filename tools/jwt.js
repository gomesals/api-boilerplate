'use strict'

const jwt = require('jsonwebtoken')
const _jwt = require('express-jwt')

const __error = res => {
  return res.status(403).json({ text: 'Não autorizado', level: 'danger' })
}

const __getToken = req => {
  return (
    req.cookies.authorization ||
    req.query.authorization ||
    req.headers['authorization']
  )
}

const _jwtAuthenticate = _jwt({
  secret: process.env.JWT_SECRET,
  getToken: function fromCookie(req) {
    const token = __getToken(req)
    return token ? token : null
  }
})

const _jwtCreate = (req, res, next) => {
  if (!req.user) return next()
  const jwtPayload = {
    ...req.user
  }
  const jwtData = {
    expiresIn: process.env.JWT_DURATION
  }
  const secret = process.env.JWT_SECRET
  req.token = jwt.sign(jwtPayload, secret, jwtData)
  return next()
}

const _jwtSend = (req, res, next) => {
  if (!req.user) return __error(res)

  res.cookie('authorization', req.token, {
    maxAge: process.env.JWT_DURATION,
    httpOnly: true
  })
  return res.json({ auth: { authorization: req.token, ...req.user } })
}

const _jwtAllRoutes = (req, res, next) => {
  const token = __getToken(req)
  if (!token) return __error(res)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return __error(res)
    req.user = decoded
    return next()
  })
}

module.exports = {
  _jwtAuthenticate,
  _jwtCreate,
  _jwtSend,
  _jwtAllRoutes
}
