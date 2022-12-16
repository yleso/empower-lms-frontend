import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import { AddButton } from '@/generic/buttons/admin-buttons/big-buttons/admin-button'
import CreateDepartmentSection from '@/components/create-department-section/create-department-section'
import DepartmentSection from '@/components/department-section/department-section'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import departmentApi from '@/store/api/department.api'
import employeeApi from '@/store/api/employee.api'
import teamApi from '@/store/api/team.api'
import Styles from './knowledge-base.module.scss'


const KnowledgebasePage: FC = () => {
	//Hooks
	const { dep_id: depId } = useParams()
	const { user } = useAuth()

	const { userRole } = useGetAuthRole()
	const isUserAdmin = userRole?.type === 'administrator'

	//Main Departments
	const { data: departmentsData, isLoading: departmentsLoading } =
		departmentApi.useGetChildDepartmentsQuery(null)
	const departments = departmentsData?.data

	//Main teams
	const { data: teamsData, isLoading: teamsLoading } =
		teamApi.useGetMainTeamsQuery(null)
	const mainTeams = teamsData?.data

	//Child Departments
	const getDepId = depId ? +depId : 0
	const { data: childDepartmentsData, isLoading: childrenLoading } =
		departmentApi.useGetChildDepartmentsQuery(getDepId)
	const childDepartments = childDepartmentsData?.data
	const { data: childTeamsData, isLoading: childTeamsLoading } =
		departmentApi.useGetDepartmentTeamsQuery(getDepId)
	const childTeams = childTeamsData?.data

	//User Team
	const { data: teamData } = employeeApi.useGetEmployeeTeamQuery(user?.id || 0)
	const userTeam = teamData?.data[0].id || 0

	//End of data fetching
	const isMainPage: boolean = !!depId

	const { isShow, setIsShow, ref } = useOutside(false)

	if (
		childrenLoading ||
		childTeamsLoading ||
		departmentsLoading ||
		teamsLoading
	)
		return <Loader />
	if (!childDepartments && !childTeams && !departments && !mainTeams)
		return <Page404 />

	return (
		<>
			<CreateDepartmentSection
				isOpened={isShow}
				setIsOpened={setIsShow}
				popupRef={ref}
			/>
			<section>
				<div className={Styles.Header}>
					<Title text={'Knowledge base'} />
					{isUserAdmin && <AddButton action={() => setIsShow(true)} />}
				</div>
				<div className={Styles.DepartmentSectionsGrid}>
					{isMainPage ? (
						<>
							{childDepartments &&
								childDepartments.map(department => (
									<DepartmentSection
										key={department.id}
										id={department.id}
										name={department.attributes.name}
										isTeam={false}
									/>
								))}
							{childTeams &&
								childTeams.map(department => (
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
							{departments &&
								departments.map(department => (
									<DepartmentSection
										key={department.id}
										id={department.id}
										name={department.attributes.name}
										isTeam={false}
									/>
								))}
							{mainTeams &&
								mainTeams.map(team => (
									<DepartmentSection
										key={team.id}
										id={team.id}
										name={team.attributes.name}
										isTeam={true}
									/>
								))}
							<DepartmentSection id={userTeam} name={'My team'} isTeam={true} />
						</>
					)}
				</div>
			</section>
		</>
	)
}

export default KnowledgebasePage