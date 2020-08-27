const marked = require('marked')
const sanitize = require('sanitize-html')

class MarkdownService {
    constructor () {
        this.marked = marked
        this.sanitize = sanitize
    }

    toHtml (markdownString) {
        return this.marked(this.sanitize(markdownString))
    }
}

module.exports = MarkdownService