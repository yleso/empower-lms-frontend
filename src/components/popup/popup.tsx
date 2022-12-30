import { FC, PropsWithChildren, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import { PopupInterface } from './popup.interface'
import Styles from './popup.module.scss'


const Popup: FC<PropsWithChildren<PopupInterface>> = ({
	isOpened,
	setIsOpened,
	reference,
	children
}) => {
	const { darkmode } = useTheme()

	useEffect(() => {
		document.addEventListener('keydown', handleClose, false)

		return () => {
			document.removeEventListener('keydown', handleClose, false)
		}
	}, [])

	const handleClose = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpened(false)
		}
	}

	return (
		<>
			{isOpened && (
				<div className={`${Styles.Popup} ${darkmode && Styles.PopupDark}`}>
					<div className={`${Styles.PopupContent}`} ref={reference}>
						{children}
					</div>
				</div>
			)}
		</>
	)
}

export default Popup