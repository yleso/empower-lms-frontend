import { FC, MouseEvent, useContext, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown, Plus, Trash } from 'tabler-icons-react'
import Page404 from '@/pages/404/404.page'
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import EditableTitle from '@/components/generic/editable-title/editable-title'
import Loader from '@/components/loader/loader'
import { ThemeContext } from '@/context/theme.context'
import { UpdateCourseDto } from '@/types/course/update-course.dto'
import ModuleInterface from '@/types/module/module.interface'
import { BASE_API_URL } from '@/store/api/axios'
import courseApi from '@/store/api/course.api'
import lessonApi from '@/store/api/lesson.api'
import moduleApi from '@/store/api/module.api'
import testApi from '@/store/api/test.api'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import Styles from './course.module.scss'


const CoursePage: FC = () => {
	//Hooks
	//Ui hooks
	const { darkmode } = useContext(ThemeContext)
	const [openedModules, setOpenedModules] = useState<number[]>([])
	const [edit, setEdit] = useState(false)

	//Fetching course id
	const { course_id } = useParams()
	const courseId = Number(course_id) | 0

	//Data fetching
	//Course data
	const {
		data: courseData,
		refetch: refetchCourse,
		isLoading: courseLoading
	} = courseApi.useGetCourseQuery(courseId)
	//Modules data
	const { data: modulesData, refetch: refetchModules } =
		moduleApi.useGetCourseModulesQuery(courseId)
	//End of fetching data

	//Data sorting
	//Course
	const course = courseData?.data
	//Modules
	const modules = modulesData?.data
	//End of sorting data

	//Data mutation functions
	//Course
	//Edit course
	const [editCourseApi] = courseApi.useEditCourseMutation()
	//Delete course
	const [deleteCourseApi] = courseApi.useDeleteCourseMutation()
	//Modules
	//Create module
	const [createModuleApi] = moduleApi.useCreateModuleMutation()
	//Edit module
	const [editModuleApi] = moduleApi.useEditModuleMutation()
	//Delete module
	const [deleteModuleApi] = moduleApi.useDeleteModuleMutation()
	//Lessons
	//Create lesson
	const [createLessonApi] = lessonApi.useCreateLessonMutation()
	//Edit lesson
	const [editLessonApi] = lessonApi.useEditLessonMutation()
	//Delete lesson
	const [deleteLessonApi] = lessonApi.useDeleteLessonMutation()
	//Tests
	//Create test
	const [createTestApi] = testApi.useCreateTestMutation()
	//Edit lesson
	const [editTestApi] = testApi.useEditTestMutation()
	//Delete test
	const [deleteTestApi] = testApi.useDeleteTestMutation()
	//End of data mutation functions

	//Functions
	//Module reopen function
	const handleOpenModule = (
		event: MouseEvent<HTMLDivElement>,
		moduleId: number
	) => {
		const controlButtons = document.querySelectorAll(
			`.${Styles.DeleteButton}, .${Styles.ModuleAdds}`
		)
		const names = document.querySelectorAll(
			`.${Styles.ModuleNameEdit}, .${Styles.ModuleContentName}`
		)

		for (let index = 0; index < controlButtons.length; index++) {
			//@ts-ignore TODO Make types
			if (controlButtons[index].contains(event.target)) {
				return
			}
		}

		if (edit) {
			for (let index = 0; index < names.length; index++) {
				//@ts-ignore TODO Make types
				if (names[index].contains(event.target)) {
					return
				}
			}
		}

		if (openedModules.includes(moduleId)) {
			setOpenedModules(alreadyOpened => {
				return alreadyOpened.filter(
					currentModuleId => currentModuleId !== moduleId
				)
			})
		} else {
			setOpenedModules(alreadyOpened => [...alreadyOpened, moduleId])
		}
	}

	//Handle Functions
	//Course
	//Edit course
	const editCourse = async (data: UpdateCourseDto) => {
		await editCourseApi(data)
	}
	//Delete Course
	const deleteCourse = async () => {
		await deleteCourseApi(courseId)
		window.location.reload()
		//Delete all modules
		modules &&
			modules.forEach(module => {
				deleteModule(module)
			})
	}
	//Modules
	//Edit Modules
	const editModules = async () => {
		if (modules) {
			for (const module of modules) {
				//Module name editing
				const currentModuleName = module.attributes.name
				const newModuleName = moduleNames.current[module.id].outerText

				if (currentModuleName !== newModuleName) {
					await editModule(module.id, newModuleName)
				}

				//Module content editing
				//Lesson names editing
				for (const lesson of module.attributes.lessons.data) {
					const currentLessonName = lesson.attributes.name
					const newLessonName = lessonNames.current[lesson.id].outerText

					if (currentLessonName !== newLessonName) {
						await editLesson(lesson.id, newLessonName)
					}
				}
				//Test names editing
				for (const test of module.attributes.tests.data) {
					const currentTestName = test.attributes.name
					const newTestName = testNames.current[test.id].outerText

					if (currentTestName !== newTestName) {
						await editTest(test.id, newTestName)
					}
				}
			}
		}
	}
	//Create Module
	const createModule = async () => {
		await editModules()
		await createModuleApi({ course: courseId })
		refetchModules()
	}
	//Edit Module
	const editModule = async (id: number, name: string) => {
		await editModuleApi({
			id,
			name
		})
	}
	//Delete Module
	const deleteModule = async (module: ModuleInterface) => {
		await editModules()

		for (const lesson of module.attributes.lessons.data) {
			await deleteLessonApi(lesson.id)
		}
		for (const test of module.attributes.tests.data) {
			await deleteTestApi(test.id)
		}

		await deleteModuleApi(module.id)

		refetchModules()
	}
	//Lessons
	//Create Lesson
	const createLesson = async (moduleId: number) => {
		await editModules()
		await createLessonApi({ module: moduleId })
		refetchModules()
	}
	//Edit Lesson
	const editLesson = async (id: number, name: string) => {
		await editLessonApi({
			id,
			name
		})
	}
	//Delete Lesson
	const deleteLesson = async (lessonId: number) => {
		await editModules()
		await deleteLessonApi(lessonId)
			.then(() => refetchModules())
			.catch(error => console.log(error))
		refetchModules()
	}
	//Tests
	//Create Test
	const createTest = async (moduleId: number) => {
		await editModules()
		await createTestApi({ module: moduleId })
		refetchModules()
	}
	//Edit Lesson
	const editTest = async (id: number, name: string) => {
		await editTestApi({
			id,
			name
		})
	}
	//Delete Test
	const deleteTest = async (testId: number) => {
		await editModules()
		await deleteTestApi(testId)
		refetchModules()
	}

	//Api functions
	//Refs
	const courseName = useRef<HTMLDivElement>(null)
	const courseDescription = useRef<HTMLParagraphElement>(null)
	const moduleNames = useRef<HTMLHeadingElement[]>([])
	const lessonNames = useRef<HTMLElement[]>([])
	const testNames = useRef<HTMLElement[]>([])

	//Toggle edit function
	const toggleEdit = async () => {
		if (!edit) {
			setEdit(true)
			// document.addEventListener('keydown', preventEdit, true)
			return
		}
		//Remove event listeners
		// document.removeEventListener('keydown', preventEdit, true)

		setEdit(false)

		//Course
		//Course refs
		let currentCourseTitle
		let currentCourseDescription
		//Course checking
		if (courseName.current && courseDescription.current) {
			currentCourseTitle = courseName.current.outerText
			currentCourseDescription = courseDescription.current.outerText
		}
		//Course editing
		if (
			currentCourseTitle !== course?.attributes.name ||
			currentCourseDescription !== course?.attributes.description
		) {
			await editCourse({
				id: courseId,
				name: currentCourseTitle,
				description: currentCourseDescription
			}).then(() => refetchCourse())
		}

		//Edit modules
		await editModules().then(() => refetchModules())
	}
	//End of toggle editing function

	// const preventEdit = useCallback(
	// 	(event: KeyboardEvent) => {
	// 		//Escape button check
	// 		if (event.key !== 'Escape') return
	// 		//Function
	// 		setEdit(false)
	// 	},
	// 	[edit]
	// )

	//End of Function

	//LEARNING PART
	//SOON //TODO Create learning functions
	//END OF LEARNING PART

	//Exception Handling
	if (courseLoading) return <Loader />
	if (!course && !courseLoading) return <Page404 />

	return (
		<>
			<section className={`${Styles.Section} ${darkmode && Styles.CourseDark}`}>
				<div className={Styles.Header}>
					<div className={Styles.CourseEdit}>
						<div className={Styles.CourseMainInfo}>
							{edit && (
								<button
									className={Styles.DeleteCourseButton}
									type={'button'}
									onClick={deleteCourse}
								>
									<Trash height={16} />
								</button>
							)}
							<EditableTitle
								text={course?.attributes.name}
								editState={edit}
								reference={courseName}
							/>
							{/*</div>*/}
							<div className={Styles.CourseIcons}>
								{course &&
									course.attributes.icons.data !== null &&
									course?.attributes.icons.data.map(icon => (
										<img
											key={icon.id}
											src={`${BASE_API_URL}${icon.attributes.url}`}
											alt={icon.attributes.name}
										/>
									))}
								{edit && (
									<button className={Styles.IconsAdd}>
										<Plus size={18} strokeWidth={3} />
									</button>
								)}
							</div>
						</div>
						<EditButton editing={edit} toggleEdit={toggleEdit} />
					</div>
					<p
						className={Text.Body1Regular}
						contentEditable={edit}
						suppressContentEditableWarning={true}
						spellCheck={false}
						ref={courseDescription}
					>
						{course?.attributes.description}
					</p>
				</div>
				<div className={Styles.ModulesGrid}>
					{/*Modules*/}
					{modules &&
						modules.map(module => (
							<div
								key={module.id}
								className={`${Styles.Module} ${
									openedModules.includes(module.id) && Styles.ModuleOpened
								}`}
								onClick={event => handleOpenModule(event, module.id)}
							>
								<div className={Styles.ModuleHeader}>
									<h3
										key={module.id}
										className={`${Text.H6Bold} ${
											edit && Styles.ModuleNameEdit
										}`}
										contentEditable={edit}
										suppressContentEditableWarning={true}
										spellCheck={false}
										ref={moduleName =>
											(moduleNames.current[module.id] =
												moduleName as HTMLHeadingElement)
										}
									>
										{module.attributes.name}
									</h3>
									<div className={Styles.ModuleControls}>
										<ChevronDown
											className={Styles.ControlsChevron}
											width={24}
											color={Vars['brand-main-color']}
										/>
										{edit && (
											<button
												className={Styles.DeleteButton}
												type={'button'}
												onClick={() => deleteModule(module)}
											>
												<Trash height={16} />
											</button>
										)}
									</div>
								</div>
								<div className={`${Text.Body1Regular} ${Styles.ModuleContent}`}>
									{module.attributes.lessons.data.map(lesson => (
										<div key={lesson.id} className={Styles.ModuleSection}>
											<Link
												className={`${Styles.ModuleContentName} ${
													edit && Styles.ModuleContentNameEdit
												} ${Text.H6Regular}`}
												to={`./lesson/${lesson.id}`}
												onClick={
													edit ? event => event.preventDefault() : () => {}
												}
												contentEditable={edit}
												suppressContentEditableWarning={true}
												spellCheck={false}
												ref={lessonName =>
													(lessonNames.current[lesson.id] =
														lessonName as HTMLElement)
												}
											>
												{lesson.attributes.name}
											</Link>
											{edit && (
												<button
													className={Styles.DeleteButton}
													type={'button'}
													onClick={() => deleteLesson(lesson.id)}
												>
													<Trash height={16} />
												</button>
											)}
										</div>
									))}
									{module.attributes.tests.data.map(test => (
										<div key={test.id} className={Styles.ModuleSection}>
											<Link
												className={`${Styles.ModuleContentName} ${
													edit && Styles.ModuleContentNameEdit
												} ${Text.H6Regular}`}
												to={`./test/${test.id}`}
												onClick={
													edit ? event => event.preventDefault() : () => {}
												}
												contentEditable={edit}
												suppressContentEditableWarning={true}
												spellCheck={false}
												ref={lessonName =>
													(testNames.current[test.id] =
														lessonName as HTMLElement)
												}
											>
												{test.attributes.name}
											</Link>
											{edit && (
												<button
													className={Styles.DeleteButton}
													type={'button'}
													onClick={() => deleteTest(test.id)}
												>
													<Trash height={16} />
												</button>
											)}
										</div>
									))}
									{edit && (
										<div className={Styles.ModuleAdds}>
											<button
												className={Text.Body1Regular}
												onClick={() => createLesson(module.id)}
											>
												Add lesson<span>&nbsp;+</span>
											</button>
											<button
												className={Text.Body1Regular}
												onClick={() => createTest(module.id)}
											>
												Add test<span>&nbsp;+</span>
											</button>
										</div>
									)}
								</div>
							</div>
						))}

					{/*Add module*/}
					{edit && (
						<div
							className={`${Styles.Module} ${Styles.ModuleCreate}`}
							onClick={createModule}
						>
							<h6 className={`${Text.H6Bold}`}>
								Add module
								<span>&nbsp;+</span>
							</h6>
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default CoursePage