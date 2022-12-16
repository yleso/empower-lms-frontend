import { UserRoleInterface } from '@/types/role/role.interface'
import api from './api'

const roleApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get all roles
		getAllRoles: builder.query<
			{
				roles: UserRoleInterface[]
			},
			null
		>({
			query: () => 'users-permissions/roles/',
			providesTags: () => [{ type: 'User' }]
		})
	})
})

export default roleApi