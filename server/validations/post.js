import { body } from 'express-validator'

export const postCreateValidator = [
   body('title').isLength({ min: 5 }).isString(),
   body('text').isLength({ min: 5 }).isString(),
   body('imgUrl').optional().isString(),
]
