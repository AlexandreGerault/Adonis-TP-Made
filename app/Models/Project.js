'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    category () {
        return this.belongsTo('App/Models/ProjectCategory', 'category_id', 'id')
    }

    author () {
        return this.belongsTo('App/Models/User', 'author_id', 'id')
    }

    static scopePublished (query) {
        return query.where('is_published', true)
    }
}

module.exports = Project
