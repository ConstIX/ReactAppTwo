import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

export const register = async (req, res) => {
   try {

      const { username, password, email } = req.body

      const isEmail = await User.findOne({ email })
      if (isEmail) {
         return res.json({ message: 'This email already registered!' })
      }

      const isUsed = await User.findOne({ username })
      if (isUsed) {
         return res.json({ message: 'This user already exists, change your name!' })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const newUser = new User({
         email,
         username,
         password: hash,
      })
      const user = await newUser.save()

      const token = jwt.sign(
         { id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }
      )

      res.json({ user, token })

   } catch (error) {
      res.status(400).json({ message: 'Can not register' })
   }
}

export const login = async (req, res) => {
   try {

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
         return res.json({ message: 'Not correct login or password' })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
         return res.json({ message: 'Not correct login or password' })
      }

      const token = jwt.sign(
         { id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }
      )

      res.json({ user, token })

   } catch (error) {
      res.status(400).json({ message: 'Can not login' })
   }
}

export const getMe = async (req, res) => {
   try {

      const user = await User.findById(req.userId)
      if (!user) {
         return res.status(401).json({ message: 'Can not get user' })
      }

      const token = jwt.sign(
         { id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }
      )

      res.json({ user, token })

   } catch (error) {
      res.status(400).json({ message: 'Can not get user' })
   }
}