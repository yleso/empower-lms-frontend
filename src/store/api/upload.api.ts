import { UploadInterface } from '@/types/upload/upload.interface'
import api from './api'

const uploadApi = api.injectEndpoints({
	endpoints: builder => ({
		//Upload New File
		uploadNewFile: builder.mutation<UploadInterface, HTMLFormElement>({
			query: fileData => ({
				url: 'upload/',
				method: 'POST',
				body: new FormData(fileData)
			}),
			invalidatesTags: ['Upload']
		}),
		//Delete File
		deleteFile: builder.mutation<UploadInterface, number>({
			query: fileId => ({
				url: `upload/files/${fileId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Upload']
		})
	})
})

export default uploadApi