import { LearningInterface } from '@/types/learning/learning.interface'
import { CreateUserDto } from '@/types/user/create-user.dto'
import { UserInterface } from '@/types/user/user.interface'
import api from './api'


const employeeApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get all employees
		getAllEmployees: builder.query<UserInterface[], null>({
			query: () => `users`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Get Employee
		getEmployee: builder.query<UserInterface, number>({
			query: employeeId => `users/${employeeId}`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Get Employees
		getTeamMembers: builder.query<UserInterface[], number>({
			query: teamId => `users/team/${teamId}`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Create Employee
		createEmployee: builder.mutation<UserInterface, CreateUserDto>({
			query: dto => ({
				url: 'users/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Change Employee Avatar
		changeAvatar: builder.mutation<UserInterface, HTMLFormElement>({
			query: data => ({
				url: 'users/change-avatar',
				method: 'POST',
				body: new FormData(data)
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
			{ userId: number; teamId: number }
		>({
			query: ({ userId, teamId }) => ({
				url: `users/${userId}`,
				method: 'PATCH',
				body: {
					team: teamId
				}
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Change Employee Avatar
		changeEmployeeRole: builder.mutation<
			UserInterface,
			{ userId: number; roleId: number }
		>({
			query: ({ userId, roleId }) => ({
				url: `users/${userId}`,
				method: 'PATCH',
				body: {
					role: roleId
				}
			}),
			invalidatesTags: () => [{ type: 'User' }]
		}),
		//Get Employee Learnings
		getEmployeeLearnings: builder.query<LearningInterface[], number>({
			query: userId => `users/learnings/${userId}`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Search users
		searchUsers: builder.mutation<UserInterface[], string>({
			query: query => ({
				url: `users/search/${query}`,
				method: 'POST'
			}),
			invalidatesTags: ['Search']
		})
	})
})

export default employeeApi