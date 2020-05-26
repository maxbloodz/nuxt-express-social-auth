'use strict'

const express = require('express')
const db = require('../models')
const tokenController = require('../controllers/tokenController')
const outputController = require('../controllers/outputController')

const Users = db.users
// const Op = db.Sequelize.Op
const router = express.Router()

router.use((req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.token = req.headers.authorization.split(' ')[1]
    next()
  } else if (req.query && req.query.token) {
    req.token = req.query.token
    next()
  }

  return null
})

/* GET home page. */
router.get('/', function(req, res) {
  const verify = tokenController.verifyAccessToken(req)
  if (verify.success && verify.id) {
    Users.findAll({
      where: { id: parseInt(verify.id[0]) },
      attributes: { exclude: ['password'] }
    })
      .then((data) => {
        outputController.success(res, data[0], 'Get user successfully.')
      })
      .catch((error) => {
        outputController.error(res, 'Internal Server Error.', 500, error)
      })
  } else {
    outputController.error(res, verify.message, verify.code)
  }
})

module.exports = router
