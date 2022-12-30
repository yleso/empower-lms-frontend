import { CreateDepartmentDto } from '@/types/department/create-department.dto'
import { DepartmentsInterface } from '@/types/department/department.interface'
import api from './api'

const departmentApi = api.injectEndpoints({
	endpoints: builder => ({
		// Get Department Children
		getChildDepartments: builder.query<DepartmentsInterface[], number | null>({
			query: departmentId =>
				`departments/${
					departmentId === null ? 'main' : `department/${departmentId}`
				}`,
			providesTags: () => [{ type: 'Department' }]
		}),
		//Get Department Teams
		getDepartmentTeams: builder.query<DepartmentsInterface[], number>({
			query: departmentId => `teams/department/${departmentId}`,
			providesTags: () => [{ type: 'Team' }]
		}),
		//Create New Answer
		createDepartment: builder.mutation<
			DepartmentsInterface,
			CreateDepartmentDto
		>({
			query: dto => ({
				url: 'departments/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['Department']
		})
	})
})

export default departmentApi