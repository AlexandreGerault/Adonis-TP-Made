'use strict'

class StoreProject {
    async authorize() {
        if (this.ctx.guard.denies('create')) {
            return redirect('back')
        }
        return true
    }

    get rules() {
        return {
            projectName: 'required|string|unique:projects,name',
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

module.exports = StoreProject