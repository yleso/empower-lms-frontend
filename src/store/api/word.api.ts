import { CreateWordDto } from '@/types/word/create-word.dto'
import WordInterface from '@/types/word/word.interface'
import api from './api'

const wordApi = api.injectEndpoints({
	endpoints: builder => ({
		createWord: builder.mutation<WordInterface, CreateWordDto>({
			query: wordDto => ({
				url: 'words/',
				method: 'POST',
				body: {
					data: { ...wordDto }
				}
			}),
			invalidatesTags: ['Word']
		})
	})
})

export default wordApi