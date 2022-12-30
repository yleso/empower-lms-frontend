import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Styles from './divider.module.scss'

const Divider: FC = () => {
	const { darkmode } = useTheme()

	return (
		<div className={`${Styles.Divider} ${darkmode && Styles.DividerDark}`} />
	)
}

export default Divider