export interface CreateQuestionDto {
	name?: string
	test: number
	type: 'input' | 'radio' | 'checkbox'
}
