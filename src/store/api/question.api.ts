import { AnswerQuestionDto } from '@/types/answer/answer-question.dto'
import { CreateQuestionDto } from '@/types/question/create-question.dto'
import { QuestionInterface } from '@/types/question/question.interface'
import { UpdateQuestionDto } from '@/types/question/update-question.dto'
import api from '@/store/api/api'


const questionApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Test Questions
		getTestQuestions: builder.query<QuestionInterface[], number>({
			query: testId => `questions/test/${testId}`
			// providesTags: () => [{ type: 'Question' }]
		}),
		//Get Test Questions
		getQuestionWithAnswers: builder.query<QuestionInterface, number>({
			query: questionId => `questions/${questionId}`
			// providesTags: () => [{ type: 'Question' }]
		}),
		//Create Question
		createQuestion: builder.mutation<QuestionInterface, CreateQuestionDto>({
			query: dto => ({
				url: `questions`,
				method: 'POST',
				body: dto
			})
		}),
		//Edit Question
		editQuestion: builder.mutation<QuestionInterface, UpdateQuestionDto>({
			query: dto => ({
				url: `questions/${dto.id}`,
				method: 'PATCH',
				body: dto
			}),
			invalidatesTags: ['Question']
		}),
		//Delete Question
		deleteQuestion: builder.mutation<QuestionInterface, number>({
			query: questionId => ({
				url: `questions/${questionId}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['Question']
		}),
		//Answer Question
		answerQuestion: builder.mutation<boolean, AnswerQuestionDto>({
			query: dto => ({
				url: `questions/answer/${dto.id}`,
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['User Progress']
		}),
		//Increment Question order
		incrementQuestionOrder: builder.mutation<null, number>({
			query: id => ({
				url: `questions/order/increment/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['Question']
		}),
		//Decrement Question order
		decrementQuestionOrder: builder.mutation<null, number>({
			query: id => ({
				url: `questions/order/decrement/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['Question']
		})
	})
})

export default questionApi