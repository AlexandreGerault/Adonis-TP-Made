'use strict'

class Projects {
    constructor (Project, ProjectCategory, Helpers) {
        this.Project = Project
        this.ProjectCategory = ProjectCategory
        this.Helpers = Helpers
    }

    async createFromRequest({request, auth }) {
        const category = await this.ProjectCategory.findOrFail(parseInt(request.post().projectType))
        const user = await auth.getUser()
        const data = request.except(['_csrf'])
        const image = request.file('imageFile', {
            size: '2mb'
        })
        const project = new this.Project()

        if (image) {
            await image.move(this.Helpers.publicPath('uploads/projects/'), {
                name: data.projectName + '.' + image.extname,
                overwrite: true
            })
    
            if (!image.moved) {
                return image.error()
            }

            project.picture_url = image.fileName
        }
        
        project.name = data.projectName
        project.description = data.description
        project.rules = data.rules
        project.design_link = data.designUrl
        await project.save()
        project.author().associate(user)
        project.category().associate(category)

        return project
    }

    async updateFromRequest({ request, project }) {
        const data = request.except(['_csrf', '_method'])
        const category = await this.ProjectCategory.findOrFail(parseInt(data.projectType))

        project.merge({
            name: data.projectName,
            design_link: data.designUrl,
            description: data.description,
            rules: data.rules
        })
        await project.save()
        project.category().associate(category)

        return project
    }
}

module.exports = Projects