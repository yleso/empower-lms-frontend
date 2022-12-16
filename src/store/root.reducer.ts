import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import api from './api/api'
import searchApi from '@/store/api/search-api'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	[searchApi.reducerPath]: searchApi.reducer,
	auth: authSlice.reducer
})