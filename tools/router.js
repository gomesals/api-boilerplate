'use strict'

const chalk = require('chalk')
const moment = require('moment')
const jwt = require('./jwt')

const now = () => moment().format()

/**
 * Handles async functions.
 * @param {function} fn Function executed.
 */
const async = (fn, level = false) => async (req, res, next) => {
  if (level && (!req.user || !req.user.isAdmin)) {
    return res.sendStatus(403)
  }
  try {
    await fn(req, res, next)
  } catch (e) {
    if (e.name === 'CastError' && e.kind === 'ObjectId') {
      return res.sendStatus(404)
    }
    if (e.code === 11000) {
      return res.status(409).json({
        text: 'Objeto já cadastrado.',
        level: 'danger'
      })
    }
    console.log(now())
    console.error(chalk.bold.red(e))
    console.error(e)
    return res.status(500).json({
      text: 'Erro interno.',
      level: 'danger'
    })
  }
}
/**
 * Send an error, or json, based on data's content.
 * @param {object} res Provided by express.
 * @param {object} data Data object.
 * @param {string} label Json's label.
 * @param {number} status Status number.
 */
const data = (res, data, label = 'data') => {
  if (!data.content) {
    return res.sendStatus(data.status)
  }
  if (data.isValid) {
    const response = {
      request: { ...data }
    }
    delete response.request.content
    response[label] = data.content
    if (data.hasStatus) {
      return res.status(data.status).json({ ...response })
    }
    return res.json({ ...response })
  }
  return res.status(data.status).json({
    text: data.content,
    level: 'danger'
  })
}
module.exports = {
  async,
  data,
  ...jwt
}
