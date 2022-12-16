import { CreateTeamDto } from '@/types/team/create-team.dto'
import { TeamInterface } from '@/types/team/team.interface'
import { UserInterface } from '@/types/user/user.interface'
import api from './api'


const teamApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get all team
		getAllTeams: builder.query<
			{
				data: TeamInterface[]
			},
			null
		>({
			query: () => 'teams',
			providesTags: () => [{ type: 'Team' }]
		}),
		//Get team
		getTeam: builder.query<
			{
				data: TeamInterface
			},
			number
		>({
			query: teamId => `teams/${teamId}`,
			providesTags: () => [{ type: 'Team' }]
		}),
		getMainTeams: builder.query<
			{
				data: TeamInterface[]
			},
			null
		>({
			query: () => 'teams?filters[department]',
			providesTags: () => [{ type: 'Team' }]
		}),
		//Get team managers
		getTeamManagers: builder.query<UserInterface[], number>({
			query: teamId => `users?filters[team]=${teamId}&filters[role]=4`,
			providesTags: () => [{ type: 'User' }]
		}),
		//Create team
		createTeam: builder.mutation<
			{
				data: TeamInterface
			},
			CreateTeamDto
		>({
			query: dto => ({
				url: 'teams/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Team']
		})
	})
})

export default teamApi