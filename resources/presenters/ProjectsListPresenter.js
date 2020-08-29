const BasePresenter = use('edge.js').BasePresenter
const Markdown = use('Markdown')

class ProjectsListPresenter extends BasePresenter {
    get projects () {
        this.$data.projects.rows.map((project) => {
            project.description = Markdown.toHtml(project.description.slice(0, 100) + "...")

            return project
        })

        return this.$data.projects
    }
}

module.exports = ProjectsListPresenter