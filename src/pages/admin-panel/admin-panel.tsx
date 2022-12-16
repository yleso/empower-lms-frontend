import { FC, Fragment, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import { tableHeaders } from '@/pages/admin-panel/table-headers'
import { AddButton } from '@/generic/buttons/admin-buttons/big-buttons/admin-button'
import SmallDeleteButton from '@/generic/buttons/delete-buttons/small-delete-button/small-delete-button'
import { OptionInterface } from '@/generic/select/select.interface'
import Avatar from '@/components/avatar/avatar'
import CreateTeammatePopup from '@/components/create-teammate-popup/create-teammate-popup'
import Title from '@/components/generic/title/title'
import Loader from '@/components/loader/loader'
import { ThemeContext } from '@/context/theme.context'
import { useAuth } from '@/hooks/useAuth.hook'
import { useGetAuthRole } from '@/hooks/useGetAuthRole.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import employeeApi from '@/store/api/employee.api'
import roleApi from '@/store/api/role.api'
import teamApi from '@/store/api/team.api'
import Text from '@/styles/text.module.scss'
import Styles from './admin-panel.module.scss'


const AdminPanelPage: FC = () => {
	//Hooks
	const { darkmode } = useContext(ThemeContext)
	const { userRole, isLoading } = useGetAuthRole()
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
	const { data: teamsData, isFetching: teamsFetching } =
		teamApi.useGetAllTeamsQuery(null)
	//Teams
	const teams = teamsData?.data

	//Array with teams for popup
	const teamsArray = useMemo(() => {
		//Empty array
		let teamsArray: OptionInterface[] = []
		//Check is teams undefined
		if (teams) {
			for (const team of teams) {
				teamsArray.push({
					value: team.id,
					text: team.attributes.name
				})
			}
		}
		//Return new array
		return teamsArray
	}, [teamsFetching])

	//Roles
	//Fetch roles
	const { data: rolesData, isLoading: rolesLoading } =
		roleApi.useGetAllRolesQuery(null)
	//Teams
	const roles = rolesData?.roles.filter(role => role.type !== 'public')

	//Edit user functions
	//Edit user team api function
	const [editUserTeam] = employeeApi.useChangeEmployeeTeamMutation()
	//Edit user roles api function
	const [editUserRole] = employeeApi.useChangeEmployeeRoleMutation()

	//Popup state hook
	const { isShow, setIsShow, ref } = useOutside(false)

	if (isLoading || usersLoading || rolesLoading) return <Loader />
	if (userRole?.type !== 'administrator') return <Page404 />

	return (
		<>
			<CreateTeammatePopup
				popupShow={isShow}
				setPopupShow={setIsShow}
				popupRef={ref}
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
												deleteFunction={() => deleteUser(user.id)}
											/>
										</div>
									</li>
									<li className={`${Text.H6Regular} ${Styles.TableCell}`}>
										<Link to={`/employee/${user.id}`}>
											<div className={Styles.UserAvatar}>
												{user.avatar && (
													<Avatar
														avatarPath={`${import.meta.env.VITE_API_URL}${
															user.avatar.formats.thumbnail.url
														}`}
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
											defaultValue={user?.team ? user?.team?.id : 0}
											onChange={event => {
												editUserTeam({
													userId: user.id,
													teamId: Number(event.target.value)
												})
											}}
										>
											<option value={0}>No team</option>
											{teams &&
												teams.map(team => (
													<option key={team.id} value={team.id}>
														{team.attributes.name}
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
											defaultValue={user?.role?.id}
											onChange={event => {
												editUserRole({
													userId: user.id,
													roleId: Number(event.target.value)
												})
											}}
										>
											{roles &&
												roles.map(role => (
													<option key={role.id} value={role.id}>
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