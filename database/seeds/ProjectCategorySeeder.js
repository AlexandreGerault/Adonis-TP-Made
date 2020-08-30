'use strict'

/*
|--------------------------------------------------------------------------
| ProjectCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ProjectCategorySeeder {
  async run () {
    await Database.table('project_categories').insert([
      {
        name: "Frontend",
        slug: "frontend"
      },
      {
        name: "Backend",
        slug: "backend"
      },
      {
        name: "Fullstack",
        slug: "fullstack"
      }
    ])
  }
}

module.exports = ProjectCategorySeeder
