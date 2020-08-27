'use strict'

const User = use('App/Models/User')

class AuthController {
    async loginForm({ view }) {
        return view.render('auth.login')
    }

    async login ({ auth, request, response, session }) {
        const { email, password } = request.only(['email', 'password'])
        try {
            await auth.attempt(email, password)
        } catch (exception) {
            sessionStorage.flash({ error: 'Invalid credentials.' })

            return response.redirect('login')
        }
        return response.redirect('/')
    }

    async logout ({ auth, response }) {
        await auth.logout()

        return response.redirect('/')
    }


    async registerForm ({ view }) {
        return view.render('auth.register')
    }

    async register ({ auth, request, response, session }) {
        const data = request.only(['username', 'email', 'password'])
        const newUser = await User.create(data)
        console.log(request)

        await auth.login(newUser)

        return response.redirect('/')
    }
}

module.exports = AuthController
