import { CreateFaqDto } from '@/types/faq/create-faq.dto'
import FaqInterface from '../../types/faq/faq.interface'
import api from './api'

const faqApi = api.injectEndpoints({
	endpoints: builder => ({
		createFaq: builder.mutation<FaqInterface, CreateFaqDto>({
			query: faqDto => ({
				url: 'faqs/',
				method: 'POST',
				body: {
					data: { ...faqDto }
				}
			}),
			invalidatesTags: ['FAQ']
		})
	})
})

export default faqApi