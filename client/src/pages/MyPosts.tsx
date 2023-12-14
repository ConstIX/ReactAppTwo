import React from 'react'
import axios from '../redux/axios'
import PostItem from '../components/PostItem'

type MyPostType = {
   author: string,
   comments: string[],
   createdAt: string,
   imgUrl: string,
   text: string,
   title: string,
   username: string,
   views: number,
   _id: string,
}

const MyPosts: React.FC = () => {

   const [posts, setPosts] = React.useState<MyPostType[]>([])

   React.useEffect(() => {
      axios.get(`/posts/user/my`)
         .then(res => setPosts(res.data))
         .catch(err => console.log(err))
   }, [])

   if (!posts.length) {
      return (
         <section className="home">
            <p className='home__status'>No Posts!</p>
         </section>
      )
   }

   return (
      <section className='home'>
         <div className="container">

            <div className="home__body home__body_m">
               {posts.map((obj) => <PostItem key={obj._id} {...obj} />)}
            </div>

         </div>
      </section>
   )
}

export default MyPosts