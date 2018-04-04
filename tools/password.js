'use strict'

const crypto = require('crypto')

const encrypt = password => {
  const cipher = crypto.createCipher('aes192', process.env.HASH)
  password = cipher.update(password, 'utf8', 'hex')
  return cipher.final('hex')
}

const random = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(8, (err, buf) => {
      if (err) return reject(err)
      return resolve(buf.toString('base64'))
    })
  })
}

module.exports = {
  encrypt,
  random
}
