import { CreateLessonDto } from '@/types/lesson/create-lesson.dto'
import { LessonInterface } from '@/types/lesson/lesson.interface'
import { UpdateLessonDto } from '@/types/lesson/update-lesson.dto'
import api from '@/store/api/api'


const lessonApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get Course
		getLesson: builder.query<LessonInterface, number>({
			query: courseId => `lessons/${courseId}`,
			providesTags: () => [{ type: 'Lesson' }]
		}),
		//Create Lesson
		createLesson: builder.mutation<LessonInterface, CreateLessonDto>({
			query: dto => ({
				url: 'lessons/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['Lesson']
		}),
		//Delete Lesson
		deleteLesson: builder.mutation<LessonInterface, number>({
			query: lessonId => ({
				url: `lessons/${lessonId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Lesson']
		}),
		//Edit Lesson
		editLesson: builder.mutation<LessonInterface, UpdateLessonDto>({
			query: dto => ({
				url: `lessons/${dto.id}`,
				method: 'PATCH',
				body: dto
			}),
			invalidatesTags: ['Lesson']
		}),
		//Pass lesson
		passLesson: builder.mutation<null, number>({
			query: lessonId => ({
				url: `lessons/pass/${lessonId}`,
				method: 'POST'
			}),
			invalidatesTags: ['User Progress']
		})
	})
})

export default lessonApi