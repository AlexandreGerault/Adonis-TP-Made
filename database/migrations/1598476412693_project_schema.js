'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.integer('author_id').unsigned().references('id').inTable('users')
      table.string('name').notNullable().unique()
      table.text('description', 'longtext').notNullable()
      table.string('picture_url')
      table.string('design_link')
      table.text('rules')
      table.bool('is_published').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    // MANUALLY DROP AUTHOR FK
    this.drop('projects')
  }
}

module.exports = ProjectSchema
