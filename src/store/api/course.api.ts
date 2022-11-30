import Course from '@/components/course/course'
import CourseInterface from '@/types/course/course.interface'
import { CreateCourseDto } from '@/types/course/create-course.dto'
import { UpdateCourseDto } from '@/types/course/update-course.dto'
import api from './api'


const courseApi = api.injectEndpoints({
	endpoints: builder => ({
		//Get All Courses
		getAllCourses: builder.query<{ data: Array<CourseInterface> }, null>({
			query: () => `courses`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Get Course
		getCourse: builder.query<{ data: CourseInterface }, number>({
			query: courseId => `courses/${courseId}?populate=icons`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Get Team Courses
		getTeamCourses: builder.query<
			{
				data: CourseInterface[]
			},
			number
		>({
			query: teamId => `courses?filters[team]=${teamId}&populate=icons`,
			providesTags: () => [{ type: 'Course' }]
		}),
		//Create New Course
		createCourse: builder.mutation<
			{
				data: CourseInterface
			},
			CreateCourseDto | null
		>({
			query: dto => ({
				url: 'courses/',
				method: 'POST',
				body: {
					data: dto
				}
			}),
			invalidatesTags: ['Course']
		}),
		//Delete Course
		deleteCourse: builder.mutation<{ data: CourseInterface }, number>({
			query: courseId => ({
				url: `courses/${courseId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Course']
		}),
		//Edit Course
		editCourse: builder.mutation<{ data: CourseInterface }, UpdateCourseDto>({
			query: dto => ({
				url: `courses/${dto.id}`,
				method: 'PUT',
				body: {
					data: { ...dto }
				}
			})
		})
	})
})

export default courseApi