export interface FAQInterface {
	id: number
	question: string
	answer: string
	editState: boolean
	deleteFunction: (faqId: number) => Promise<void> | void
}
