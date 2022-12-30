import { AnswerInterface } from '@/components/question/question.interface'
import { CreateAnswerDto } from '@/types/answer/create-answer.dto'
import { UpdateAnswerDto } from '@/types/answer/update-answer.dto'
import api from './api'


const answerApi = api.injectEndpoints({
	endpoints: builder => ({
		//Create New Answer
		createAnswer: builder.mutation<AnswerInterface, CreateAnswerDto>({
			query: dto => ({
				url: 'answers/',
				method: 'POST',
				body: dto
			})
			// invalidatesTags: ['Answer']
		}),
		//Delete Answer
		deleteAnswer: builder.mutation<AnswerInterface, number>({
			query: courseId => ({
				url: `answers/${courseId}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['Answer']
		}),
		//Edit Answer
		editAnswer: builder.mutation<AnswerInterface, UpdateAnswerDto>({
			query: dto => ({
				url: `answers/${dto.id}`,
				method: 'PATCH',
				body: dto
			})
		})
	})
})

export default answerApi