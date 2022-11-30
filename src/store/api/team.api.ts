import { TeamInterface } from '@/types/team.interface'
import { UserInterface } from '@/types/user/user.interface'
import api from './api'

const teamApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team
		getTeam: builder.query<
			{
				data: TeamInterface
			},
			number
		>({
			query: teamId => `teams/${teamId}?populate=materials,words,faqs`,
			providesTags: () => [{ type: 'Team' }]
		}),
		//Get team managers
		getTeamManagers: builder.query<UserInterface[], number>({
			query: teamId => `users?filters[team]=${teamId}&filters[role]=4`,
			providesTags: () => [{ type: 'User' }]
		})
	})
})

export default teamApi