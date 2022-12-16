import React, {
	FC,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
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
import { ThemeContext } from '@/context/theme.context'
import { QuestionInterface as QuestionDataInterface } from '@/types/question/question.interface'
import { useAuth } from '@/hooks/useAuth.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import answerApi from '@/store/api/answer.api'
import questionApi from '@/store/api/question.api'
import testApi from '@/store/api/test.api'
import userProgressApi from '@/store/api/user-progress.api'
import Text from '@/styles/text.module.scss'
import Styles from './test.module.scss'


const TestPage: FC = () => {
	//Team id
	const { course_id, test_id } = useParams()
	const testId = Number(test_id) || 0

	//Hooks
	const { darkmode } = useContext(ThemeContext)
	const { isShow, setIsShow, ref } = useOutside(false)
	const location = useLocation()

	//Queries
	//Get test data query
	const {
		data: testData,
		isLoading: testLoading,
		refetch: refetchTest
	} = testApi.useGetTestQuery(testId)
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
	//Edit question
	const [editQuestionApi] = questionApi.useEditQuestionMutation()
	//Create answer api
	const [createAnswerApi] = answerApi.useCreateAnswerMutation()

	//Data sorting
	//Test
	const test = testData?.data
	//Questions
	const [questions, setQuestions] = useState<QuestionDataInterface[]>([])
	//Set question list on getting data
	useEffect(() => {
		if (questionsData?.data) setQuestions(questionsData.data)
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

			const order = questions.length + 1

			const questionData = {
				name,
				test: testId,
				type: questionType,
				order
			}

			//Check if new question type is text answer and do specific actions
			if (questionType === 'input') {
				await createQuestionApi(questionData).then(async response => {
					//Get new question from response
					//@ts-ignore
					const newQuestion = response.data.data
					//Create new empty answer
					await createAnswerApi({ question: newQuestion.id }).then(response => {
						//Get new question from response
						//@ts-ignore
						const answer = response.data.data
						//Format new question object and add answer to it
						const newQuestionWithAnswer = {
							id: newQuestion.id,
							attributes: {
								...newQuestion.attributes,
								answers: {
									data: [answer]
								}
							}
						}
						//Add new question to questions list
						setQuestions(currentQuestionsList => {
							return [...currentQuestionsList, newQuestionWithAnswer]
						})
					})
				})

				return
			}

			await createQuestionApi(questionData).then(response => {
				//Get new question from response
				//@ts-ignore
				const newQuestion = response.data.data
				//Add new question to questions list
				setQuestions(currentQuestionsList => {
					return [
						...currentQuestionsList,
						{
							id: newQuestion.id,
							attributes: {
								...newQuestion.attributes,
								answers: {
									data: []
								}
							}
						}
					]
				})
			})
		},
		[questions]
	)
	//Delete question
	const deleteQuestion = async (questionId: number) => {
		setQuestions(currentQuestionList => {
			return currentQuestionList.filter(question => question.id !== questionId)
		})

		const questionOrder = questions.filter(
			question => question.id === questionId
		)[0].attributes.order

		const questionsWithBiggerOrder = questions.filter(
			question => question.attributes.order > questionOrder
		)

		await deleteQuestionApi(questionId)

		for (const question of questionsWithBiggerOrder) {
			await editQuestionApi({
				id: question.id,
				order: question.attributes.order - 1
			})
		}
	}

	//Change order
	const changeOrder = useCallback(
		async (questionId: number, increase: boolean) => {
			//@ts-ignore
			const currentQuestion = questions.filter(
				question => question.id === questionId
			)[0]

			//Orders
			const currentOrder: number = currentQuestion.attributes.order
			const newOrder: number = increase ? currentOrder - 1 : currentOrder + 1

			//@ts-ignore
			const previousQuestion = questions.filter(
				question => question.attributes.order === newOrder
			)[0]

			//Check for first and last
			//Check if question is already first in list
			if (newOrder < 1 && increase) return
			//Check if question is already last in list
			if (questions.length < newOrder) return

			//Change question order
			await editQuestionApi({
				id: questionId,
				order: newOrder
			})

			//Change previous question with the same order
			if (previousQuestion) {
				await editQuestionApi({
					id: previousQuestion.id,
					order: currentOrder
				})
			}

			//Reset questions order
			setQuestions(currentQuestionList => {
				//Get not mutable questions
				const notMutable = currentQuestionList.filter(
					question =>
						question.attributes.order !== currentOrder &&
						question.attributes.order !== newOrder
				)

				//Get current question with new order
				const currentSortedQuestion = {
					id: currentQuestion.id,
					attributes: {
						...currentQuestion.attributes,
						order: newOrder
					}
				}

				//Get previous question with current order
				const previousSortedQuestion = {
					id: previousQuestion.id,
					attributes: {
						...previousQuestion.attributes,
						order: currentOrder
					}
				}

				//Return sorted question list
				return [...notMutable, currentSortedQuestion, previousSortedQuestion]
			})
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
		if (currentTestName !== test?.attributes.name) {
			await editTestApi({
				id: testId,
				name: currentTestName
			}).then(() => refetchTest())
		}
	}

	//Getting question from unsorted data
	const getQuestion = (questionId: number): QuestionInterface => {
		const question = questions.filter(question => question.id === questionId)[0]

		let answers: AnswerInterface[] = []

		question.attributes.answers.data.forEach(answer => {
			answers.push({
				id: answer.id,
				name: answer.attributes.name,
				right: answer.attributes.right
			})
		})

		return {
			id: question.id,
			totalQuestions: questions.length,
			order: question.attributes.order,
			type: question.attributes.type,
			name: question.attributes.name,
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
	const { user } = useAuth()
	//Check if user is on the learning page
	const isLearningPage = location.pathname.startsWith('/my-learning')
	//Get current progress from api
	const { data: progressData } =
		userProgressApi.useGetProgressByCourseAndUserQuery({
			userId: user?.id || 0,
			courseId: Number(course_id)
		})
	//Get current progress from data
	const progress = progressData?.data[0]
	//Get passed questions from api
	const { data: userPassedQuestionsData } =
		userProgressApi.useGetPassedTestQuestionsQuery({
			testId,
			progressId: progress?.id || 0
		})
	const userPassedQuestions = userPassedQuestionsData?.data
	//Array with all already passed user tests from this course
	//Get function
	const getUserPassedTests = () => {
		//Empty array
		let passedTests: number[] = []
		//Algorithm
		if (progress) {
			for (const test of progress.attributes.tests.data) {
				passedTests.push(test.id)
			}
		}

		return passedTests
	}
	//Array with ids
	const userPassedTestsIds = getUserPassedTests()
	//Array with all already passed user questions from this course
	//Get function
	const getUserPassedQuestions = () => {
		//Empty array
		let passedTests: number[] = []
		//Algorithm
		if (userPassedQuestions) {
			for (const questions of userPassedQuestions) {
				passedTests.push(questions.id)
			}
		}

		return passedTests
	}
	//Array with ids
	const userPassedQuestionsIds = getUserPassedQuestions()

	//END OF LEARNING PART

	//Return checks
	//Loader
	if (testLoading || questionsLoading) return <Loader />
	//No data case
	if (!test) return <Page404 />

	return (
		<>
			<Popup isOpened={isShow} setIsOpened={setIsShow} popupRef={ref}>
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
							text={test?.attributes.name}
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
						<article
							style={{ order: question.attributes.order }}
							key={question.id}
						>
							<Question
								testId={testId}
								questionTestId={testId}
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