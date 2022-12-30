import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import api from './api/api'
import { rtkQueryErrorLogger } from './middlewares/error.middleware'
import { rootReducer } from './root.reducer'


const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'theme']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
			.concat(rtkQueryErrorLogger)
			.concat(api.middleware)
})

export const persistor = persistStore(store)

export type RootStateType = ReturnType<typeof rootReducer>

export default store