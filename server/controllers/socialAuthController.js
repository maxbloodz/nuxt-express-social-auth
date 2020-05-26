'use strict'

const bcrypt = require('bcryptjs')
const db = require('../models')

const tokenController = require('../controllers/tokenController')

const Users = db.users
const Op = db.Sequelize.Op

// Login using Facebook OAuth Service
const facebookCallback = (req, res) => {
  const data = req.user._json

  Users.findOne({
    where: {
      email: {
        [Op.substring]: data.email
      }
    }
  })
    .then((user) => {
      if (user) {
        user
          .update({
            provider: 'facebook',
            uid: data.id
          })
          .then((result) => {
            if (result) {
              const token = tokenController.generateAccessToken(result.id)
              return res.redirect(`/callback?token=${token}`)
            } else {
              return res.redirect(`/callback?error=500`)
            }
          })
          .catch(() => {
            return res.redirect(`/callback?error=500`)
          })
      } else {
        const salt = bcrypt.genSaltSync(15)
        const password = bcrypt.hashSync('', salt)
        Users.create({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password,
          provider: 'facebook',
          uid: data.id
        })
          .then((data) => {
            const id = data.dataValues.id
            const token = tokenController.generateAccessToken(id)
            return res.redirect(`/callback?token=${token}`)
          })
          .catch(() => {
            return res.redirect(`/callback?error=500`)
          })
      }

      return null
    })
    .catch(() => {
      return res.redirect(`/callback?error=500`)
    })
}

// Login using Google OAuth Service
const googleCallback = (req, res) => {
  const data = req.user._json

  Users.findOne({
    where: {
      email: {
        [Op.substring]: data.email
      }
    }
  })
    .then((user) => {
      if (user) {
        user
          .update({
            provider: 'google',
            uid: data.sub
          })
          .then((result) => {
            if (result) {
              const token = tokenController.generateAccessToken(result.id)
              return res.redirect(`/callback?token=${token}`)
            } else {
              return res.redirect(`/callback?error=402`)
            }
          })
          .catch(() => {
            return res.redirect(`/callback?error=500`)
          })
      } else {
        const salt = bcrypt.genSaltSync(15)
        const password = bcrypt.hashSync('', salt)
        Users.create({
          first_name: data.given_name,
          last_name: data.family_name,
          email: data.email,
          password,
          provider: 'google',
          uid: data.sub
        })
          .then((data) => {
            const id = data.dataValues.id
            const token = tokenController.generateAccessToken(id)
            return res.redirect(`/callback?token=${token}`)
          })
          .catch(() => {
            return res.redirect(`/callback?error=500`)
          })
      }

      return null
    })
    .catch(() => {
      return res.redirect(`/callback?error=500`)
    })
}

module.exports = {
  facebookCallback,
  googleCallback
}
