import { FC, Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { tableHeaders } from '@/pages/admin-panel/table-headers'
import ErrorPage from '@/pages/error/error.page'
import { AddButton } from '@/generic/buttons/admin-buttons/big-buttons/admin-button'
import SmallDeleteButton from '@/generic/buttons/delete-buttons/small-delete-button/small-delete-button'
import { OptionInterface } from '@/generic/select/select.interface'
import Avatar from '@/components/avatar/avatar'
import CreateTeammatePopup from '@/components/create-teammate-popup/create-teammate-popup'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { useAuth } from '@/hooks/useAuth.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import { BASE_API_URL } from '@/store/api/axios'
import employeeApi from '@/store/api/employee.api'
import roleApi from '@/store/api/role.api'
import teamApi from '@/store/api/team.api'
import Text from '@/styles/text.module.scss'
import Styles from './admin-panel.module.scss'


const AdminPanelPage: FC = () => {
	//Hooks
	const { darkmode } = useTheme()
	const { user: authUser } = useAuth()

	//User data
	const { data: usersData, isLoading: usersLoading } =
		employeeApi.useGetAllEmployeesQuery(null)
	//Delete user function
	//Api function
	const [deleteUserApi] = employeeApi.useDeleteEmployeeMutation()
	const deleteUser = async (userId: number) => {
		await deleteUserApi(userId)
	}

	//Teams
	//Fetch teams
	const { data: teams, isFetching: teamsFetching } =
		teamApi.useGetAllTeamsQuery(null)

	//Array with teams for popup
	const teamsArray = useMemo(() => {
		//Empty array
		let teamsArray: OptionInterface[] = []
		//Check is teams undefined
		if (teams) {
			for (const team of teams) {
				teamsArray.push({
					value: team.id,
					text: team.name
				})
			}
		}
		//Return new array
		return teamsArray
	}, [teamsFetching])

	//Roles
	//Fetch roles
	const { data: roles, isLoading: rolesLoading } =
		roleApi.useGetAllRolesQuery(null)

	//Edit user functions
	//Edit user team api function
	const [editUserTeam] = employeeApi.useChangeEmployeeTeamMutation()
	//Edit user roles api function
	const [editUserRole] = employeeApi.useChangeEmployeeRoleMutation()

	//Popup state hook
	const { isShow, setIsShow, ref } = useOutside(false)

	if (usersLoading || rolesLoading) return <Loader />
	if (authUser?.access_level !== 4) return <ErrorPage error={403} />

	return (
		<>
			<CreateTeammatePopup
				isShow={isShow}
				setIsShow={setIsShow}
				reference={ref}
				teams={teamsArray}
			/>
			<div className={Styles.Header}>
				<Title text={'Admin Panel'} />
				<AddButton action={() => setIsShow(true)} />
			</div>
			<div className={Styles.TableWrapper}>
				<div className={`${Styles.Table} ${darkmode && Styles.TableDark}`}>
					<ul className={Styles.TableGrid}>
						{/*Headers*/}
						{tableHeaders.map(header => (
							<li
								key={header}
								className={`${Text.H6Bold} ${Styles.TableCell} ${Styles.TableHeader}`}
							>
								{header}
							</li>
						))}
						{usersData &&
							usersData.map(user => (
								<Fragment key={user.id}>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<div className={Styles.CellControls}>
											<SmallDeleteButton
												disabled={user.id === authUser?.id}
												deleteFunction={() => deleteUser(user.id)}
											/>
										</div>
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<Link to={`/employee/${user.id}`}>
											<div className={Styles.UserAvatar}>
												{user.avatar_path && (
													<Avatar
														avatarPath={`${BASE_API_URL}${user.avatar_path}`}
														alt={`${user.name} ${user.surname}`}
														height={'32px'}
														width={'32px'}
													/>
												)}
											</div>
										</Link>
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<Link to={`/employee/${user.id}`}>{user.name}</Link>
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										{user.surname}
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										{user.email}
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										{user?.phone}
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<select
											className={`${Text.H6Regular} ${Styles.TeamSelect}`}
											value={user.team.id}
											onChange={event => {
												editUserTeam({
													userId: user.id,
													teamId: Number(event.target.value)
												})
											}}
										>
											{teams &&
												teams.map(team => (
													<option key={team.id} value={team.id}>
														{team.name}
													</option>
												))}
										</select>
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										{user.job_title}
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										{user.starting_date}
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<select
											disabled={user.id === authUser?.id}
											className={`${Text.H6Regular} ${Styles.TeamSelect}`}
											defaultValue={user?.role?.access_level}
											onChange={event => {
												editUserRole({
													userId: user.id,
													roleId: Number(event.target.value)
												})
											}}
										>
											{roles &&
												roles.map(role => (
													<option
														key={role.access_level}
														value={role.access_level}
													>
														{role.name}
													</option>
												))}
										</select>
									</li>
								</Fragment>
							))}
						{/*Content*/}
					</ul>
				</div>
			</div>
		</>
	)
}

export default AdminPanelPage