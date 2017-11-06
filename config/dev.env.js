'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STRIPE_PUBLIC_KEY: "'pk_test_6pRNASCoBOKtIshFeQd4XMUh'",
  PHRASE_TIMEOUT: '420', // 420
  MESSAGE_TIMEOUT: '1100' // '1150'
})
