import { Router } from 'express'
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers'
import { roleGuardMiddleware } from '../middlewares/auth'
import { customerRouteLimiter } from '../middlewares/rateLimiter'
import { Role } from '../models/user'

const customerRouter = Router()

customerRouter.use(roleGuardMiddleware(Role.Admin), customerRouteLimiter)

customerRouter.get('/', getCustomers)
customerRouter.get('/:id', getCustomerById)
customerRouter.patch('/:id', updateCustomer)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
