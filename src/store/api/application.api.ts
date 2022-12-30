import api from './api'

const departmentApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get is application activated
		getIsActivated: builder.query<boolean, null>({
			query: () => 'application/is-active',
			providesTags: () => [{ type: 'Application' }]
		})
	})
})

export default departmentApi