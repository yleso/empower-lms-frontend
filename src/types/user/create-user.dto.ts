export interface CreateUserDto {
	name: string
	surname: string
	email: string
	starting_date: Date

	job_title: string
	line_manager: number
	team: number

	phone_number?: string
	role?: number
}
