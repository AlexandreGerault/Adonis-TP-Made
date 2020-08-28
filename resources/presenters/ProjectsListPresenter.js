const BasePresenter = use('edge.js').BasePresenter
const Markdown = use('Markdown')
const Logger = use('Logger')

class ProjectsListPresenter extends BasePresenter {
    get projects () {
        Logger.info("[ProjectsListPresenter.projects().rows] ", this.$data.projects.prototype)
        this.$data.projects.rows.map((project) => {
            project.description = Markdown.toHtml(project.description.slice(0, 100) + "...")

            return project
        })

        return this.$data.projects
    }
}

module.exports = ProjectsListPresenter