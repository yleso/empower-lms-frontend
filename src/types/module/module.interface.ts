import { LessonInterface } from '@/types/lesson/lesson.interface'
import { TestInterface } from '@/types/test/test.interface'

export default interface ModuleInterface {
	id: number
	attributes: {
		name: string
		lessons: {
			data: LessonInterface[]
		}
		tests: {
			data: TestInterface[]
		}
	}
}