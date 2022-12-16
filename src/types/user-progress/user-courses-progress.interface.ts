import { CourseInterface } from '@/types/course/course.interface'
import { LessonInterface } from '@/types/lesson/lesson.interface'
import { ModuleInterface } from '@/types/module/module.interface'
import { QuestionInterface } from '@/types/question/question.interface'
import { TestInterface } from '@/types/test/test.interface'


export interface UserCoursesProgressInterface {
	id: number
	attributes: {
		createdAt: Date
		updatedAt: Date
		course: {
			data: CourseInterface
		}
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