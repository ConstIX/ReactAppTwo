import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';

type PostType = {
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

interface PostsInterface {
   posts: PostType[] | any[],
   popularPosts: PostType[],
   status: string,
}

export const createPost = createAsyncThunk('post/createPost', async (params: any) => {
   try {
      const { data } = await axios.post('/posts', params)
      return data
   } catch (error) {
      console.log(error)
   }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
   try {
      const { data } = await axios.get('/posts')
      return data
   } catch (error) {
      console.log(error)
   }
})

export const removePost = createAsyncThunk('post/removePost', async (id: any) => {
   try {
      const { data } = await axios.delete(`/posts/${id}`, id)
      return data
   } catch (error) {
      console.log(error)
   }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost: any) => {
   try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
      return data
   } catch (error) {
      console.log(error)
   }
})

const initialState: PostsInterface = {
   posts: [],
   popularPosts: [],
   status: 'loading'
}

const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder

         // Create
         .addCase(createPost.pending, (state) => {
            state.status = 'loading'
            state.posts = []
            state.popularPosts = []
         })
         .addCase(createPost.fulfilled, (state, action: PayloadAction<PostType>) => {
            state.status = 'success'
            state.posts.push(action.payload)
         })
         .addCase(createPost.rejected, (state) => {
            state.status = 'error'
            state.posts = []
            state.popularPosts = []
         })

         // GetAll
         .addCase(getAllPosts.pending, (state) => {
            state.status = 'loading'
            state.posts = []
            state.popularPosts = []
         })
         .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<PostsInterface>) => {
            state.status = 'success'
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
         })
         .addCase(getAllPosts.rejected, (state) => {
            state.status = 'error'
            state.posts = []
            state.popularPosts = []
         })

         //Remove
         .addCase(removePost.pending, (state, action) => {
            state.posts = state.posts.filter((obj) => obj._id !== action.meta.arg)
         })

         // Update
         .addCase(updatePost.pending, (state, action) => {
            const index = state.posts.findIndex(post => post._id === action.meta.arg)
            state.posts[index] = action.payload
         })
   }
})

export default postSlice.reducer;