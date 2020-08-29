'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Projects = require('../app/Services/Projects')

class ProjectProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('ProjectService', () => {
            const Project = use('App/Models/Project')
            const ProjectCategory = use('App/Models/ProjectCategory')

            return new Projects(Project, ProjectCategory)
        })
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
        //
    }
}

module.exports = ProjectProvider