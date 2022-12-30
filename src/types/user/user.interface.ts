import { UserRoleInterface } from '@/types/role/role.interface'
import { TeamInterface } from '@/types/team/team.interface'

export interface UserInterface {
	id: number
	name: string
	surname: string
	email: string
	line_manager: UserInterface | null
	phone: string | null
	starting_date: string
	job_title: string
	avatar_path: string
	team: TeamInterface
	role?: UserRoleInterface
}