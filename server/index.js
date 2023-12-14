import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import commentRoute from './routes/comments.js'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(fileUpload())
app.use(express.static('uploads'))

// =====================================================================

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

// =====================================================================

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

async function start() {
   try {
      await mongoose
         .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.iuii8b1.mongodb.net/${DB_NAME}`)
         .then(() => console.log('DB OK'))
         .catch((error) => console.log('DB error:', error))

      app.listen(PORT, () => {
         console.log('Server OK')
      })
   } catch (error) {
      console.log(error)
   }
}
start()