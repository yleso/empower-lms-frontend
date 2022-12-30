import React, { FC } from 'react'
import { Plus } from 'tabler-icons-react'
import { WordInterface } from '@/components/word/word.interface'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Styles from './word.module.scss'


const Word: FC<WordInterface> = ({
	id,
	name,
	definition,
	editState,
	deleteFunction
}) => {
	const { darkmode } = useTheme()

	return (
		<li className={`${Styles.Word} ${darkmode && Styles.WordDark}`}>
			{editState && (
				<button
					type={'button'}
					onClick={() => deleteFunction(id)}
					className={Styles.DeleteButton}
				>
					<Plus size={24} />
				</button>
			)}
			<p className={Text.Body1Regular}>
				<span className={Text.H6Bold}>{name} -&nbsp;</span>
				{definition}
			</p>
		</li>
	)
}

export default Word