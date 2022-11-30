import DepartmentSection from '../../components/department-section/department-section'
import Title from '../../components/generic/title/title'
import { FC } from 'react'
import Styles from './knowledge-base.module.scss'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.hook'
import departmentApi from '../../store/api/department.api'
import employeeApi from '../../store/api/employee.api'

const KnowledgebasePage: FC = () => {
	const { dep_id: depId } = useParams()
	
	//Data fetch
	
	//User
	const { user } = useAuth()
	
	//Main Departments
	const { data: departmentsData } = departmentApi.useGetChildDepartmentsQuery(null)
	const departments = departmentsData?.data
	
	//Child Departments
	const getDepId = depId ? +depId : 0
	const { data: childDepartmentsData } = departmentApi.useGetChildDepartmentsQuery(getDepId)
	const childDepartments = childDepartmentsData?.data
	const { data: childTeamsData } = departmentApi.useGetDepartmentTeamsQuery(getDepId)
	const childTeams = childTeamsData?.data
	
	//User Team
	const { data: teamData } = employeeApi.useGetEmployeeTeamQuery(user?.id || 0)
	const userTeam = teamData?.data[0].id || 0
	
	//End of data fetching
	
	const isMainPage: boolean = !!depId
	
	return (
		<>
			<section>
				<Title text={'Knowledge base'} />
				<div className={Styles.DepartmentSectionsGrid}>
					{isMainPage ? (
						<>
							{childDepartments && childDepartments.map(department => (
								<DepartmentSection
									key={department.id}
									id={department.id}
									name={department.attributes.name}
									isTeam={false}
								/>
							))}
							{childTeams && childTeams.map(department => (
								<DepartmentSection
									key={department.id}
									id={department.id}
									name={department.attributes.name}
									isTeam={true}
								/>
							))}
						</>
					) : (
						<>
							{departments && departments.map(department => (
								<DepartmentSection
									key={department.id}
									id={department.id}
									name={department.attributes.name}
									isTeam={false}
								/>
							))}
							<DepartmentSection
								id={userTeam}
								name={'My team'}
								isTeam={true}
							/>
						</>
					)}
				</div>
			</section>
		</>
	)
}

export default KnowledgebasePage
