import api from './api'
import DepartmentsInterface from '../../types/department.interface'

const departmentApi = api.injectEndpoints({
	endpoints: builder => ({
		// Get Department Children
		getChildDepartments: builder.query<DepartmentsInterface, number | null>({
			query: departmentId => `departments?filters[department]${departmentId === null ? '' : `=${departmentId}`}`,
			providesTags: () => [{ type: 'Department' }]
		}),
		//Get Department Teams
		getDepartmentTeams: builder.query<DepartmentsInterface, number>({
			query: departmentId => `teams?filters[department]=${departmentId}`,
			providesTags: () => [{ type: 'Team' }]
		})
	})
})

export default departmentApi