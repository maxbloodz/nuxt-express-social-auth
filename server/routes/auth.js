'use strict'

const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const db = require('../models')
const tokenController = require('../controllers/tokenController')
const outputController = require('../controllers/outputController')

const Users = db.users
// const Op = db.Sequelize.Op
const router = express.Router()

/* POST LOG IN API. */
router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      outputController.error(res, 'Validation error.', 422, errors.array())
    } else {
      const email = req.body.email
      const password = req.body.password

      Users.findAll({
        where: {
          email
        }
      })
        .then((data) => {
          if (data.length === 0) {
            outputController.error(res, 'Wrong username.', 422)
          } else {
            const userData = data[0].dataValues
            const isValidPassword = bcrypt.compareSync(
              password,
              userData.password
            )
            if (isValidPassword) {
              const token = tokenController.generateAccessToken(userData.id)
              delete userData.id
              delete userData.password
              outputController.success(
                res,
                userData,
                'Login successfully.',
                token
              )
            } else {
              outputController.error(res, 'Wrong password.', 422)
            }
          }
        })
        .catch((error) => {
          outputController.error(res, 'Internal Server Error.', 500, error)
        })
    }
  }
)

/* POST REGISTER API. */
router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('first_name').notEmpty(),
    check('last_name').notEmpty()
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      outputController.error(res, 'Validation error.', 422, errors.array())
    } else {
      const salt = bcrypt.genSaltSync(15)
      const password = bcrypt.hashSync(req.body.password, salt)
      Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password
      })
        .then((data) => {
          const userData = data.dataValues
          const token = tokenController.generateAccessToken(data.id)
          delete userData.id
          delete userData.password
          delete userData.created_at
          delete userData.updated_at
          outputController.success(
            res,
            userData,
            'Register successfully.',
            token
          )
        })
        .catch((error) => {
          outputController.error(res, 'Internal Server Error.', 500, error)
        })
    }
  }
)

module.exports = router
