'use strict'

const express = require('express')
const router = express.Router()

const ru = require('../tools/router')
const Users = require('../controllers/users')

const _get = async (req, res, next) => {
  const data = await Users.find()
  return ru.data(res, data, 'users')
}
const _post = async (req, res, next) => {
  const data = await Users.create(req.body.user)
  return ru.data(res, data, 'user')
}

const _getOne = async (req, res, next) => {
  const data = await Users.findOne(req.params.id)
  return ru.data(res, data, 'user')
}
const _put = async (req, res, next) => {
  const data = await Users.update(req.params.id, req.body.user)
  return ru.updated(res, data, 200)
}
const _delete = async (req, res, next) => {
  const data = await Users.remove(req.params.id)
  return ru.updated(res, data, 204)
}

router
  .route('/')
  .get(ru.async(_get))
  .post(ru.async(_post))

router
  .route('/:id')
  .get(ru.async(_getOne))
  .put(ru.async(_put))
  .delete(ru.async(_delete))

module.exports = router
