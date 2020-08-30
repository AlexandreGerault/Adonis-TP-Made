'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectCategory extends Model {
    static boot () {
        super.boot()

        this.addHook('afterSave', 'ProjectHook.updateGlobalCategorieInView')
    }

    projects () {
        return this.hasMany('App/Models/Project', 'id', 'category_id')
    }
}

module.exports = ProjectCategory
