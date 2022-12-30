import React, { FC, MouseEvent, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Check, ChevronDown, Plus, Trash } from 'tabler-icons-react'
import ErrorPage from '@/pages/error/error.page'
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import EditableTitle from '@/components/generic/editable-title/editable-title'
import Loader from '@/components/loader/loader'
import { UpdateCourseDto } from '@/types/course/update-course.dto'
import { ModuleInterface } from '@/types/module/module.interface'
import { useTheme } from '@/hooks/useTheme.hook'
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
	const { darkmode } = useTheme()
	const [openedModules, setOpenedModules] = useState<number[]>([])
	const [edit, setEdit] = useState(false)
	const location = useLocation()

	//Fetching course id
	const { course_id } = useParams()
	const courseId = Number(course_id) || 0

	//Data fetching
	//Course data
	const {
		data: course,
		refetch: refetchCourse,
		isLoading: courseLoading
	} = courseApi.useGetCourseQuery(courseId)
	//Modules data
	const { data: modules, refetch: refetchModules } =
		moduleApi.useGetCourseModulesQuery(courseId)
	//End of fetching data

	//Data mutation functions
	//Course
	//Edit course
	const [editCourseApi] = courseApi.useEditCourseMutation()
	//Delete course
	const [deleteCourseApi] = courseApi.useDeleteCourseMutation()
	//Add icon
	const [addIconApi] = courseApi.useAddCourseIconMutation()
	//Delete icon
	const [deleteIconApi] = courseApi.useDeleteCourseIconMutation()
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

		for (const controlButton of controlButtons) {
			//@ts-ignore
			if (controlButton.contains(event.target)) {
				return
			}
		}

		if (edit) {
			for (const name of names) {
				//@ts-ignore
				if (name.contains(event.target)) {
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
	}
	//Modules
	//Edit Modules
	const editModules = async () => {
		if (modules) {
			for (const module of modules) {
				//Module name editing
				const currentModuleName = module.name
				const newModuleName = moduleNames.current[module.id].outerText

				if (currentModuleName !== newModuleName) {
					await editModule(module.id, newModuleName)
				}

				//Module content editing
				//Lesson names editing
				for (const lesson of module.lessons) {
					const currentLessonName = lesson.name
					const newLessonName = lessonNames.current[lesson.id].outerText

					if (currentLessonName !== newLessonName) {
						await editLesson(lesson.id, newLessonName)
					}
				}
				//Test names editing
				for (const test of module.tests) {
					const currentTestName = test.name
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

		for (const lesson of module.lessons) {
			await deleteLessonApi(lesson.id)
		}
		for (const test of module.tests) {
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
	const uploadIconFormRef = useRef<HTMLFormElement>(null)

	//Toggle edit function
	const toggleEdit = async () => {
		if (!edit) {
			setEdit(true)
			return
		}

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
			currentCourseTitle !== course?.name ||
			currentCourseDescription !== course?.description
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

	//Add icon function
	const addIcon = async () => {
		//@ts-ignore
		await addIconApi({ id: courseId, form: uploadIconFormRef.current })
	}

	const deleteIcon = async (iconUrl: string) => {
		await deleteIconApi({ id: courseId, iconUrl })
	}

	//End of Function

	//LEARNING PART
	//Check is it learning page
	const isLearningPage = location.pathname.startsWith('/my-learning')

	//Api functions
	const { data: progress } = courseApi.useGetCourseProgressQuery(courseId)

	//Passed course content arrays
	//Array of passed modules ids
	//Passed modules ids
	const passedModulesIds = useMemo(() => {
		//Empty array
		let passedModules: number[] = []

		//Algorithm to add each module id to array
		if (progress) {
			for (const module of progress.passed_modules) {
				passedModules.push(module.id)
			}
		}

		return passedModules
	}, [progress])
	//Array of passed lessons ids
	//Passed lessons ids
	const passedLessons = useMemo(() => {
		//Empty array
		let passedLessons: number[] = []

		//Algorithm to add each lesson ыid to array
		if (progress) {
			for (const lesson of progress.passed_lessons) {
				passedLessons.push(lesson.id)
			}
		}

		return passedLessons
	}, [progress])
	//Passed tests ids
	const passedTests = useMemo(() => {
		//Empty array
		let passedTests: number[] = []

		//Algorithm to add each test ыid to array
		if (progress) {
			for (const test of progress.passed_tests) {
				passedTests.push(test.id)
			}
		}

		return passedTests
	}, [progress])

	//END OF LEARNING PART

	//Exception Handling
	if (courseLoading) return <Loader />
	if (!course) return <ErrorPage error={404} />
	if (isLearningPage && !progress) return <ErrorPage error={404} />

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
								text={course?.name}
								editState={edit}
								reference={courseName}
							/>
							<div className={Styles.CourseIcons}>
								{course.icons_urls.map(icon => (
									<img
										style={{
											cursor: edit ? 'pointer' : 'auto'
										}}
										onClick={edit ? () => deleteIcon(icon) : () => {}}
										key={icon}
										src={`${BASE_API_URL}${icon}`}
										alt={icon}
									/>
								))}
								{edit && (
									<form ref={uploadIconFormRef}>
										<input
											style={{ display: 'none' }}
											type={'file'}
											name={'icon'}
											id={'icon'}
											onChange={addIcon}
										/>
										<label htmlFor={'icon'} className={Styles.IconsAdd}>
											<Plus size={18} strokeWidth={3} />
										</label>
									</form>
								)}
							</div>
						</div>
						{!isLearningPage && (
							<EditButton editing={edit} toggleEdit={toggleEdit} />
						)}
					</div>
					<p
						className={Text.Body1Regular}
						contentEditable={edit}
						suppressContentEditableWarning={true}
						spellCheck={false}
						ref={courseDescription}
					>
						{course?.description}
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
								{isLearningPage && passedModulesIds.includes(module.id) && (
									<div className={Styles.ModulePassed} />
								)}
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
										{module.name}
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
									{module.lessons.map(lesson => (
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
												{lesson.name}
												{isLearningPage &&
													passedLessons.includes(lesson.id) && (
														<Check
															size={16}
															color={Vars['system-green-color']}
														/>
													)}
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
									{module.tests.map(test => (
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
												{test.name}
												{isLearningPage && passedTests.includes(test.id) && (
													<Check size={16} color={Vars['system-green-color']} />
												)}
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