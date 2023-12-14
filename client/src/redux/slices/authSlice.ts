import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';

type UserType = {
   createdAt: string,
   email: string,
   password: string,
   posts: string[],
   updatedAt: string,
   username: string,
   _id: string,
}

interface AuthInterface {
   user: UserType[],
   token: string,
   message: string,
   status: string
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: Record<string, string>) => {
   try {
      const { data } = await axios.post('/auth/register', params)
      if (data.token) {
         window.localStorage.setItem('token', data.token)
      }
      return data
   } catch (error) {
      console.log(error)
   }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: Record<string, string>) => {
   try {
      const { data } = await axios.post('/auth/login', params)
      if (data.token) {
         window.localStorage.setItem('token', data.token)
      }
      return data
   } catch (error) {
      console.log(error)
   }
})

export const fetchGetMe = createAsyncThunk('auth/fetchGetMe', async () => {
   try {
      const { data } = await axios.get('/auth/me')
      return data
   } catch (error) {
      console.log(error)
   }
})

const initialState: AuthInterface = {
   user: [],
   token: '',
   message: '',
   status: 'loading'
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.user = []
         state.token = ''
      }
   },
   extraReducers: (builder) => {
      builder

         // Register
         .addCase(fetchRegister.pending, (state) => {
            state.status = 'loading'
            state.user = []
            state.token = ''
            state.message = ''
         })
         .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthInterface>) => {
            state.status = 'success'
            state.user = action.payload.user
            state.token = action.payload.token
            state.message = action.payload.message
         })
         .addCase(fetchRegister.rejected, (state) => {
            state.status = 'error'
            state.user = []
            state.token = ''
            state.message = ''
         })

         // Login
         .addCase(fetchLogin.pending, (state) => {
            state.status = 'loading'
            state.user = []
            state.token = ''
            state.message = ''
         })
         .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthInterface>) => {
            state.status = 'success'
            state.user = action.payload.user
            state.token = action.payload.token
            state.message = action.payload.message
         })
         .addCase(fetchLogin.rejected, (state) => {
            state.status = 'error'
            state.user = []
            state.token = ''
            state.message = ''
         })

         // getMe
         .addCase(fetchGetMe.pending, (state) => {
            state.status = 'loading'
            state.user = []
            state.token = ''
         })
         .addCase(fetchGetMe.fulfilled, (state, action: PayloadAction<AuthInterface>) => {
            state.status = 'success'
            state.user = action.payload?.user
            state.token = action.payload?.token
         })
         .addCase(fetchGetMe.rejected, (state) => {
            state.status = 'error'
            state.user = []
            state.token = ''
         })
   }
})

export const { logout } = authSlice.actions
export default authSlice.reducer;