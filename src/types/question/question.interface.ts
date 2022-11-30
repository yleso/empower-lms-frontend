import { AnswerInterface } from '@/types/answer/answer.interface'

export interface QuestionInterface {
	id: number
	attributes: {
		name: string
		type: 'input' | 'radio' | 'checkbox'
		order: number
		answers: {
			data: AnswerInterface[]
		}
	}
}