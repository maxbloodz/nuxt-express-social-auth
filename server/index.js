'use strict'
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * Passport Modules and Strategy
 */
const passport = require('passport')
const config = require('../nuxt.config.js')
const facebookStrategy = require('./config/auth.facebook')
const googleStrategy = require('./config/auth.google')

/**
 * Database Modules
 */
const db = require('./models')

// Social Authentication Controller
const socialAuthController = require('./controllers/socialAuthController')

/**
 * API Route
 */
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')

const app = express()

/**
 * Register Passport
 */
passport.use(facebookStrategy)
passport.use(googleStrategy)

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const corsOptions = {
    origin: '*'
  }

  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(passport.initialize())

  app.use('/api', authRouter)
  app.use('/api/users', userRouter)

  app.get(
    '/api/login/facebook',
    passport.authenticate('facebook', {
      scope: ['email'],
      session: false
    })
  )
  app.get(
    '/api/login/facebook/callback',
    passport.authenticate('facebook', {
      scope: ['email'],
      session: false
    }),
    socialAuthController.facebookCallback
  )

  app.get(
    '/api/login/google',
    passport.authenticate('google', {
      scope: ['email'],
      session: false
    })
  )
  app.get(
    '/api/login/google/callback',
    passport.authenticate('google', {
      scope: ['email'],
      session: false
    }),
    socialAuthController.googleCallback
  )

  db.connection.sync({ force: false })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
