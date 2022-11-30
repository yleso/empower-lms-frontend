import { ThemeContext } from '@/context/theme.context'
import { FC, useContext } from 'react'
import Text from '@/styles/text.module.scss'
import TitleInterface from './title.interface'
import Styles from './title.module.scss'


const Title: FC<TitleInterface> = ({ text }) => {
	const { darkmode } = useContext(ThemeContext)

	return (
		<h2 className={`${Text.TitleBold} ${darkmode && Styles.TitleDark}`}>
			{text}
		</h2>
	)
}

export default Title