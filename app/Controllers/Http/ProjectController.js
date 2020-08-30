'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const ProjectService = use('ProjectService')
const Project = use('App/Models/Project')
const ProjectCategory = use('App/Models/ProjectCategory')

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
    async index({ request, view, auth }) {
        const { page } = request.get('page', 1)
        const projects = await Project.query().with('author').where(function() {
            this.where('is_published', true).orWhere('author_id', auth.user.id)
        }).paginate(page, 5)
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
    async create({ view, guard, response }) {
        const categories = await ProjectCategory.all()
        if(guard.denies('create', new Project())) {
            return response.redirect('back')
        }

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
    async show({ params, response, guard, view }) {
        const project = await Project.query().with('author').with('category').where('id', params.id).first()
        if (guard.denies('show', project)) {
            return response.redirect('back')
        }

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
    async edit({ params, guard, response, view }) {
        const project = await Project.findOrFail(params.id)

        if (guard.denies('update', project)) {
            return response.redirect('back')
        }

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
        const project = await ProjectService.updateFromRequest({ request, project: await Project.findOrFail(params.id) })
        
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