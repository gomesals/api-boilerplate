'use strict'

const Users = require('../models/users')
const rn = require('../tools/rn')
const password = require('../tools/password')

const Crud = require('./crud')

const find = async (params = '') => {
  const data = await Crud.find(Users)()
  return rn.content(data)
}

const findById = async (_id, params = '') => {
  const data = await Crud.findById(Users)(_id, params)
  if (!data) return rn.status(404)
  return rn.content(data)
}

const findOne = async (query, params = '') => {
  const data = await Crud.findOne(Users)(query, params)
  if (!data) return rn.status(404)
  return rn.content(data)
}

const create = async data => {
  data.password = password.encrypt(data.password)
  const { _id } = await Crud.create(Users)(data)
  return rn.content(_id, 200)
}

const update = async (_id, data) => {
  if (data.password) {
    if (
      data.password === '' ||
      data.password.trim() === '' ||
      data.password.length === 0
    ) {
      delete data.password
    } else {
      data.password = password.encrypt(data.password)
    }
  } else {
    delete data.password
  }
  const { ok } = await Crud.update(Users)({ _id }, data)
  return rn.operation(ok)
}

const remove = async _id => {
  const { ok } = await Crud.remove(Users)(_id)
  return rn.operation(ok)
}

const login = async user => {
  user.password = password.encrypt(user.password)
  const data = await Users.findOne(
    { email: user.email, password: user.password },
    'name email isAdmin'
  ).lean()
  if (!data) {
    return {
      isValid: false,
      status: 403,
      hasStatus: true,
      content: 'E-mail e/ou senha inválidos.'
    }
  }
  return rn.content(data)
}

module.exports = {
  find,
  findById,
  findOne,
  create,
  update,
  remove,
  login
}
