const marked = require('marked')
const sanitize = require('sanitize-html')

class MarkdownService {
    constructor () {
        this.marked = marked
        this.sanitize = sanitize
    }

    toHtml (markdownString) {
        return this.sanitize(this.marked(markdownString))
    }

    noHeading(inputString) {
        return this.sanitize(inputString, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]
        })
    }
}

module.exports = MarkdownService