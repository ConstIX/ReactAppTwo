import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';

type CommentsType = {
   _id: string,
   username: string,
   comment: string,
}
interface CommentsInterface {
   comments: CommentsType[],
   status: string,
}

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }: { postId: string | undefined, comment: string }) => {
   try {
      const { data } = await axios.post(`/comments/${postId}`, { postId, comment })
      return data
   } catch (error) {
      console.log(error)
   }
})

export const getAllComments = createAsyncThunk('comment/getAllComments', async (postId: string | undefined) => {
   try {
      const { data } = await axios.get(`/posts/comments/${postId}`)
      return data
   } catch (error) {
      console.log(error)
   }
})

const initialState: CommentsInterface = {
   comments: [],
   status: 'loading'
}

const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder

         // CreateComment
         .addCase(createComment.pending, (state) => {
            state.status = 'loading'
            state.comments = []
         })
         .addCase(createComment.fulfilled, (state, action: PayloadAction<CommentsType>) => {
            state.status = 'success'
            state.comments.push(action.payload)
         })
         .addCase(createComment.rejected, (state) => {
            state.status = 'error'
            state.comments = []
         })

         // GetAllComments
         .addCase(getAllComments.pending, (state) => {
            state.status = 'loading'
            state.comments = []
         })
         .addCase(getAllComments.fulfilled, (state, action: PayloadAction<CommentsType[]>) => {
            state.status = 'success'
            state.comments = action.payload
         })
         .addCase(getAllComments.rejected, (state) => {
            state.status = 'error'
            state.comments = []
         })
   }
})

export default commentSlice.reducer;