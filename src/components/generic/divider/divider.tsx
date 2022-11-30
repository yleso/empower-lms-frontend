import { ThemeContext } from '@/context/theme.context'
import { FC, useContext } from 'react'
import Styles from './divider.module.scss'

const Divider: FC = () => {
	const { darkmode } = useContext(ThemeContext)

	return (
		<div className={`${Styles.Divider} ${darkmode && Styles.DividerDark}`} />
	)
}

export default Divider
