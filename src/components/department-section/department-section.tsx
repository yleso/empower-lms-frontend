import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '@/context/theme.context';
import { useAuth } from '@/hooks/useAuth.hook'
import employeeApi from '@/store/api/employee.api';
import Text from '@/styles/text.module.scss';
import DepartmentSectionInterface from './department-section.interface';
import Styles from './department-section.module.scss';


const DepartmentSection: FC<DepartmentSectionInterface> = department => {
	const { darkmode } = useContext(ThemeContext)

	//Data fetch
	const { user } = useAuth()
	const { data: teamData } = employeeApi.useGetEmployeeTeamQuery(user?.id || 0)
	const userTeamId = teamData?.data[0].id
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