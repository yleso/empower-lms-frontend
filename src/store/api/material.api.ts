import { CreateMaterialDto } from '@/types/material/create-material.dto'
import { MaterialInterface } from '@/types/material/material.interface'
import api from './api'

const materialApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Department Teams
		getTeamMaterials: builder.query<
			{
				data: Array<MaterialInterface>
			},
			number
		>({
			query: teamId => `materials?filters[team]=${teamId}&populate=file`,
			providesTags: () => [{ type: 'Material' }]
		}),
		//Add Material
		addMaterial: builder.mutation<
			{
				data: MaterialInterface
			},
			CreateMaterialDto
		>({
			query: materialDto => ({
				url: 'materials/',
				method: 'POST',
				body: {
					data: {
						...materialDto
					}
				}
			}),
			invalidatesTags: ['Material']
		})
	})
})

export default materialApi