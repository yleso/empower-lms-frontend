import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react'

export interface RadioInterface {
	name: string
	text: string
	value: string
	reference?: LegacyRef<any>
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}