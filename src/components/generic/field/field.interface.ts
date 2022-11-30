import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react'

export interface FieldInterface {
	name?: string
	type: string
	theme: 'white' | 'grey' | 'darkGrey' | 'black'
	disabled?: boolean
	required?: boolean
	value?: any
	reference?: LegacyRef<any>
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}