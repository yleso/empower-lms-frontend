import { CreateWordDto } from '@/types/word/create-word.dto'
import { WordInterface } from '@/types/word/word.interface'
import api from './api'

const wordApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team words
		getTeamWords: builder.query<
			{
				data: Array<WordInterface>
			},
			number
		>({
			query: teamId => `words?filters[team]=${teamId}`,
			providesTags: () => [{ type: 'Word' }]
		}),
		//Create word
		createWord: builder.mutation<WordInterface, CreateWordDto>({
			query: wordDto => ({
				url: 'words/',
				method: 'POST',
				body: {
					data: wordDto
				}
			}),
			invalidatesTags: ['Word']
		}),
		//Delete word
		deleteWord: builder.mutation<WordInterface, Number>({
			query: wordId => ({
				url: `words/${wordId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Word']
		})
	})
})

export default wordApi