import { Router } from 'express'
import { createComment } from '../controllers/CommentController.js'

import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

router.post('/:id', checkAuth, createComment)

export default router