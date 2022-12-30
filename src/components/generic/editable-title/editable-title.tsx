import { FC } from 'react'
import Styles from '@/components/generic/title/title.module.scss'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import EditableTitleInterface from './editable-title.interface'


const EditableTitle: FC<EditableTitleInterface> = ({
	text,
	editState,
	reference
}) => {
	const { darkmode } = useTheme()

	return (
		<h2
			className={`${Text.TitleBold} ${darkmode && Styles.TitleDark}`}
			contentEditable={editState}
			suppressContentEditableWarning={true}
			spellCheck={false}
			ref={reference}
		>
			{text}
		</h2>
	)
}

export default EditableTitle