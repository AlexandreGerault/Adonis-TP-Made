'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/ProjectCategory')

/**
 * Resourceful controller for interacting with projectcategories
 */
class ProjectCategoryController {
    /**
     * Show a list of all projectcategories.
     * GET projectcategories
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {}

    /**
     * Display a single projectcategory.
     * GET projectcategories/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, auth, view }) {
        const category = await Category.query().with('projects', (builder) => {
            builder.where('is_published', true).orWhere('author_id', auth.user ? auth.user.id : null)
        }).where('id', params.id).first()
        const projects = category.getRelated('projects')

        return view.presenter('ProjectsListPresenter').render('categories.show', { category, projects })
    }
}

module.exports = ProjectCategoryController