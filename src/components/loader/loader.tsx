import { ThemeContext } from '@/context/theme.context'
import { FC, useContext } from 'react'
import Styles from './loader-element.module.scss'

const Loader: FC = () => {
	const { darkmode } = useContext(ThemeContext)

	return (
		<>
			<div
				className={`${Styles.LoaderBackground} ${
					darkmode && Styles.LoaderBackgroundDark
				}`}
			>
				<div className={`${Styles.Loader} ${darkmode && Styles.LoaderDark}`} />
			</div>
		</>
	)
}

export default Loader