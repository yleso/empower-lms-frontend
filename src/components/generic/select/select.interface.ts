import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react'

export interface OptionInterface {
	value: any
	text: any
}

export interface SelectInterface {
	theme: 'white' | 'grey' | 'darkGrey' | 'black'
	options: Array<OptionInterface>
	value?: any
	reference?: LegacyRef<any>
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}