export default interface ButtonInterface {
	clickFunction?: () => void
	submit?: boolean
	text: string
	stroke?: boolean
	fill?: boolean
	large?: boolean
	small?: boolean
	disabled?: boolean
}
