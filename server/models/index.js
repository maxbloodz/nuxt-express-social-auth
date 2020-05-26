'use strict'

const Sequelize = require('sequelize')
const connection = require('../config/db.config')

const usersModel = require('./users')

const db = {
  Sequelize,
  connection,
  users: usersModel(connection, Sequelize)
}

module.exports = db
