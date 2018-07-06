'use strict'
/**
 * Functions used by controllers when returning data.
 */

const status = status => {
  return {
    isValid: status >= 200 && status <= 300,
    status
  }
}

const content = (content, status = 200) => {
  return {
    isValid: status >= 200 && status <= 300,
    status,
    hasStatus: status !== 200,
    content
  }
}

const operation = (ok, status = 200, content = null) => {
  if (ok === 0) {
    return {
      isValid: false,
      status: 400,
      hasStatus: status !== 200,
      content: 'Não foi possível realizar a operação.'
    }
  }
  return {
    isValid: true,
    status,
    hasStatus: status !== 200,
    content
  }
}

module.exports = {
  status,
  content,
  operation
}
