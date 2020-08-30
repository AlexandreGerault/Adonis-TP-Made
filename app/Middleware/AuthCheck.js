'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthCheck {
    /**
     * @param {object} ctx
     * @param {Function} next
     */
    async handle({
        response,
        auth
    }, next) {
        try {
            await auth.check()
        } catch(exception) {
            return response.redirect('/login')
        }
        await next()
    }
}

module.exports = AuthCheck