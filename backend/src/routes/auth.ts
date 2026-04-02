import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import { generateCsrfToken } from '../middlewares/csrf'
import { authLimiter } from '../middlewares/rateLimiter'

const authRouter = Router()

authRouter.get('/csrf-token', (req, res) => {
    const csrfToken = generateCsrfToken(req, res)
    res.status(200).json({ csrfToken })
})
authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', authLimiter, login)
authRouter.get('/token', refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', authLimiter, register)

export default authRouter
