'use strict'

const express = require('express')
const router = express.Router()

const ru = require('../tools/router')

const _get = async (req, res, next) => {
  return ru.text(res, 'hi public')
}

router.route('/').get(ru.asyncMdl(_get))

module.exports = router
