import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	AuthFieldsInterface,
	ChangePasswordFieldsInterface
} from '@/pages/login/auth-fields.interface'
import { AuthDataInterface } from '@/services/auth/auth.interface'
import AuthService from '@/services/auth/auth.service'


export const login = createAsyncThunk<AuthDataInterface, AuthFieldsInterface>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			return await AuthService.login(email, password)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () =>
	AuthService.logout()
)

export const changePassword = createAsyncThunk<
	AuthDataInterface,
	ChangePasswordFieldsInterface
>(
	'auth/change-password',
	async ({ currentPassword, password, passwordConfirmation }, thunkAPI) => {
		try {
			return await AuthService.changePassword(
				currentPassword,
				password,
				passwordConfirmation
			)
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)