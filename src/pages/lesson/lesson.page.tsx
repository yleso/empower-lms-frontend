import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Page404 from '@/pages/404/404.page';
import Button from '@/generic/buttons/primary-button/button';
import BackButton from '@/components/back-button/back-button';
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button';
import LargeDeleteButton from '@/components/generic/buttons/delete-buttons/large-delete-button/large-delete-button';
import EditableTitle from '@/components/generic/editable-title/editable-title';
import LessonEditor from '@/components/lesson-editor/lesson-editor';
import Loader from '@/components/loader/loader';
import { ThemeContext } from '@/context/theme.context'
import { useAuth } from '@/hooks/useAuth.hook'
import lessonApi from '@/store/api/lesson.api';
import userProgressApi from '@/store/api/user-progress.api';
import Styles from './lesson.module.scss';


const LessonPage: FC = () => {
	//Hooks
	const [edit, setEdit] = useState(false)
	const { darkmode } = useContext(ThemeContext)
	const { course_id, lesson_id } = useParams()
	const lessonId = Number(lesson_id) || 0
	const location = useLocation()
	const navigate = useNavigate()

	//Api functions
	const {
		data: lessonData,
		refetch: refetchLesson,
		isLoading,
		isFetching
	} = lessonApi.useGetLessonQuery(lessonId)
	const [editLessonApi] = lessonApi.useEditLessonMutation()
	const [deleteLessonApi] = lessonApi.useDeleteLessonMutation()
	const lesson = lessonData?.data

	const lessonNameRef = useRef<HTMLHeadingElement>(null)

	const deleteLesson = async () => {
		await deleteLessonApi(lessonId).then(() => history.back())
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
			currentLessonName !== lesson?.attributes.name ||
			currentLessonContent !== lesson?.attributes.content
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
		setLessonContent(lesson?.attributes.content)
	}, [isFetching])

	//LEARNING PART
	//Check if user is on the learning page
	const isLearningPage = location.pathname.startsWith('/my-learning')
	//Hooks
	const { user } = useAuth()
	//Get current progress from api
	const { data: progressData } =
		userProgressApi.useGetProgressByCourseAndUserQuery({
			userId: user?.id || 0,
			courseId: Number(course_id)
		})
	//Get current progress from data
	const progress = progressData?.data[0]
	///Edit progress api function
	const [editUserProgressApi] = userProgressApi.useEditUserProgressMutation()
	//Array with all already passed user lessons from this course
	//Get function
	const getUserPassedLessons = () => {
		//Empty array
		let passedLessons: number[] = []
		//Algorithm
		if (progress) {
			for (const lesson of progress.attributes.lessons.data) {
				passedLessons.push(lesson.id)
			}
		}

		return passedLessons
	}
	//Array with ids
	const userPassedLessonsIds = getUserPassedLessons()
	//Make lesson passed
	const markLessonAsRead = async () => {
		//Edit user progress
		await editUserProgressApi({
			id: progress?.id || 0,
			lessons: [...userPassedLessonsIds, lessonId]
		}).then(() => {
			//Navigate back to the course page
			navigate(`/my-learning/course/${course_id}`)
		})
	}

	//END OF LEARNING PART

	if (isLoading || isFetching) return <Loader />
	if (!lesson) return <Page404 />

	return (
		<>
			<section className={Styles.Section}>
				<BackButton whereToText={'the course'} whereToLink={'/course'} />
				<div className={Styles.Header}>
					<div className={Styles.HeaderLeft}>
						{edit && <LargeDeleteButton deleteFunction={deleteLesson} />}
						<EditableTitle
							text={lesson?.attributes.name}
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
						<LessonEditor //TODO Make content normal view
							content={lessonContent}
							setContent={setLessonContent}
						/>
					)}
				</div>
				{isLearningPage && (
					<div className={Styles.NextButton}>
						<Button
							text={'Next topic'}
							clickFunction={markLessonAsRead}
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