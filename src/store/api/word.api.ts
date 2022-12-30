import { CreateWordDto } from '@/types/word/create-word.dto'
import {
	WordInterface,
	WordWithTeamInterface
} from '@/types/word/word.interface'
import api from './api'

const wordApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team words
		getTeamWords: builder.query<WordInterface[], number>({
			query: teamId => `words/team/${teamId}`,
			providesTags: () => [{ type: 'Word' }]
		}),
		//Create word
		createWord: builder.mutation<WordInterface, CreateWordDto>({
			query: dto => ({
				url: 'words/',
				method: 'POST',
				body: dto
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
		}),
		//Search words
		searchWords: builder.mutation<WordWithTeamInterface[], string>({
			query: query => ({
				url: `words/search/${query}`,
				method: 'POST'
			}),
			invalidatesTags: ['Search']
		})
	})
})

export default wordApi