import { CreateTeamDto } from '@/types/team/create-team.dto'
import { TeamInterface } from '@/types/team/team.interface'
import api from './api'

const teamApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get all team
		getAllTeams: builder.query<TeamInterface[], null>({
			query: () => 'teams',
			providesTags: () => [{ type: 'Team' }]
		}),
		//Get team
		getTeam: builder.query<TeamInterface, number>({
			query: teamId => `teams/get/${teamId}`,
			providesTags: () => [{ type: 'Team' }]
		}),
		getMainTeams: builder.query<TeamInterface[], null>({
			query: () => 'teams/main',
			providesTags: () => [{ type: 'Team' }]
		}),
		//Create team
		createTeam: builder.mutation<TeamInterface, CreateTeamDto>({
			query: dto => ({
				url: 'teams/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['Team']
		})
	})
})

export default teamApi