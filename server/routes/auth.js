import { Router } from 'express'
import { register, login, getMe } from '../controllers/UserController.js'

import { checkAuth } from '../utils/checkAuth.js'
import { validatorErrors } from '../utils/validatorErrors.js'
import { loginValidator, registerValidator } from '../validations/auth.js'

const router = new Router()

router.post('/register', registerValidator, validatorErrors, register)
router.post('/login', loginValidator, validatorErrors, login)
router.get('/me', checkAuth, getMe)

export default router