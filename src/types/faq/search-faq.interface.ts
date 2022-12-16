export interface SearchFaqInterface {
	id: string
	question: string
	answer: string
	team: {
		id: number
		name: string
	}
}