import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { SEARCH_API_URL } from '@/store/api/axios'
import { SearchCourseInterface } from '@/types/course/search-course.interface'
import { SearchUserInterface } from '@/types/user/search-user.interface'
import { SearchWordInterface } from '@/types/word/search-word.interface'
import { SearchFaqInterface } from '@/types/faq/search-faq.interface'

const searchApi = createApi({
	reducerPath: 'searchApi',
	tagTypes: ['Search'],
	baseQuery: fetchBaseQuery({
		baseUrl: SEARCH_API_URL
	}),
	endpoints: builder => ({
		searchCourses: builder.mutation<
			{
				hits: SearchCourseInterface[]
			},
			string
		>({
			query: queryText => ({
				url: 'indexes/course/search/',
				method: 'POST',
				body: {
					q: queryText
				}
			}),
			invalidatesTags: () => [{ type: 'Search' }]
		}),
		searchUsers: builder.mutation<
			{
				hits: SearchUserInterface[]
			},
			string
		>({
			query: queryText => ({
				url: 'indexes/user/search/',
				method: 'POST',
				body: {
					q: queryText
				}
			}),
			invalidatesTags: () => [{ type: 'Search' }]
		}),
		searchWords: builder.mutation<
			{
				hits: SearchWordInterface[]
			},
			string
		>({
			query: queryText => ({
				url: 'indexes/word/search/',
				method: 'POST',
				body: {
					q: queryText
				}
			}),
			invalidatesTags: () => [{ type: 'Search' }]
		}),
		searchFaqs: builder.mutation<
			{
				hits: SearchFaqInterface[]
			},
			string
		>({
			query: queryText => ({
				url: 'indexes/faq/search/',
				method: 'POST',
				body: {
					q: queryText
				}
			}),
			invalidatesTags: () => [{ type: 'Search' }]
		})
	})
})

export default searchApi