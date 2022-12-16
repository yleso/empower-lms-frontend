export interface WordInterface {
	id: number
	name: string
	definition: string
	editState: boolean
	deleteFunction: (wordId: number) => Promise<void> | void
}
