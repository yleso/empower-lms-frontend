import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import TitleInterface from './title.interface'
import Styles from './title.module.scss'


const Title: FC<TitleInterface> = ({ text }) => {
	const { darkmode } = useTheme()

	return (
		<h2 className={`${Text.TitleBold} ${darkmode && Styles.TitleDark}`}>
			{text}
		</h2>
	)
}

export default Title