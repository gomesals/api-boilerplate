'use strict'

const jwt = require('jsonwebtoken')

/**
 * Sends error 403 to client.
 * @param  {object} res Response object.
 * @return {object}     Info regarding auth.
 */
const __error = res => {
  return res.status(403).json({ text: 'Não autorizado', level: 'danger' })
}
/**
 * Extracts authorization token from cookies, queryStrings or headers.
 * @param  {object} req Request object.
 * @return {string||undefined}     Authorization token or undefined.
 */
const __getToken = req => {
  const _token =
    req.cookies.authorization ||
    req.query.authorization ||
    req.headers['authorization']
  if (!_token) return undefined
  const token = _token.split(' ')
  return token[token.length - 1]
}
/**
 * Creates jwt.
 * @param  {object}   req  Request object.
 * @param  {object}   res  Response object.
 * @param  {Function} next Next function.
 * @return {Function}        Call next function.
 */
const _jwtCreate = (req, res, next) => {
  if (req.user) {
    req.token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_DURATION
    })
  }
  return next()
}
/**
 * Sends the jwt.
 * @param  {object}   req  Request object.
 * @param  {object}   res  Response object.
 * @param  {Function} next Next function.
 * @return {object}        Response object regarding token.
 */
const _jwtSend = (req, res, next) => {
  if (!req.user) return __error(res)

  res.cookie('authorization', req.token, {
    maxAge: process.env.COOKIE_DURATION,
    httpOnly: true
  })
  return res.json({ authorization: req.token, data: req.user })
}
/**
 * Validates a authorization token from user.
 * @param  {object}   req  Request object.
 * @param  {object}   res  Response object.
 * @param  {Function} next Next function.
 * @return {object||Function}        Error response || Call next function.
 */
const _jwtAuth = (req, res, next) => {
  const token = __getToken(req)
  if (!token) return __error(res)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return __error(res)
    req.user = decoded
    return next()
  })
}

module.exports = {
  _jwtCreate,
  _jwtSend,
  _jwtAuth
}
