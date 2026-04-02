import { doubleCsrf } from 'csrf-csrf'
import { Request } from 'express'

export const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'csrf-secret-dev',
    getSessionIdentifier: (req: Request) =>
        `${req.ip}-${req.headers['user-agent'] || 'unknown'}`,
    cookieName: 'csrf-token',
    cookieOptions: {
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
    },
    getCsrfTokenFromRequest: (req: Request) =>
        req.headers['x-csrf-token'] as string,
})