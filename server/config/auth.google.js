'use strict'

const passportGoogle = require('passport-google-oauth2')
const config = require('../../nuxt.config.js')

// eslint-disable-next-line import/no-mutable-exports
let googleStrategy = null

const passportConfig = {
  clientID: config.env.GOOGLE_CLIENT_ID,
  clientSecret: config.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/login/google/callback',
  profileFields: ['id', 'emails', 'name']
}

if (passportConfig.clientID) {
  googleStrategy = new passportGoogle.Strategy(passportConfig, function(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    return done(null, profile)
  })
}

module.exports = googleStrategy
