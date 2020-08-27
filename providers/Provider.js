'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const MarkdownService = require('./src/MarkdownService')
const Helpers = use('Helpers')
const edge = use('edge.js')

class Provider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Markdown', () => new MarkdownService)
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        edge.registerPresenters(Helpers.resourcesPath('presenters'))
    }
}

module.exports = Provider