import { axiosClassic } from '@/store/api/axios'
import { AuthDataInterface } from './auth.interface'

class AuthService {
	static async login(identifier: string, password: string) {
		const response = await axiosClassic.post<AuthDataInterface>(
			'/auth/local/',
			{
				identifier,
				password
			}
		)

		return response.data
	}

	static async register(
		username: string,
		name: string,
		surname: string,
		email: string,
		phone: string,
		starting_date: Date,
		job_title: string,
		line_manager: string,
		team: number,
		password: string
	) {
		const response = await axiosClassic.post('auth/local/register', {
			username,
			name,
			surname,
			email,
			phone,
			starting_date,
			job_title,
			team,
			password
		})

		return response.data
	}

	static async logout() {}

	static async changePassword(
		currentPassword: string,
		password: string,
		passwordConfirmation: string
	) {
		const response = await axiosClassic.post<AuthDataInterface>(
			'/auth/change-password/',
			{
				currentPassword,
				password,
				passwordConfirmation
			}
		)

		return response.data
	}
}

export default AuthService