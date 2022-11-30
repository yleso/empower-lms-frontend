import CreateModuleDto from '@/types/module/create-module.dto'
import ModuleInterface from '@/types/module/module.interface'
import UpdateModuleDto from '@/types/module/update-module.dto'
import api from '@/store/api/api'


const moduleApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Course Modules
		getCourseModules: builder.query<
			{
				data: ModuleInterface[]
			},
			number
		>({
			query: courseId =>
				`modules?filters[course]=${courseId}&populate=lessons,tests&sort=id`,
			providesTags: () => [{ type: 'Module' }]
		}),
		//Create Course Module
		createModule: builder.mutation<
			{
				data: ModuleInterface
			},
			CreateModuleDto
		>({
			query: dto => ({
				url: 'modules/',
				method: 'POST',
				body: {
					data: { ...dto }
				}
			}),
			invalidatesTags: ['Module']
		}),
		//Delete Module
		deleteModule: builder.mutation<
			{
				data: ModuleInterface
			},
			number
		>({
			query: moduleId => ({
				url: `modules/${moduleId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Module']
		}),
		//Edit Module
		editModule: builder.mutation<
			{
				data: ModuleInterface
			},
			UpdateModuleDto
		>({
			query: dto => ({
				url: `modules/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Module']
		})
	})
})

export default moduleApi