'use strict'

const Users = require('../models/users')
const rn = require('../tools/rn')
const password = require('../tools/password')

const find = async (params = '') => {
  try {
    const users = await Users.find({}, params).lean()
    return rn.data(users)
  } catch (e) {
    return rn._catch(e)
  }
}

const findOne = async (_id, params = '') => {
  try {
    const user = await Users.findById(_id, params).lean()
    return rn.data(user)
  } catch (e) {
    return rn._catch(e)
  }
}

const create = async data => {
  try {
    data.password = password.encrypt(data.password)
    const { _id } = await new Users(data).save()
    return rn.data({ _id }, 201)
  } catch (e) {
    return rn._catch(e)
  }
}

const update = async (_id, data) => {
  try {
    const { ok } = await Users.update({ _id }, { $set: data })
    return rn.update(ok)
  } catch (e) {
    return rn._catch(e)
  }
}

const remove = async _id => {
  try {
    const { ok } = await Users.remove({ _id })
    return rn.update(ok)
  } catch (e) {
    return rn._catch(e)
  }
}

module.exports = { find, findOne, create, update, remove }
