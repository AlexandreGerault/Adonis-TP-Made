'use strict'

class ProjectPolicy {
    index(user) {
        return true
    }

    show(user, project) {
        return project.is_published || project.author_id === user.id
    }

    create(user) {
        return true
    }

    update(user, project) {
        return project.author_id === user.id
    }

    create(edit) {
        
    }

    destroy(user, project) {
        return project.author_id === user.id
    }
}

module.exports = ProjectPolicy