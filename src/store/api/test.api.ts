import { CreateTestDto } from '@/types/test/create-test.dto'
import { TestInterface } from '@/types/test/test.interface'
import { UpdateTestDto } from '@/types/test/update-test.dto'
import api from '@/store/api/api'


const testApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Course
		getTest: builder.query<{ data: TestInterface }, number>({
			query: courseId => `tests/${courseId}`
			// providesTags: () => [{ type: 'Test' }]
		}),
		//Create Test
		createTest: builder.mutation<
			{
				data: TestInterface
			},
			CreateTestDto
		>({
			query: dto => ({
				url: 'tests/',
				method: 'POST',
				body: {
					data: dto
				}
			})
			// invalidatesTags: ['Test']
		}),
		//Edit Test
		editTest: builder.mutation<
			{
				data: TestInterface
			},
			UpdateTestDto
		>({
			query: dto => ({
				url: `tests/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
			})
			// invalidatesTags: ['Test']
		}),
		//Delete Test
		deleteTest: builder.mutation<
			{
				data: TestInterface
			},
			number
		>({
			query: testId => ({
				url: `tests/${testId}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['Test']
		})
	})
})

export default testApi