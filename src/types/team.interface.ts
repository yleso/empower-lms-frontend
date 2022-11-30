import CourseInterface from './course/course.interface'
import FaqInterface from './faq/faq.interface'
import WordInterface from './word/word.interface'

export interface TeamInterface {
	id: number
	attributes: {
		name: string
		courses: {
			data: Array<CourseInterface>
		}
		words: {
			data: Array<WordInterface>
		}
		faqs: {
			data: Array<FaqInterface>
		}
	}
}