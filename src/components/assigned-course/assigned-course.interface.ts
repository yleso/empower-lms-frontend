export interface AssignedCourseInterface {
	icons: {
		name: string
		url: string
	}[]
	id: number
	name: string
	description: string
	totalProgress: number

	modules: {
		total: number
		got: number
	}

	lessons: {
		total: number
		got: number
	}

	tests: {
		total: number
		got: number
	}
}
