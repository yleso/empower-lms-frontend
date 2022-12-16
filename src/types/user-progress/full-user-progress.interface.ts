import { LessonInterface } from '@/types/lesson/lesson.interface'
import { ModuleInterface } from '@/types/module/module.interface'
import { QuestionInterface } from '@/types/question/question.interface'
import { TestInterface } from '@/types/test/test.interface'

export interface FullUserProgressInterface {
	id: number
	attributes: {
		createdAt: Date
		updatedAt: Date
		modules: {
			data: ModuleInterface[]
		}
		lessons: {
			data: LessonInterface[]
		}
		tests: {
			data: TestInterface[]
		}
		questions: {
			data: QuestionInterface[]
		}
	}
}