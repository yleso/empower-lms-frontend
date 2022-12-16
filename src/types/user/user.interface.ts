import { UserRoleInterface } from '@/types/role/role.interface'

interface UserAvatarInterface {
	id: number
	name: string
	formats: {
		thumbnail: {
			ext: string
			url: string
		}
	}
}

export interface UserTeamInterface {
	id: number
	name: string
}

export interface UserInterface {
	id: number
	name: string
	surname: string
	email: string
	line_manager: string
	phone: string | null
	starting_date: string
	job_title: string
	avatar: UserAvatarInterface | null
	team: UserTeamInterface
	role?: UserRoleInterface
}