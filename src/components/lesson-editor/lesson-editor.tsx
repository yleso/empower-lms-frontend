import { FC, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, {
	formats,
	modules
} from '@/components/lesson-editor/editor-toolbar'
import LessonEditorInterface from '@/components/lesson-editor/lesson-editor.interface'
import { ThemeContext } from '@/context/theme.context'
import './lesson-editor-content.scss'
import './lesson-editor.scss'


const LessonEditor: FC<LessonEditorInterface> = ({ content, setContent }) => {
	const { darkmode } = useContext(ThemeContext)

	const handleChangeContent = (newContent: string) => {
		setContent(newContent)
	}

	return (
		<div className={`LessonEditor ${darkmode && 'LessonEditorDark'}`}>
			<EditorToolbar toolbarId={'EditorToolbar'} />
			<ReactQuill
				onChange={handleChangeContent}
				placeholder={'Start writing new lesson...'}
				value={content}
				modules={modules('EditorToolbar')}
				formats={formats}
				className={`LessonTextEditor`}
				id={`LessonTextEditor`}
			/>
		</div>
	)
}

export default LessonEditor