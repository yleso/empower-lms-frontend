import { FC } from 'react'
import { Plus } from 'tabler-icons-react'
import CoursePopup from '@/components/team-popups/course-popup/course-popup'
import useOutside from '@/hooks/useOutside.hook'
import Text from '@/styles/text.module.scss'
import Styles from './sidebar-button.module.scss'


const SidebarButton: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<>
			<CoursePopup popupShow={isShow} setPopupShow={setIsShow} popupRef={ref} />
			<button
				type={'button'}
				onClick={() => setIsShow(true)}
				className={`${Styles.MenuButton} ${isShow && Styles.MenuButtonActive}`}
			>
				<Plus size={24} />
				<span className={Text.ButtonLarge}>Create course</span>
			</button>
		</>
	)
}

export default SidebarButton