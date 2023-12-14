import React from 'react'
import { Link } from 'react-router-dom'

const PostPopular: React.FC<{ title: string, _id: string }> = ({ title, _id }) => {
   return (
      <Link to={`/${_id}`} className='home__popular popular'>
         <button className="popular__btn btn btn_p"><span>{title}</span></button>
      </Link>
   )
}

export default PostPopular