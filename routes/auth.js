'use strict'

const express = require('express')
const router = express.Router()

const ru = require('../tools/router')
const Users = require('../controllers/users')

const _login = async (req, res, next) => {
  const user = await Users.login(req.body.user)
  if (!user.isValid) {
    return ru.data(res, user)
  }
  req.user = user.content
  return next()
}

const _logout = async (req, res, next) => {
  req.user = null
  res.cookie('authorization', null, { maxAge: -1, httpOnly: true })
  res.sendStatus(204)
}

router.route('/login').post(ru.async(_login), ru._jwtCreate, ru._jwtSend)

router.route('/logout').get(ru.async(_logout))

module.exports = router
