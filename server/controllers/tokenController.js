'use strict'

const jwt = require('jsonwebtoken')

const Hashids = require('hashids/cjs')
const config = require('../../nuxt.config.js')
const hashID = new Hashids('', 10)

// Generate an Access Token for the given User ID
const generate = (id) => {
  const expiresIn = config.env.JWT_EXP
  const secret = config.env.JWT_SECRET
  let token = null
  try {
    token = jwt.sign(
      {
        session: hashID.encode(id)
      },
      secret,
      {
        expiresIn: parseInt(expiresIn)
      }
    )
  } catch (error) {}

  return token
}

// Verify an Access Token for the given User ID
const verify = (req) => {
  const token = req.token || ''
  try {
    if (!token) {
      return {
        success: false,
        code: 401,
        message: 'Unauthorized'
      }
    }
    const decrypt = jwt.verify(token, config.env.JWT_SECRET)
    return {
      success: true,
      id: hashID.decode(decrypt.session)
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: error
    }
  }
}

module.exports = {
  generateAccessToken: generate,
  verifyAccessToken: verify
}
