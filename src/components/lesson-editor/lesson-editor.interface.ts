import { Dispatch, SetStateAction } from 'react'

export default interface LessonEditorInterface {
	content: string
	setContent: Dispatch<SetStateAction<string>>
}