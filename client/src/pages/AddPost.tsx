import React from 'react'

import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/slices/postSlice'
import { useAppDispatch } from '../redux/store'

type DataPost = { title: string, text: string, image: any }

const AddPost: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const [dataPost, setDataPost] = React.useState<DataPost>({ title: '', text: '', image: '' })

   const handleSubmit = () => {
      try {
         const data = new FormData()
         data.append("title", dataPost.title.length === 0 ? 'Default' : dataPost.title)
         data.append("text", dataPost.text.length === 0 ? 'Default text' : dataPost.text)
         data.append("image", dataPost.image)

         dispatch(createPost(data))
         navigate('/')
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <section className="add-post">
         <div className="container">
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className="add-post__form">

               <div className="add-post__input">
                  <div className="add-post__item">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z" /></svg>
                     <label className='add-post__btn btn btn_i'><span>Add Image</span><input onChange={(e: any) => setDataPost({ ...dataPost, image: e.target.files[0] })} type="file" className="input" /></label>
                  </div>
                  <div className="add-post__image">{dataPost.image && <img src={URL.createObjectURL(dataPost.image)} alt={dataPost.image.name} />}</div>
               </div>

               <div className="add-post__input">
                  <div className="add-post__item">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" /></svg>
                     <input value={dataPost.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataPost({ ...dataPost, title: e.target.value })} type="text" placeholder='Title...' className="input" />
                     <span onClick={() => setDataPost({ ...dataPost, title: '' })} className='add-post__clear'>{dataPost.title && <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>}</span>
                  </div>
               </div>

               <div className="add-post__input">
                  <div className="add-post__item add-post__item_t">
                     <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width='24' height='24' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17 17.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm5-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-9-4c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero" /></svg>
                     <textarea value={dataPost.text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDataPost({ ...dataPost, text: e.target.value })} rows={10} placeholder='Text...' className="input" />
                     <span onClick={() => setDataPost({ ...dataPost, text: '' })} className='add-post__clear'>{dataPost.text && <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>}</span>
                  </div>
               </div>

               <div className="add-post__buttons">
                  <button onClick={handleSubmit} className='add-post__btn btn'><span>Confirm</span></button>
               </div>

            </form>
         </div>
      </section>
   )
}

export default AddPost