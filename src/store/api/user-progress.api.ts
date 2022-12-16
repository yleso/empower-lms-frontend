import { QuestionInterface } from '@/types/question/question.interface'
import { CreateUserProgressDto } from '@/types/user-progress/create-user-progress.dto'
import { FullUserProgressInterface } from '@/types/user-progress/full-user-progress.interface'
import { GetUserProgressDto } from '@/types/user-progress/get-user-progress.dto'
import { UpdateUserProgressDto } from '@/types/user-progress/update-user-progress.dto'
import { UserCoursesProgressInterface } from '@/types/user-progress/user-courses-progress.interface'
import { UserProgressInterface } from '@/types/user-progress/user-progress.interface'
import api from '@/store/api/api'


const useProgressApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get team
		getProgressByCourseAndUser: builder.query<
			{
				data: FullUserProgressInterface[]
			},
			GetUserProgressDto
		>({
			query: ({ courseId, userId }) =>
				`user-progresses?filters[course]=${courseId}&filters[users_permissions_user]=${userId}&populate=modules,lessons,tests,questions`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Get user assigned courses
		getUserProgressesCourses: builder.query<
			{
				data: UserCoursesProgressInterface[]
			},
			number
		>({
			query: userId =>
				`user-progresses?filters[users_permissions_user]=${userId}&populate=course`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Get passed test questions
		//
		getPassedTestQuestions: builder.query<
			{
				data: QuestionInterface[]
			},
			{ testId: number; progressId: number }
		>({
			query: ({ testId, progressId }) =>
				`questions?filters[test]=${testId}&filters[user_progresses]=${progressId}`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Get user assigned courses
		getUserFullProgresses: builder.query<
			{
				data: UserCoursesProgressInterface[]
			},
			number
		>({
			query: userId =>
				`user-progresses?filters[users_permissions_user]=${userId}&populate=course,modules,lessons,tests,questions`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Create user progress
		createUserProgress: builder.mutation<
			{
				data: UserProgressInterface
			},
			CreateUserProgressDto
		>({
			query: dto => ({
				url: 'user-progresses/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['User Progress']
		}),
		//Edit user progress
		editUserProgress: builder.mutation<
			{
				data: UserProgressInterface
			},
			UpdateUserProgressDto
		>({
			query: dto => ({
				url: `user-progresses/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['User Progress']
		})
	})
})

export default useProgressApi