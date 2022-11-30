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

interface UserRoleInterface {
	id: number
	name: string
	description: string
	type: string
}

export interface UserInterface {
	id: number
	name: string
	surname: string
	email: string
	line_manager: string
	phone: string | null
	starting_date: Date
	job_title: string
	avatar: UserAvatarInterface | null
	team: UserTeamInterface
	role?: UserRoleInterface
}
