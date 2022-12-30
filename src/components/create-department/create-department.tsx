import { FC } from 'react'
import { Plus } from 'tabler-icons-react'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Styles from './create-department.module.scss'


const CreateDepartment: FC = () => {
	const { darkmode } = useTheme()

	return (
		<button type={'button'}>
			<div
				className={`${Text.H6Bold} ${Styles.DepartmentSection} ${
					darkmode && Styles.DepartmentSectionDark
				}`}
			>
				<Plus size={64} />
			</div>
		</button>
	)
}

export default CreateDepartment