'use strict'

const mongoose = require('mongoose')

const Users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, select: false }
})

module.exports = mongoose.model('Users', Users, 'users')
