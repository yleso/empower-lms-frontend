import { CreateFaqDto } from '@/types/faq/create-faq.dto'
import { FaqInterface, FaqWithTeamInterface } from '@/types/faq/faq.interface'
import { UpdateFaqDto } from '@/types/faq/update-faq.dto'
import api from './api'


const faqApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team faqs
		getTeamFaqs: builder.query<FaqInterface[], number>({
			query: teamId => `faqs/team/${teamId}`,
			providesTags: () => [{ type: 'FAQ' }]
		}),
		//Create faq question
		createFaq: builder.mutation<FaqInterface, CreateFaqDto>({
			query: dto => ({
				url: 'faqs/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['FAQ']
		}),
		//Edit faq
		editFaq: builder.mutation<FaqInterface, UpdateFaqDto>({
			query: dto => ({
				url: `faqs/${dto.id}`,
				method: 'PATCH',
				body: dto
			}),
			invalidatesTags: ['FAQ']
		}),
		//Delete faq
		deleteFaq: builder.mutation<FaqInterface, Number>({
			query: faqId => ({
				url: `faqs/${faqId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['FAQ']
		}),
		//Search faqs
		searchFaqs: builder.mutation<FaqWithTeamInterface[], string>({
			query: query => ({
				url: `faqs/search/${query}`,
				method: 'POST'
			}),
			invalidatesTags: ['Search']
		})
	})
})

export default faqApi