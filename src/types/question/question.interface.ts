import { AnswerInterface } from '@/types/answer/answer.interface'
import { BaseInterface } from '@/types/base.interface'

export interface QuestionInterface extends BaseInterface {
	name: string
	type: 'input' | 'radio' | 'checkbox'
	order: number
	answers: AnswerInterface[]
}