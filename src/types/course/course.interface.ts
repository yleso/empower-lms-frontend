interface IconsDataInterface {
	id: number
	attributes: {
		name: string
		url: string
	}
}

export default interface CourseInterface {
	id: number
	attributes: {
		name: string
		description: string
		icons: {
			data: Array<IconsDataInterface> | null
		}
	}
}
