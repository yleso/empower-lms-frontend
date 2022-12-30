import { AuthDataInterface } from '@/services/auth/auth.interface'

export interface AuthInitStateInterface extends AuthDataInterface {
	isLoading: boolean
}