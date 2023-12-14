import React from 'react'
import axios from '../redux/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CommentItem from '../components/CommentItem'

import { useAppDispatch, useAppSelector } from '../redux/store'
import { removePost } from '../redux/slices/postSlice'
import { createComment, getAllComments } from '../redux/slices/commentSlice'


const SinglePost: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { id } = useParams()

   const { user } = useAppSelector(state => state.authReducer)
   const { comments } = useAppSelector(state => state.commentReducer)

   const [post, setPost] = React.useState<any>([])
   const [comment, setComment] = React.useState<string>('')

   const handleRemove = () => {
      try {
         dispatch(removePost(id))
         navigate('/')
      } catch (error) {
         console.log(error)
      }
   }

   const handleSubmit = () => {
      try {
         const postId = id
         if (comment.length > 0) dispatch(createComment({ postId, comment }))
         setComment('')
      } catch (error) {
         console.log(error)
      }
   }

   const fetchComments = async () => {
      try {
         const postId = id
         dispatch(getAllComments(postId))
      } catch (error) {
         console.log(error)
      }
   }

   React.useEffect(() => {
      fetchComments()
   }, [])

   React.useEffect(() => {
      axios.get(`/posts/${id}`)
         .then(res => setPost(res.data))
         .catch(err => console.log(err))
   }, [])

   if (post.length === 0) {
      return (
         <section className="home">
            <p className='home__status'>Loading...</p>
         </section>
      )
   }

   return (
      <section className='single'>
         <div className="container">

            <div className="single__body">

               <div className='single__post post'>
                  <div className="post__item">

                     <div className="post__image">{post.imgUrl && <img src={`http://localhost:3005/${post.imgUrl}`} alt="..." />}</div>

                     <div className="post__user-date">
                        <p>
                           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" /></svg>
                           <span>{post.username}</span>
                        </p>
                        <p>{post.createdAt?.slice(0, 10) || 0}</p>
                     </div>

                     <div className="post__content">
                        <h3 className='post__title'>{post.title}</h3>
                        <p className='post__text'>{post.text}</p>
                     </div>

                     <div className="post__follows">
                        <p>
                           <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width='22' height='22' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fillRule="nonzero" /></svg>
                           <span>{post.views}</span>
                        </p>
                        <p>
                           <svg width="18" height="18" viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" /></svg>
                           <span>{post.comments?.length || 0}</span>
                        </p>
                     </div>

                     <div className="post__buttons">
                        <Link to='/' className='post__btn btn btn_i'><span>Back</span></Link>
                        {
                           user._id === post.author &&
                           <div className="post__edit">
                              <Link to={`/${id}/edit`}><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width='24' height='24' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-12.023-7.083c-1.334 3.916-1.48 4.232-1.48 4.587 0 .527.46.749.749.749.352 0 .668-.137 4.574-1.493zm1.06-1.061 3.846 3.846 8.824-8.814c.195-.195.293-.451.293-.707 0-.255-.098-.511-.293-.706-.692-.691-1.742-1.741-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fillRule="nonzero" /></svg></Link>
                              <button onClick={handleRemove}><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width='24' height='24' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fillRule="nonzero" /></svg></button>
                           </div>
                        }
                     </div>

                  </div>
               </div>

               <div className="single__comments comments">
                  <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className='comments__form'>
                     <div className="comments__input"><input type="text" className='input' value={comment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} placeholder='Message...' /></div>
                     <button onClick={handleSubmit} type='submit' className='comments__btn btn btn_c'><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg></span></button>
                  </form>
                  <div className="comments__body">
                     {comments.length > 0 && comments.map((obj) => <CommentItem key={obj._id} {...obj} />)}
                  </div>
               </div>

            </div>

         </div>
      </section>
   )
}

export default SinglePost