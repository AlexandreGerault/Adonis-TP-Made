'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddProjectCategoryRelationshipsSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.integer('category_id').unsigned().references('id').inTable('categories')
    })
  }

  down () {
    this.table('projects', (table) => {
      // DROP THE FK
    })
  }
}

module.exports = AddProjectCategoryRelationshipsSchema
