'use strict'

const Project = use('App/Models/Project')

class UpdateProject {
    async authorize() {
        const project = await Project.findOrFail(this.ctx.params.id)
        if (this.ctx.guard.denies('update', project)) {
            this.ctx.response.unauthorized('Vous ne pouvez pas éditer ce projet')
            return false
        }
        return true
    }

    get rules() {
        return {
            projectName: `required|string|unique:projects,name,id,${ this.ctx.params.id }`,
            projectType: 'required|number|exists:project_categories,id',
            designUrl: 'url|starts_with:https\://www.figma.com/file/',
            description: 'required|string',
            rules: 'string'
        }
    }

    get sanitizationRules() {
        return {
            projectName: 'escape',
            description: 'escape',
            rules: 'escape'
        }
    }

    async fails(errorMessages) {
        return this.ctx.response.send(errorMessages)
    }

    get validateAll() {
        return true
    }
}

module.exports = UpdateProject