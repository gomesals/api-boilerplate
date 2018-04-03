'use strict'

const chalk = require('chalk')

const error = chalk.bold.red
const warning = chalk.yellow

/**
 * Handles async functions.
 * @param {function} fn Function executed.
 */
const async = (fn, level = false) => (req, res, next) => {
  if (level && (!req.user || !req.user.isAdmin)) {
    return status(res, 403)
  }
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error(error('ASYNC error'), warning(`\n|- ${err}`))
    return next(err)
  })
}
/**
 * Send status.
 * @param {object} res Res object, provided by express.
 * @param {number} status Status number.
 */
const status = (res, status) => {
  return res.sendStatus(status)
}
/**
 * Send text.
 * @param {object} res Res object, provided by express.
 * @param {string} text Text to be sent.
 * @param {number} status Status number.
 */
const text = (res, text, status = false) => {
  if (status) return res.status(status).send(text)
  return res.send(text)
}
/**
 * Send json.
 * @param {object} res Res object, provided by express.
 * @param {object} data Data do be sent.
 * @param {string} label Label to be used by data.
 * @param {number} status Status number.
 */
const json = (res, data, label, status) => {
  const response = {}
  response[label] = data
  if (status) return res.status(status).json({ ...response })
  return res.json({ ...response })
}

module.exports = {
  async,
  status,
  text,
  json
}
