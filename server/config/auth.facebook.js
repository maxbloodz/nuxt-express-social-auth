'use strict'

const passportFacebook = require('passport-facebook')
const config = require('../../nuxt.config.js')

// eslint-disable-next-line import/no-mutable-exports
let facebookStrategy = null

const passportConfig = {
  clientID: config.env.FACEBOOK_CLIENT_ID,
  clientSecret: config.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/api/login/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}

if (passportConfig.clientID) {
  facebookStrategy = new passportFacebook.Strategy(passportConfig, function(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    return done(null, profile)
  })
}

module.exports = facebookStrategy
