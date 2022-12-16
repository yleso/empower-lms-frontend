import { CreateFaqDto } from '@/types/faq/create-faq.dto'
import { UpdateFaqDto } from '@/types/faq/update-faq.dto'
import FaqInterface from '../../types/faq/faq.interface'
import api from './api'


const faqApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team faqs
		getTeamFaqs: builder.query<
			{
				data: Array<FaqInterface>
			},
			number
		>({
			query: teamId => `faqs?filters[team]=${teamId}`,
			providesTags: () => [{ type: 'FAQ' }]
		}),
		//Create faq question
		createFaq: builder.mutation<FaqInterface, CreateFaqDto>({
			query: dto => ({
				url: 'faqs/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['FAQ']
		}),
		//Edit faq
		editFaq: builder.mutation<FaqInterface, UpdateFaqDto>({
			query: dto => ({
				url: `faqs/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
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
		})
	})
})

export default faqApi