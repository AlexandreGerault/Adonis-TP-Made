'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index').as('home')

/**
 * Authentication routes
 */
Route.group(() => {
    Route.get('login', 'AuthController.loginForm')
    Route.post('login', 'AuthController.login')
  
    Route.get('register', 'AuthController.registerForm')
    Route.post('register', 'AuthController.register').validator('Register')
  }).middleware(['guest'])

Route.get('/logout', 'AuthController.logout').middleware('auth')
  
/**
 * Project routes
 */
Route.get('/projects', 'ProjectController.index').as('projects.index')
Route.get('/projects/create', 'ProjectController.create').as('projects.create').middleware('auth')
Route.get('/projects/:id/edit', 'ProjectController.edit').as('projects.edit').middleware('auth')
Route.get('/projects/:id', 'ProjectController.show').as('projects.show')
Route.put('/projects/:id', 'ProjectController.update').as('projects.update').validator('UpdateProject').middleware('auth')
Route.post('/projects', 'ProjectController.store').as('projects.store').validator('StoreProject').middleware('auth')

/**
 * Category routes
 */
Route.get('/category/:id', 'ProjectCategoryController.show').as('category.show')