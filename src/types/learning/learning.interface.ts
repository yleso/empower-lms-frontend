import { BaseInterface } from '@/types/base.interface'
import { FullCourseInterface } from '@/types/course/course.interface'
import { LessonInterface } from '@/types/lesson/lesson.interface'
import { ModuleInterface } from '@/types/module/module.interface'
import { QuestionInterface } from '@/types/question/question.interface'
import { TestInterface } from '@/types/test/test.interface'


export interface LearningInterface extends BaseInterface {
	course: FullCourseInterface
	passed_modules: ModuleInterface[]
	passed_lessons: LessonInterface[]
	passed_tests: TestInterface[]
	passed_questions: QuestionInterface[]
}