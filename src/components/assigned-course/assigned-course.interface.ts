import { ReactNode } from 'react'

export default interface AssignedCourseInterface {
	icons: Array<ReactNode>
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
