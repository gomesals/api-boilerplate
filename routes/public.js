'use strict'

const express = require('express')
const router = express.Router()

const ru = require('../tools/router')

const _get = async (req, res, next) => {
  return ru.text(res, 'hi public')
}

const _getAdmin = async (req, res, next) => {
  return ru.text(res, 'hi public admin')
}

router.route('/').get(ru.async(_get))
router.route('/admin').get(ru.async(_getAdmin, true))

module.exports = router
