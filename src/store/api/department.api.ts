import { CreateDepartmentDto } from '@/types/department/create-department.dto'
import { DepartmentsInterface } from '@/types/department/department.interface'
import api from './api'

const departmentApi = api.injectEndpoints({
	endpoints: builder => ({
		// Get Department Children
		getChildDepartments: builder.query<
			{
				data: DepartmentsInterface[]
			},
			number | null
		>({
			query: departmentId =>
				`departments?filters[department]${
					departmentId === null ? '' : `=${departmentId}`
				}`,
			providesTags: () => [{ type: 'Department' }]
		}),
		//Get Department Teams
		getDepartmentTeams: builder.query<
			{
				data: DepartmentsInterface[]
			},
			number
		>({
			query: departmentId => `teams?filters[department]=${departmentId}`,
			providesTags: () => [{ type: 'Team' }]
		}),
		//Create New Answer
		createDepartment: builder.mutation<
			{
				data: DepartmentsInterface
			},
			CreateDepartmentDto
		>({
			query: dto => ({
				url: 'departments/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Department']
		})
	})
})

export default departmentApi