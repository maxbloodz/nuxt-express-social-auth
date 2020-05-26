'use strict'

// Generate a success response
const success = (res, data, message, token = false) => {
  if (token) {
    return res.json({
      success: true,
      data,
      token,
      message
    })
  } else {
    return res.json({
      success: true,
      data,
      message
    })
  }
}

// Generate an error response
const error = (res, message = null, status = 500, error = null) => {
  return res.json({
    success: false,
    error,
    message
  })
}

module.exports = {
  success,
  error
}
