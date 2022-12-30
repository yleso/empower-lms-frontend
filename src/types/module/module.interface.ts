import { BaseInterface } from '@/types/base.interface'
import { LessonInterface } from '@/types/lesson/lesson.interface'
import { TestInterface } from '@/types/test/test.interface'

export interface ModuleInterface extends BaseInterface {
	name: string
	lessons: LessonInterface[]
	tests: TestInterface[]
}