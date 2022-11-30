import { TeamInterface } from '@/types/team.interface'
import { CreateUserDto } from '@/types/user/create-user.dto'
import { UserInterface } from '@/types/user/user.interface'
import api from './api'


const employeeApi = api.injectEndpoints({
	endpoints: builder => ({
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
		})
	})
})

export default employeeApi