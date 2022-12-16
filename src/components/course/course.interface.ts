interface IconDataInterface {
	id: number
	attributes: {
		name: string
		url: string
	}
}

export interface CourseInterface {
	icons?: IconDataInterface[] | null
	id: number
	name: string
	description: string
	disabled: boolean
}
