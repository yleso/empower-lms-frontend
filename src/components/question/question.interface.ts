export interface AnswerInterface {
	id: number
	name: string
	right: boolean
}

export interface QuestionInterface {
	id: number
	totalQuestions: number
	order: number
	type: 'input' | 'radio' | 'checkbox'
	name: string
	answers: AnswerInterface[]
}

export interface QuestionEditInterface {
	changeOrderFunction: (questionId: number, increase: boolean) => Promise<void>
	question: QuestionInterface
	editing: boolean
}
