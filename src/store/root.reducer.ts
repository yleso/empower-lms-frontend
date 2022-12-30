import { combineReducers } from '@reduxjs/toolkit'
import { themeSlice } from '@/store/theme/theme.slice'
import api from './api/api'
import { authSlice } from './auth/auth.slice'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	theme: themeSlice.reducer
})