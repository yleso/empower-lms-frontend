import { CreateLessonDto } from '@/types/lesson/create-lesson.dto'
import { LessonInterface } from '@/types/lesson/lesson.interface'
import { UpdateLessonDto } from '@/types/lesson/update-lesson.dto'
import api from '@/store/api/api'


const lessonApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Course
		getLesson: builder.query<{ data: LessonInterface }, number>({
			query: courseId => `lessons/${courseId}`,
			providesTags: () => [{ type: 'Lesson' }]
		}),
		//Create Lesson
		createLesson: builder.mutation<
			{
				data: LessonInterface
			},
			CreateLessonDto
		>({
			query: dto => ({
				url: 'lessons/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Lesson']
		}),
		//Delete Lesson
		deleteLesson: builder.mutation<
			{
				data: LessonInterface
			},
			number
		>({
			query: lessonId => ({
				url: `lessons/${lessonId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Lesson']
		}),
		//Edit Lesson
		editLesson: builder.mutation<
			{
				data: LessonInterface
			},
			UpdateLessonDto
		>({
			query: dto => ({
				url: `lessons/${dto.id}`,
				method: 'PUT',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Lesson']
		})
	})
})

export default lessonApi