'use strict'

const Projects = require('../../Services/Projects')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const ProjectService = use('ProjectService')
const Project = use('App/Models/Project')
const ProjectCategory = use('App/Models/ProjectCategory')
const Logger = use('Logger')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
    /**
     * Show a list of all projects.
     * GET projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, view }) {
        const { page } = request.get('page', 1)
        const projects = await Project.query().paginate(page, 5)
        return view.presenter('ProjectsListPresenter').render('project.index', { projects })
    }

    /**
     * Render a form to be used for creating a new project.
     * GET projects/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ view }) {
        const categories = await ProjectCategory.all()

        return view.render('project.create', {
            categories: categories.toJSON()
        })
    }

    /**
     * Create/save a new project.
     * POST projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth, response }) {
        const project = await ProjectService.createFromRequest({ request, auth })

        return response.redirect('/projects/' + project.id)
    }

    /**
     * Display a single project.
     * GET projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, view }) {
        const project = await Project.query().with('author').with('category').where('id', params.id).first()

        return view.presenter('ShowProjectPresenter').render('project.show', {project})
    }

    /**
     * Render a form to update an existing project.
     * GET projects/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
        const project = await Project.findOrFail(params.id)

        return view.render('project.edit', { project })
    }

    /**
     * Update project details.
     * PUT or PATCH projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        // const project = await UpdateExistingProject.updateFromRequest(request.except(['_csrf']), await Project.findOrFail(params.id))
        
        return response.redirect('/projects/' + project.id)
    }

    /**
     * Delete a project with id.
     * DELETE projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = ProjectController