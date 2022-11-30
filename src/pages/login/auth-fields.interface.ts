export interface AuthFieldsInterface {
	identifier: string
	password: string
}

export interface ChangePasswordFieldsInterface {
	currentPassword: string
	password: string
	passwordConfirmation: string
}
