import React from 'react'

import PostItem from '../components/PostItem'
import PostPopular from '../components/PostPopular'

import { getAllPosts } from '../redux/slices/postSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

const Home: React.FC = () => {

   const dispatch = useAppDispatch()
   const { posts, popularPosts, status } = useAppSelector(state => state.postReducer)

   React.useEffect(() => {
      dispatch(getAllPosts())
   }, [])

   if (!posts.length) {
      return (
         <section className="home">
            <p className='home__status'>{status === 'loading' ? 'Loading...' : 'No Posts!'}</p>
         </section>
      )
   }

   return (
      <section className="home">
         <div className="container">

            <div className="home__body home__body_h">
               <div className="home__column">
                  {posts.map((obj) => <PostItem key={obj._id} {...obj} />)}
               </div>

               <div className="home__column">
                  <h3 className="home__title">Popular Posts:</h3>
                  {popularPosts.map((obj) => <PostPopular key={obj._id} {...obj} />)}
               </div>
            </div>

         </div>
      </section>
   )
}

export default Home