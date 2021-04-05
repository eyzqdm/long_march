/**
 * @description jest server
 * @author eyz
 */

const request = require('supertest')
const server = require('../app.js').callback()

module.exports = request(server)
