import { FC } from 'react'
import { useParams } from 'react-router-dom'
import ErrorPage from '@/pages/error/error.page'
import { AddButton } from '@/generic/buttons/admin-buttons/big-buttons/admin-button'
import CreateDepartmentSection from '@/components/create-department-section/create-department-section'
import DepartmentSection from '@/components/department-section/department-section'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import departmentApi from '@/store/api/department.api'
import teamApi from '@/store/api/team.api'
import Styles from './knowledge-base.module.scss'


const KnowledgebasePage: FC = () => {
	//Hooks
	const { dep_id: depId } = useParams()
	const { user } = useAuth()
	const isUserAdmin = user?.access_level === 4

	//Main Departments
	const { data: departments, isLoading: departmentsLoading } =
		departmentApi.useGetChildDepartmentsQuery(null)

	//Main teams
	const { data: mainTeams, isLoading: teamsLoading } =
		teamApi.useGetMainTeamsQuery(null)

	//Child Departments
	const getDepId = depId ? +depId : 0
	const { data: childDepartments, isLoading: childrenLoading } =
		departmentApi.useGetChildDepartmentsQuery(getDepId)

	const { data: childTeams, isLoading: childTeamsLoading } =
		departmentApi.useGetDepartmentTeamsQuery(getDepId)

	//User Team
	const userTeam = user?.team_id || 0

	//End of data fetching
	const isMainPage = !!depId

	const { isShow, setIsShow, ref } = useOutside(false)

	if (
		childrenLoading ||
		childTeamsLoading ||
		departmentsLoading ||
		teamsLoading
	)
		return <Loader />
	if (!childDepartments && !childTeams && !departments && !mainTeams)
		return <ErrorPage error={404} />

	return (
		<>
			<CreateDepartmentSection
				isOpened={isShow}
				setIsOpened={setIsShow}
				reference={ref}
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
										name={department.name}
										isTeam={false}
									/>
								))}
							{childTeams &&
								childTeams.map(department => (
									<DepartmentSection
										key={department.id}
										id={department.id}
										name={department.name}
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
										name={department.name}
										isTeam={false}
									/>
								))}
							{mainTeams &&
								mainTeams.map(team => (
									<DepartmentSection
										key={team.id}
										id={team.id}
										name={team.name}
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