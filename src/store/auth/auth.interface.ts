import { AuthDataInterface } from '@/services/auth/auth.interface'

export default interface AuthInitStateInterface extends AuthDataInterface {
	isLoading: boolean
}