'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PHRASE_TIMEOUT: '420',
  MESSAGE_TIMEOUT: '800' // '1150'
})
