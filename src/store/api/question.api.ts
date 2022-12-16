import { CreateQuestionDto } from '@/types/question/create-question.dto'
import { QuestionInterface } from '@/types/question/question.interface'
import { UpdateQuestionDto } from '@/types/question/update-question.dto'
import api from '@/store/api/api'


const questionApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Test Questions
		getTestQuestions: builder.query<{ data: QuestionInterface[] }, number>({
			query: testId => `questions?filters[test]=${testId}&populate=answers`
			// providesTags: () => [{ type: 'Question' }]
		}),
		//Get Test Questions
		getQuestionWithAnswers: builder.query<{ data: QuestionInterface }, number>({
			query: questionId => `questions/${questionId}?populate=answers`
			// providesTags: () => [{ type: 'Question' }]
		}),
		//Create Question
		createQuestion: builder.mutation<
			{
				data: QuestionInterface
			},
			CreateQuestionDto
		>({
			query: dto => ({
				url: `questions`,
				method: 'POST',
				body: {
					data: dto
				}
			})
		}),
		//Edit Question
		editQuestion: builder.mutation<
			{
				data: QuestionInterface
			},
			UpdateQuestionDto
		>({
			query: dto => ({
				url: `questions/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Question']
		}),
		//Delete Question
		deleteQuestion: builder.mutation<
			{
				data: QuestionInterface
			},
			number
		>({
			query: questionId => ({
				url: `questions/${questionId}`,
				method: 'DELETE'
			})
			// invalidatesTags: ['Question']
		})
	})
})

export default questionApi