'use strict'

const Sequelize = require('sequelize')
const config = require('../../nuxt.config.js')

const minPool = config.env.DB_POOL_MIN
const maxPool = config.env.DB_POOL_MAX
const acquirePool = config.env.DB_POOL_ACQUIRE
const idlePool = config.env.DB_POOL_IDLE

const connection = new Sequelize(
  config.env.DB_NAME,
  config.env.DB_USERNAME,
  config.env.DB_PASSWORD,
  {
    host: config.env.DB_HOST,
    dialect: config.env.DB_DIALECT,
    operatorsAliases: 1,

    pool: {
      min: parseInt(minPool),
      max: parseInt(maxPool),
      acquire: parseInt(acquirePool),
      idle: parseInt(idlePool)
    }
  }
)

module.exports = connection
