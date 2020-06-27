'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '"http://localhost:9001"', //访问Nginx，由Nginx转发到其他路径
  OSS_PATH: '"https://sher6jedu.oss-cn-beijing.aliyuncs.com"',
})
