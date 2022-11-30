import { FieldError } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface FieldPropsInterface {
	error?: FieldError
}

type InputPropsFieldType = InputHTMLAttributes<HTMLInputElement> & FieldPropsInterface

export default interface FieldInterface extends InputPropsFieldType {
}