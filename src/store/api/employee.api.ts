import { TeamInterface } from '@/types/team/team.interface'
import { CreateUserDto } from '@/types/user/create-user.dto'
import { UserInterface } from '@/types/user/user.interface'
import api from './api'


const employeeApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get all employees
		getAllEmployees: builder.query<UserInterface[], null>({
			query: () => `users?populate=team,avatar,role&sort=id`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Get Employee
		getEmployee: builder.query<UserInterface, number>({
			query: employeeId => `users/${employeeId}?populate=team,avatar,role`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Get Employees
		getTeamMembers: builder.query<UserInterface[], number>({
			query: teamId => `users?filters[team]=${teamId}&populate=avatar`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Get Employee Team
		getEmployeeTeam: builder.query<{ data: Array<TeamInterface> }, number>({
			query: employeeId => `teams?filters[users]=${employeeId}`,
			providesTags: () => [{ type: 'Team' }]
		}),
		//Get Profile
		getProfile: builder.query<UserInterface, null>({
			query: () => `users/me?populate=role`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Create Employee
		createEmployee: builder.mutation<UserInterface, CreateUserDto>({
			query: dto => ({
				url: 'users/',
				method: 'POST',
				body: { ...dto }
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Change Employee Avatar
		changeEmployeeAvatar: builder.mutation<
			UserInterface,
			{
				userId: number
				avatarId: number
			}
		>({
			query: data => ({
				url: `users/${data.userId}`,
				method: 'PUT',
				body: {
					avatar: data.avatarId
				}
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Delete user
		deleteEmployee: builder.mutation<UserInterface, number>({
			query: userId => ({
				url: `users/${userId}`,
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Change Employee Avatar
		changeEmployeeTeam: builder.mutation<
			UserInterface,
			{
				userId: number
				teamId: number
			}
		>({
			query: ({ userId, teamId }) => ({
				url: `users/${userId}`,
				method: 'PUT',
				body: {
					team: teamId
				}
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Change Employee Avatar
		changeEmployeeRole: builder.mutation<
			UserInterface,
			{
				userId: number
				roleId: number
			}
		>({
			query: ({ userId, roleId }) => ({
				url: `users/${userId}`,
				method: 'PUT',
				body: {
					role: roleId
				}
			}),
			invalidatesTags: () => [{ type: 'User' }]
		})
	})
})

export default employeeApi