import { FC, PropsWithChildren, useContext, useEffect } from 'react'
import { ThemeContext } from '@/context/theme.context'
import { PopupInterface } from './popup.interface'
import Styles from './popup.module.scss'


const Popup: FC<PropsWithChildren<PopupInterface>> = ({
	isOpened,
	setIsOpened,
	popupRef,
	children
}) => {
	const { darkmode } = useContext(ThemeContext)

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
					<div className={`${Styles.PopupContent}`} ref={popupRef}>
						{children}
					</div>
				</div>
			)}
		</>
	)
}

export default Popup