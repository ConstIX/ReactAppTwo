import Post from '../models/Post.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'

export const createComment = async (req, res) => {
   try {
      const { postId, comment } = req.body
      const user = await User.findById(req.userId)

      const newComment = new Comment({
         comment,
         username: user.username,
         author: req.userId
      })
      await newComment.save()
      await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } })

      res.json(newComment)

   } catch (error) {
      res.status(400).json({ message: 'Can create comment' })
   }
}

