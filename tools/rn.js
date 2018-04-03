'use strict'
/**
 * Functions used by controllers when returning data.
 */
const chalk = require('chalk')
/**
 * Console.error(e)
 * @param {string} e Error.
 */
const ce = e => console.error(chalk.bold.red(e))
/**
 * Return an error.
 * @param {number} status Response's status.
 * @param {string} message Text to be sent.
 * @param {string} level Message's level.
 */
const error = (status, text, level = 'danger') => {
  const response = {
    status,
    isValid: false,
    level
  }
  if (text) {
    return { ...response, text }
  }
  if (status === 404) {
    response.text = 'Não encontrado.'
  }
  if (status === 400) {
    response.text = 'Não foi possível realizar a operação.'
  }
  if (status === 500) {
    response.text = 'Erro interno.'
  }
  return response
}
/**
 * Catch an error from try/catch.
 * @param {Error} e Error.
 */
const _catch = e => {
  ce(e)
  if (e.name === 'CastError' && e.kind === 'ObjectId') return error(404)
  return error(500)
}
/**
 * Return data from database.
 * @param {object} data Response's data.
 * @param {number} status Response's status.
 */
const data = (data = [], status = 200) => {
  return {
    isValid: true,
    status,
    data
  }
}
/**
 * Return if an update or delete was successful.
 * @param {number} ok 0 || 1. Resulted by update|delete.
 * @param {number} status Response's status.
 * @param {object} data Response's data.
 */
const update = (ok, status = 200, data = null) => {
  if (ok === 0) return error(400)
  return { isValid: true, status, data }
}

module.exports = {
  error,
  update,
  data,
  _catch
}
