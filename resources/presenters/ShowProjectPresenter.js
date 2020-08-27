const BasePresenter = require('edge.js').BasePresenter
const Markdown = use('Markdown')

class ShowProjectPresenter extends BasePresenter {
    get project () {
        this.$data.project.description = Markdown.toHtml(this.$data.project.description)
        return this.$data.project
    }

    get author () {
        return this.$data.project.getRelated('author')
    }

    get category () {
        return this.$data.project.getRelated('category')
    }
}

module.exports = ShowProjectPresenter