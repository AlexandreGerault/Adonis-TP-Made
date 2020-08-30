'use strict'

class ProjectPolicy {
    index(user, project) {
        return true
    }

    show(user, project) {
        return project.is_published || project.author_id === user.id
    }

    create(user, project) {
        return true
    }

    update(user, project) {
        return project.author_id === user.id
    }

    destroy(user, project) {
        return project.author_id === user.id
    }
}

module.exports = ProjectPolicy