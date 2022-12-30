import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import DepartmentSectionInterface from './department-section.interface'
import Styles from './department-section.module.scss'


const DepartmentSection: FC<DepartmentSectionInterface> = department => {
	const { darkmode } = useTheme()

	//Data fetch
	const { user } = useAuth()
	const userTeamId = user?.team_id || 0
	//End of fetching data

	return (
		<Link
			key={department.id}
			to={
				department.isTeam
					? `/knowledge-base/team/${department.id}`
					: `/knowledge-base/${department.id}`
			}
		>
			<div
				className={`${Text.H6Bold} ${Styles.DepartmentSection} ${
					darkmode && Styles.DepartmentSectionDark
				} ${department.name === 'My team' && Styles.TeamSection} ${
					department.id === userTeamId &&
					department.isTeam &&
					Styles.TeamSection
				}`}
			>
				{department.name}
			</div>
		</Link>
	)
}

export default DepartmentSection