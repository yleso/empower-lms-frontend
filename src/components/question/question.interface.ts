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

interface UserProgress {
	id: number
	questions: number[]
	tests: number[]
}

export interface QuestionEditInterface {
	testId: number
	userProgress: UserProgress
	questionTestId: number
	question: QuestionInterface
	editing: boolean
	changeOrderFunction: (questionId: number, increase: boolean) => Promise<void>
	deleteFunction: (questionId: number) => Promise<void>
}
