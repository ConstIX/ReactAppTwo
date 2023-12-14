import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Home from './pages/Home'
import Login from './pages/Login'
import MyPosts from './pages/MyPosts'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

import { fetchGetMe } from './redux/slices/authSlice'
import { useAppDispatch } from './redux/store'

import './scss/style.scss'

function App() {

   const dispatch = useAppDispatch()
   React.useEffect(() => {
      dispatch(fetchGetMe())
   }, [])

   return (
      <div className="wrapper">

         <Header />

         <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<MyPosts />} />
            <Route path='/:id' element={<SinglePost />} />
            <Route path='/:id/edit' element={<EditPost />} />
            <Route path='/add-post' element={<AddPost />} />
         </Routes>

      </div>
   )
}

export default App
