'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectCategorySchema extends Schema {
  up () {
    this.create('project_categories', (table) => {
      table.increments()
      table.string('name').unique()
      table.string('slug').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_categories')
  }
}

module.exports = ProjectCategorySchema
