import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ErrorPage from '@/pages/error/error.page'
import Button from '@/generic/buttons/primary-button/button'
import BackButton from '@/components/back-button/back-button'
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import LargeDeleteButton from '@/components/generic/buttons/delete-buttons/large-delete-button/large-delete-button'
import EditableTitle from '@/components/generic/editable-title/editable-title'
import LessonEditor from '@/components/lesson-editor/lesson-editor'
import Loader from '@/components/loader/loader'
import { useTheme } from '@/hooks/useTheme.hook'
import courseApi from '@/store/api/course.api'
import lessonApi from '@/store/api/lesson.api'
import Styles from './lesson.module.scss'


const LessonPage: FC = () => {
	//Hooks
	const [edit, setEdit] = useState(false)
	const { darkmode } = useTheme()
	const { course_id, lesson_id } = useParams()
	const lessonId = Number(lesson_id) || 0
	const courseId = Number(course_id) || 0
	const { pathname } = useLocation()
	const navigate = useNavigate()

	//Api functions
	const {
		data: lesson,
		refetch: refetchLesson,
		isLoading,
		isFetching
	} = lessonApi.useGetLessonQuery(lessonId)
	const [editLessonApi] = lessonApi.useEditLessonMutation()
	const [deleteLessonApi] = lessonApi.useDeleteLessonMutation()

	const lessonNameRef = useRef<HTMLHeadingElement>(null)

	const deleteLesson = async () => {
		await deleteLessonApi(lessonId).then(() =>
			navigate(`/my-learning/course/${courseId}`)
		)
	}

	const toggleEdit = async () => {
		if (!edit) return setEdit(true)
		setEdit(false)

		//Lesson refs
		let currentLessonName
		let currentLessonContent = lessonContent
		//Lesson name checking
		if (lessonNameRef.current) {
			currentLessonName = lessonNameRef.current.outerText
		}

		//Lesson editing
		if (
			currentLessonName !== lesson?.name ||
			currentLessonContent !== lesson?.content
		) {
			await editLessonApi({
				id: lessonId,
				name: currentLessonName,
				content: currentLessonContent
			}).then(() => refetchLesson())
		}
	}

	const [lessonContent, setLessonContent] = useState<string>('')

	useEffect(() => {
		setLessonContent(lesson?.content || '')
	}, [isFetching])

	//LEARNING PART
	//Check if user is on the learning page
	const isLearningPage = pathname.startsWith('/my-learning')
	//Hooks
	//Get current progress from api
	const { data: progress } = courseApi.useGetCourseProgressQuery(courseId)
	///Edit progress api function
	const [passLessonApi] = lessonApi.usePassLessonMutation()
	//Array with all already passed user lessons from this course
	const userPassedLessonsIds = useMemo(() => {
		//Empty array
		let passedLessons: number[] = []
		//Algorithm
		if (progress) {
			for (const lesson of progress.passed_lessons) {
				passedLessons.push(lesson.id)
			}
		}

		return passedLessons
	}, [])
	//Make lesson passed
	const passLesson = async () => {
		//Edit user progress
		await passLessonApi(lessonId).then(() => {
			//Navigate back to the course page
			navigate(`/my-learning/course/${courseId}`)
		})
	}

	//END OF LEARNING PART

	if (isLoading) return <Loader />
	if (!lesson) return <ErrorPage error={404} />

	return (
		<>
			<section className={Styles.Section}>
				<BackButton whereToText={'the course'} whereToLink={'/course'} />
				<div className={Styles.Header}>
					<div className={Styles.HeaderLeft}>
						{edit && <LargeDeleteButton deleteFunction={deleteLesson} />}
						<EditableTitle
							text={lesson?.name}
							editState={edit}
							reference={lessonNameRef}
						/>
					</div>
					{!isLearningPage && (
						<EditButton editing={edit} toggleEdit={toggleEdit} />
					)}
				</div>
				<div className={`${Styles.Lesson} ${darkmode && Styles.LessonDark}`}>
					{!edit ? (
						<div
							id={'LessonTextEditor'}
							dangerouslySetInnerHTML={{ __html: lessonContent }}
						/>
					) : (
						<LessonEditor
							content={lessonContent}
							setContent={setLessonContent}
						/>
					)}
				</div>
				{isLearningPage && (
					<div className={Styles.NextButton}>
						<Button
							text={'Next topic'}
							clickFunction={passLesson}
							fill
							small
							disabled={userPassedLessonsIds.includes(lessonId)}
						/>
					</div>
				)}
			</section>
		</>
	)
}

export default LessonPage