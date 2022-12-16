export interface SearchUserInterface {
	id: string //user-${NUMBER}
	email: string
	name: string
	surname: string
	avatar: {
		formats: {
			thumbnail: {
				url: string
			}
		}
	} | null
}