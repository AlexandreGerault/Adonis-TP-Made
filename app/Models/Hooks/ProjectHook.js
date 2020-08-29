'use strict'

const ProjectHook = exports = module.exports = {}

ProjectHook.updateGlobalCategorieInView = async (project) => {
    const View = use('View')
    const ProjectCategory = use('ProjectCategory')

    View.global('gCat', () => ProjectCategory.all())
}
