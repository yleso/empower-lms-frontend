import {
	CourseInterface,
	CourseWithTeamInterface
} from '@/types/course/course.interface'
import { CreateCourseDto } from '@/types/course/create-course.dto'
import { UpdateCourseDto } from '@/types/course/update-course.dto'
import { LearningInterface } from '@/types/learning/learning.interface'
import api from './api'


const courseApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get All Courses
		getAllCourses: builder.query<CourseInterface[], null>({
			query: () => `courses`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Get Course
		getCourse: builder.query<CourseInterface, number>({
			query: courseId => `courses/${courseId}`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Get Team Courses
		getTeamCourses: builder.query<CourseInterface[], number>({
			query: teamId => `courses/team/${teamId}`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Create New Course
		createCourse: builder.mutation<CourseInterface, CreateCourseDto | null>({
			query: dto => ({
				url: 'courses/',
				method: 'POST',
				body: dto
			}),
			invalidatesTags: ['Course']
		}),
		//Delete Course
		deleteCourse: builder.mutation<CourseInterface, number>({
			query: courseId => ({
				url: `courses/${courseId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Course']
		}),
		//Edit Course
		editCourse: builder.mutation<CourseInterface, UpdateCourseDto>({
			query: dto => ({
				url: `courses/${dto.id}`,
				method: 'PATCH',
				body: dto
			})
		}),
		//Assign Course
		assignCourse: builder.mutation<CourseInterface, number>({
			query: courseId => ({
				url: `courses/assign/${courseId}`,
				method: 'POST'
			}),
			invalidatesTags: ['User Progress']
		}),
		//Get Course progress
		getCourseProgress: builder.query<LearningInterface, number>({
			query: courseId => `courses/progress/${courseId}`,
			providesTags: () => [{ type: 'User Progress' }]
		}),
		//Add Course Icon
		addCourseIcon: builder.mutation<
			void,
			{ id: number; form: HTMLFormElement }
		>({
			query: ({ id, form }) => ({
				url: `courses/icon/${id}`,
				method: 'POST',
				body: new FormData(form)
			}),
			invalidatesTags: ['Course']
		}),
		//Remove Course Icon
		deleteCourseIcon: builder.mutation<void, { id: number; iconUrl: string }>({
			query: ({ id, iconUrl }) => ({
				url: `courses/icon/${id}`,
				method: 'DELETE',
				body: {
					iconUrl
				}
			}),
			invalidatesTags: ['Course']
		}),
		//Search courses
		searchCourses: builder.mutation<CourseWithTeamInterface[], string>({
			query: query => ({
				url: `courses/search/${query}`,
				method: 'POST'
			}),
			invalidatesTags: ['Search']
		})
	})
})

export default courseApi