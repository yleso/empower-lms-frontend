import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import api from './api/api'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer
})