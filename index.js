'use strict'
require('dotenv').load()

const express = require('express')
const app = express()

require('./app/connect')()