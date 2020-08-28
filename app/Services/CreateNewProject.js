'use strict'

const Project = use('App/Models/Project')
const ProjectCategory = use('App/Models/ProjectCategory')
const Helpers = use('Helpers')

class CreateNewProject {
    static async createFromRequest({request, auth}) {
        const category = await ProjectCategory.findOrFail(parseInt(request.post().projectType))
        const user = await auth.getUser()
        const data = request.except(['_csrf'])
        const image = request.file('imageFile', {
            size: '2mb'
        })

        await image.move(Helpers.publicPath('uploads/projects/'), {
            name: data.projectName + '.' + image.extname,
            overwrite: true
        })

        if (!image.moved) {
            return image.error()
        }

        const project = new Project()
        project.name = data.projectName
        project.description = data.description
        project.rules = data.rules
        project.design_link = data.designUrl
        project.picture_url = image.fileName
        await project.save()
        project.author().associate(user)
        project.category().associate(category)

        return project
    }
}

module.exports = CreateNewProject