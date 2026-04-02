import DOMPurify from 'dompurify'

const sanitizeCommentHtml = (html: string) =>
    DOMPurify.sanitize(html || '', {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
    })

export default sanitizeCommentHtml
