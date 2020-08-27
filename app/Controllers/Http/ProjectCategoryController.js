'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger')
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
    async index({
        request,
        response,
        view
    }) {}

    /**
     * Display a single projectcategory.
     * GET projectcategories/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({
        params,
        request,
        response,
        view
    }) {
        const category = await Category.query().with('projects').where('id', params.id).first()
        const projects = category.getRelated('projects')

        Logger.info('Project', projects.rows[0])

        return view.render('categories.show', { category, projects })
    }
}

module.exports = ProjectCategoryController