import { Router } from 'express'
import { create, getAll, getById, getMyPosts, remove, update, getComments } from '../controllers/PostController.js'

import { checkAuth } from '../utils/checkAuth.js'
import { validatorErrors } from '../utils/validatorErrors.js'
import { postCreateValidator } from '../validations/post.js'

const router = new Router()

router.post('/', checkAuth, postCreateValidator, validatorErrors, create)

router.get('/', getAll)
router.get('/:id', getById)
router.get('/user/my', checkAuth, getMyPosts)

router.delete('/:id', checkAuth, remove)
router.put('/:id', checkAuth, postCreateValidator, validatorErrors, update)

router.get('/comments/:id', getComments)

export default router