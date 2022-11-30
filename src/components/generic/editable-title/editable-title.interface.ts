import { RefObject } from 'react'

export default interface EditableTitleInterface {
	text?: string
	editState: boolean
	reference: RefObject<HTMLHeadingElement>
}