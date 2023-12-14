import { validationResult } from 'express-validator'

export const validatorErrors = (req, res, next) => {
   const erorrs = validationResult(req)
   if (!erorrs.isEmpty()) {
      return res.status(400).json(erorrs.array())
   }
   next()
}