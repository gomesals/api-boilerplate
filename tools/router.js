'use strict'

const chalk = require('chalk')
const jwt = require('./jwt')

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
 * @param {object} res Provided by express.
 * @param {number} status Status number.
 */
const status = (res, status) => {
  return res.sendStatus(status)
}
/**
 * Send text.
 * @param {object} res Provided by express.
 * @param {string} text Text to be sent.
 * @param {number} status Status number.
 */
const text = (res, text, status = false) => {
  if (status) return res.status(status).send(text)
  return res.send(text)
}
/**
 * Send json.
 * @param {object} res Provided by express.
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
/**
 * Send an error with json data.
 * @param {object} res Provided by express.
 * @param {object} data Error data.
 */
const __error = (res, data) =>
  res.status(data.status).json({ text: data.text, level: data.level })
/**
 * Send an error, or json, based on data's content.
 * @param {object} res Provided by express.
 * @param {object} data Data object.
 * @param {string} label Json's label.
 * @param {number} status Status number.
 */
const data = (res, data, label, status) => {
  if (data.isValid) {
    return json(res, data.data, label, status)
  }
  return __error(res, data)
}
/**
 * Send an error, or status, based on data.isValid.
 * @param {object} res Provided by express.
 * @param {object} data Data object.
 * @param {number} status Response's status.
 */
const updated = (res, data, status = 200) => {
  if (data.isValid) {
    return res.sendStatus(status)
  }
  return __error(res, data)
}

module.exports = {
  async,
  status,
  text,
  json,
  data,
  updated,
  ...jwt
}
