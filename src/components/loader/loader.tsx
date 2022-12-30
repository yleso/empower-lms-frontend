import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Styles from './loader-element.module.scss'

const Loader: FC = () => {
	const { darkmode } = useTheme()

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