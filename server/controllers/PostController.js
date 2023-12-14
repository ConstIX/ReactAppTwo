import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const create = async (req, res) => {
   try {
      const { title, text } = req.body
      const user = await User.findById(req.userId)

      if (req.files) {
         let fileName = Date.now() + req.files.image.name
         const __dirname = dirname(fileURLToPath(import.meta.url))
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

         const postWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId,
         })
         await postWithImage.save()
         await User.findByIdAndUpdate(req.userId, { $push: { posts: postWithImage } })

         return res.json(postWithImage)
      }

      const postNoImage = new Post({
         username: user.username,
         title,
         text,
         imgUrl: '',
         author: req.userId,
      })
      await postNoImage.save()
      await User.findByIdAndUpdate(req.userId, { $push: { posts: postNoImage } })

      res.json(postNoImage)

   } catch (error) {
      res.status(400).json({ message: 'Can not create article' })
   }
}

export const getAll = async (req, res) => {
   try {
      const posts = await Post.find().sort('-createdAt')
      const popularPosts = await Post.find().limit(5).sort('-views')

      if (!posts) {
         return res.json({ message: 'No posts' })
      }

      res.json({ posts, popularPosts })
   } catch (error) {
      res.status(400).json({ message: 'Can not find articles' })
   }
}

export const getById = async (req, res) => {
   Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { returnDocument: "after" }
   ).then(doc => res.json(doc)).catch(err => res.status(402).json({ message: 'Can not find article' }))
}

export const getMyPosts = async (req, res) => {
   try {
      const user = await User.findById(req.userId)
      const list = await Promise.all(
         user.posts.map(i => {
            return Post.findById(i._id)
         })
      )
      res.json(list)
   } catch (error) {
      res.status(402).json({ message: 'Can not find my articles' })
   }
}

export const remove = async (req, res) => {
   try {
      await Post.findByIdAndDelete(req.params.id)
      await User.findByIdAndUpdate(req.userId, { $pull: { posts: req.params.id } })
   } catch (error) {
      res.status(400).json({ message: 'Can not remove article' })
   }
}

export const update = async (req, res) => {
   try {
      const { title, text, id } = req.body
      const post = await Post.findById(id)

      if (req.files) {
         let fileName = Date.now() + req.files.image.name
         const __dirname = dirname(fileURLToPath(import.meta.url))
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
         post.imgUrl = fileName || ''
      }

      post.title = title
      post.text = text
      await post.save()

      res.json(post)

   } catch (error) {
      res.status(400).json({ message: 'Can not edit article' })
   }
}

export const getComments = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)
      const list = await Promise.all(
         post.comments.map(comment => {
            return Comment.findById(comment)
         })
      )

      res.json(list)
   } catch (error) {
      res.status(400).json({ message: 'Can not get comments' })
   }
}



