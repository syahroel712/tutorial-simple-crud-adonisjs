'use strict'

const Response = require('@adonisjs/framework/src/Response')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticate {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({
    request,
    auth,
    response
  }, next) {
    // call next to advance the request
    try {
      await auth.check()
    } catch (error) {
      return response.route('/login')
    }

    await next()
  }
}

module.exports = Authenticate
