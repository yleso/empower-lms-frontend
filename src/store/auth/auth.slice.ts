import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from './auth.actions'
import { AuthInitStateInterface } from './auth.interface'

const initialState: AuthInitStateInterface = {
	user: null,
	access_token: '',
	isLoading: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			//Login
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.access_token = payload.access_token
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.access_token = ''
			})
			//Logout
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.access_token = ''
			})
	}
})