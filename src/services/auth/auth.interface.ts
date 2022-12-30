interface AuthUserInterface {
	id: number
	name: string
	surname: string
	access_level: number
	avatar_path: string
	team_id: number
}

export interface AuthDataInterface {
	user: AuthUserInterface | null
	access_token: string
}
