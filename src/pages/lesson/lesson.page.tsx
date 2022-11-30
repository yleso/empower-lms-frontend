import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import BackButton from '@/components/back-button/back-button'
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import LargeDeleteButton from '@/components/generic/buttons/delete-buttons/large-delete-button/large-delete-button'
import EditableTitle from '@/components/generic/editable-title/editable-title'
import LessonEditor from '@/components/lesson-editor/lesson-editor'
import Loader from '@/components/loader/loader'
import { ThemeContext } from '@/context/theme.context'
import lessonApi from '@/store/api/lesson.api'
import Styles from './lesson.module.scss'


const LessonPage: FC = () => {
	const [edit, setEdit] = useState(false)
	const { darkmode } = useContext(ThemeContext)

	//Hooks
	const { lesson_id } = useParams()
	const lessonId = Number(lesson_id) || 0

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
	//SOON //TODO Create learning functions
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
					<EditButton editing={edit} toggleEdit={toggleEdit} />
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
			</section>
		</>
	)
}

export default LessonPage