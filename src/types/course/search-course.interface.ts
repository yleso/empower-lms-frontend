export interface SearchCourseInterface {
	id: number
	name: string
	description: string
	team: {
		id: number
		name: string
	}
}