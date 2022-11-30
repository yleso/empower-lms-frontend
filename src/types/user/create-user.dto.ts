export interface CreateUserDto {
	email: string
	username: string

	name: string
	surname: string
	starting_date: Date

	job_title: string
	line_manager: string
	team: number

	phone?: string
	role?: number

	password: string
}
