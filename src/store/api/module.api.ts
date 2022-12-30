import { CreateModuleDto } from '@/types/module/create-module.dto'
import { ModuleInterface } from '@/types/module/module.interface'
import { UpdateModuleDto } from '@/types/module/update-module.dto'
import api from '@/store/api/api'


const moduleApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Course Modules
		getCourseModules: builder.query<ModuleInterface[], number>({
			query: courseId => `modules/course/${courseId}`,
			providesTags: () => [{ type: 'Module' }]
		}),
		//Create Course Module
		createModule: builder.mutation<ModuleInterface, CreateModuleDto>({
			query: dto => ({
				url: 'modules/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['Module']
		}),
		//Delete Module
		deleteModule: builder.mutation<ModuleInterface, number>({
			query: moduleId => ({
				url: `modules/${moduleId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Module']
		}),
		//Edit Module
		editModule: builder.mutation<ModuleInterface, UpdateModuleDto>({
			query: dto => ({
				url: `modules/${dto.id}`,
				method: 'PATCH',
				body: dto
			}),
			invalidatesTags: ['Module']
		})
	})
})

export default moduleApi