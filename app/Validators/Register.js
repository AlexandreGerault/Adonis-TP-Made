'use strict'

class Register {
    get rules() {
        return {
            username: 'required|string|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required|min:8|confirmed',
            password_confirmation: 'required_if:password|same:password'
        }
    }

    get sanitizationRules() {
        return {
            username: 'escape',
            email: 'escape|normalize_email'
        }
    }
    
    get validateAll() {
        return true
    }

    async fails (errorMessages) {
        this.ctx.session.withErrors(errorMessages).flashAll()
        return this.ctx.response.redirect('back')
    }
}

module.exports = Register