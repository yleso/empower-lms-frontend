import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '@/store/api/axios'
import { RootStateType } from '@/store/store'

const api = createApi({
	reducerPath: 'api',
	tagTypes: [
		'Application',
		'User',
		'Department',
		'Team',
		'FAQ',
		'Word',
		'Material',
		'Course',
		'Module',
		'Lesson',
		'Test',
		'Question',
		'Answer',
		'Upload',
		'User Progress',
		'Search'
	],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootStateType).auth.access_token
			if (token) headers.set('Authorization', `Bearer ${token}`)

			return headers
		}
	}),
	endpoints: () => ({})
})

export default api