interface AuthUserInterface {
	id: number
	name: string
	surname: string
	email: string
	line_manager: string
	phone: string | null
	starting_date: Date
	job_title: string
}

export interface AuthDataInterface {
	user: AuthUserInterface | null
	jwt: string
}
