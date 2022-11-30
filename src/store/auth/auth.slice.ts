import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from './auth.actions'
import AuthInitStateInterface from './auth.interface'

const initialState: AuthInitStateInterface = {
	user: null,
	jwt: '',
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
				state.jwt = payload.jwt
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
				state.jwt = ''
			})
			//Logout
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
				state.jwt = ''
			})
	}
})