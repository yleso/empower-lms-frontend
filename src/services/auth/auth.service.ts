import { axiosClassic } from '@/store/api/axios'
import { AuthDataInterface } from './auth.interface'


class AuthService {
	public static async login(email: string, password: string) {
		const response = await axiosClassic.post<AuthDataInterface>(
			'/auth/local/login',
			{
				email,
				password
			}
		)

		return response.data
	}

	public static async logout() {
		window.location.reload()
	}

	public static async changePassword(
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