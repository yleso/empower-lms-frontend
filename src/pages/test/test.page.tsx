import React, {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import ErrorPage from '@/pages/error/error.page'
import AddSectionElement from '@/components/add-section-element/add-section-element'
import BackButton from '@/components/back-button/back-button'
import { EditButton } from '@/components/generic/buttons/admin-buttons/big-buttons/admin-button'
import LargeDeleteButton from '@/components/generic/buttons/delete-buttons/large-delete-button/large-delete-button'
import Button from '@/components/generic/buttons/primary-button/button'
import EditableTitle from '@/components/generic/editable-title/editable-title'
import Field from '@/components/generic/field/field'
import Loader from '@/components/loader/loader'
import Popup from '@/components/popup/popup'
import Question from '@/components/question/question'
import {
	AnswerInterface,
	QuestionInterface
} from '@/components/question/question.interface'
import Radio from '@/components/radio/radio'
import { QuestionInterface as QuestionDataInterface } from '@/types/question/question.interface'
import { useOutside } from '@/hooks/useOutside.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import courseApi from '@/store/api/course.api'
import questionApi from '@/store/api/question.api'
import testApi from '@/store/api/test.api'
import Text from '@/styles/text.module.scss'
import Styles from './test.module.scss'


const TestPage: FC = () => {
	//Team id
	const { course_id, test_id } = useParams()
	const courseId = Number(course_id) || 0
	const testId = Number(test_id) || 0

	//Hooks
	const { darkmode } = useTheme()
	const { isShow, setIsShow, ref } = useOutside(false)
	const { pathname } = useLocation()

	//Queries
	//Get test data query
	const { data: test, isLoading: testLoading } = testApi.useGetTestQuery(testId)
	//Get questions data query
	const { data: questionsData, isLoading: questionsLoading } =
		questionApi.useGetTestQuestionsQuery(testId)

	//Mutations
	//Test
	//Edit test mutation
	const [editTestApi] = testApi.useEditTestMutation()
	//Delete test mutation
	const [deleteTestApi] = testApi.useDeleteTestMutation()
	//Questions
	//Create question
	const [createQuestionApi] = questionApi.useCreateQuestionMutation()
	//Delete question
	const [deleteQuestionApi] = questionApi.useDeleteQuestionMutation()
	//Increment question order
	const [incrementQuestionOrderApi] =
		questionApi.useIncrementQuestionOrderMutation()
	//Decrement question order
	const [decrementQuestionOrderApi] =
		questionApi.useDecrementQuestionOrderMutation()

	//Data sorting
	//Questions
	const [questions, setQuestions] = useState<QuestionDataInterface[]>([])
	//Set question list on getting data
	useEffect(() => {
		if (questionsData) setQuestions(questionsData)
	}, [questionsLoading])
	//End of sorting data

	//Edit state
	const [edit, setEdit] = useState(false)

	//Refs
	//Test name ref
	const testNameRef = useRef<HTMLHeadingElement>(null)

	//Functions
	//Test functions
	//Delete test
	const deleteTest = useCallback(async () => {
		deleteTestApi(testId)
	}, [test])
	//Questions functions
	//Create question
	const createQuestion = useCallback(
		async (questionType: 'input' | 'radio' | 'checkbox', name: string) => {
			setIsShow(false)

			const questionData = {
				name,
				test: testId,
				type: questionType
			}

			await createQuestionApi(questionData).then(response => {
				//Get new question from response
				//@ts-ignore
				const newQuestion = response.data
				//Add new question to questions list
				setQuestions(
					//@ts-ignore
					currentQuestionsList => {
						return [...currentQuestionsList, newQuestion]
					}
				)
			})
		},
		[questions]
	)
	//Delete question
	const deleteQuestion = async (questionId: number) => {
		setQuestions(currentQuestionList => {
			return currentQuestionList.filter(question => question.id !== questionId)
		})

		await deleteQuestionApi(questionId)
	}

	//Change order
	const changeOrder = useCallback(
		async (questionId: number, increase: boolean) => {
			//@ts-ignore
			const currentQuestion = questions.filter(
				question => question.id === questionId
			)[0]

			if (!increase) {
				await incrementQuestionOrderApi(currentQuestion.id)
			} else {
				await decrementQuestionOrderApi(currentQuestion.id)
			}

			//Orders
			const currentOrder: number = currentQuestion.order
			const newOrder: number = increase ? currentOrder - 1 : currentOrder + 1

			//@ts-ignore
			const previousQuestion = questions.filter(
				question => question.order === newOrder
			)[0]

			//Check for first and last
			//Check if question is already first in list
			if (newOrder < 1 && increase) return
			//Check if question is already last in list
			if (questions.length < newOrder) return

			const formatedCurrentQuestion = { ...currentQuestion, order: newOrder }
			const formatedPreviousQuestion = {
				...previousQuestion,
				order: currentOrder
			}

			//Reset questions order
			setQuestions(
				//@ts-ignore
				currentQuestionList => {
					//Get not mutable questions
					const notMutable = currentQuestionList.filter(
						question =>
							question.order !== currentOrder && question.order !== newOrder
					)

					//Return sorted question list
					return [
						...notMutable,
						formatedCurrentQuestion,
						formatedPreviousQuestion
					]
				}
			)
		},
		[questions]
	)

	//Toggle edit function
	const toggleEdit = async () => {
		if (!edit) return setEdit(true)
		setEdit(false)

		//Lesson name checking
		let currentTestName
		if (testNameRef.current) {
			currentTestName = testNameRef.current.outerText
		}

		//Lesson editing
		if (currentTestName !== test?.name) {
			await editTestApi({
				id: testId,
				name: currentTestName
			})
		}
	}

	//Getting question from unsorted data
	const getQuestion = (questionId: number): QuestionInterface => {
		const question = questions.filter(question => question.id === questionId)[0]

		let answers: AnswerInterface[] = []

		question.answers.forEach(answer => {
			answers.push({
				id: answer.id,
				name: answer.name,
				right: answer.right
			})
		})

		return {
			...question,
			totalQuestions: questions.length,
			answers
		}
	}

	//For question creating popup
	interface createQuestionFormInterface {
		name: string
		type: 'input' | 'radio' | 'checkbox'
	}

	const { register, handleSubmit } = useForm<createQuestionFormInterface>({
		mode: 'onChange'
	})

	const createQuestionSubmit: SubmitHandler<
		createQuestionFormInterface
	> = async data => {
		await createQuestion(data.type, data.name)
	}

	//LEARNING PART

	//Hooks
	//Check if user is on the learning page
	const isLearningPage = pathname.startsWith('/my-learning')
	//Get current progress from api
	const { data: progress, isFetching: progressFetching } =
		courseApi.useGetCourseProgressQuery(courseId)
	//Get passed questions
	const userPassedQuestions = progress?.passed_questions
	//User passed tests ids
	const userPassedTestsIds = useMemo(() => {
		//Empty array
		let passedTests: number[] = []
		//Algorithm
		if (progress) {
			for (const test of progress.passed_tests) {
				passedTests.push(test.id)
			}
		}

		return passedTests
	}, [progressFetching])
	//Array with all already passed user questions from this course
	//Get function
	const userPassedQuestionsIds = useMemo(() => {
		//Empty array
		let passedTests: number[] = []
		//Algorithm
		if (userPassedQuestions) {
			for (const questions of userPassedQuestions) {
				passedTests.push(questions.id)
			}
		}

		return passedTests
	}, [progressFetching])

	//END OF LEARNING PART

	//Return checks
	//Loader
	if (testLoading || questionsLoading) return <Loader />
	//No data case
	if (!test) return <ErrorPage error={404} />

	return (
		<>
			<Popup isOpened={isShow} setIsOpened={setIsShow} reference={ref}>
				<form
					className={`${Styles.CreateQuestionForm} ${
						darkmode && Styles.CreateQuestionFormDark
					}`}
					onSubmit={handleSubmit(createQuestionSubmit)}
				>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Question name</label>
						<Field
							type={'textarea'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('name')}
							reference={register('name').ref}
						/>
					</div>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Question type</label>
						<Radio
							{...register('type')}
							reference={register('type').ref}
							value={'checkbox'}
							text={'Multiple answer'}
						/>
						<Radio
							{...register('type')}
							reference={register('type').ref}
							value={'radio'}
							text={'Single answer'}
						/>
						<Radio
							{...register('type')}
							reference={register('type').ref}
							value={'input'}
							text={'Text answer'}
						/>
					</div>
					<Button text={'Create question'} fill small submit />
				</form>
			</Popup>
			<section className={Styles.Section}>
				<BackButton whereToText={'the course'} />
				<div className={Styles.Header}>
					<div className={Styles.HeaderLeftSide}>
						{edit && <LargeDeleteButton deleteFunction={deleteTest} />}
						<EditableTitle
							text={test?.name}
							editState={edit}
							reference={testNameRef}
						/>
					</div>
					{!isLearningPage && (
						<EditButton editing={edit} toggleEdit={toggleEdit} />
					)}
				</div>
				{questions &&
					questions.map(question => (
						<article style={{ order: question.order }} key={question.id}>
							<Question
								userProgress={{
									id: progress?.id || 0,
									questions: userPassedQuestionsIds,
									tests: userPassedTestsIds
								}}
								editing={edit}
								question={getQuestion(question.id)}
								changeOrderFunction={changeOrder}
								deleteFunction={deleteQuestion}
							/>
						</article>
					))}

				{edit && (
					<div className={Styles.AddButton}>
						<AddSectionElement
							addFunction={() => setIsShow(true)}
							whatToAdd={'question'}
						/>
					</div>
				)}
			</section>
		</>
	)
}

export default TestPage