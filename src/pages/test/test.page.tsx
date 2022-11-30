import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
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
import question from '@/components/question/question'
import {
	AnswerInterface,
	QuestionInterface
} from '@/components/question/question.interface'
import Radio from '@/components/radio/radio'
import { ThemeContext } from '@/context/theme.context'
import { QuestionInterface as QuestionDataInterface } from '@/types/question/question.interface'
import useOutside from '@/hooks/useOutside.hook'
import questionApi from '@/store/api/question.api'
import testApi from '@/store/api/test.api'
import Text from '@/styles/text.module.scss'
import Styles from './test.module.scss'


const TestPage: FC = () => {
	//Team id
	const { test_id } = useParams()
	const testId = Number(test_id) || 0

	//Hooks
	//Ui hooks
	const { darkmode } = useContext(ThemeContext)
	const { isShow, setIsShow, ref } = useOutside(false)

	//Queries
	//Get test data query
	const {
		data: testData,
		isLoading: testLoading,
		refetch: refetchTest
	} = testApi.useGetTestQuery(testId)
	//Get questions data query
	const {
		data: questionsData,
		isLoading: questionsLoading,
		isFetching: questionsFetching,
		refetch: refetchQuestions
	} = questionApi.useGetTestQuestionsQuery(testId)

	//Mutations
	//Test
	//Edit test mutation
	const [editTestApi] = testApi.useEditTestMutation()
	//Delete test mutation
	const [deleteTestApi] = testApi.useDeleteTestMutation()
	//Questions
	//Create question
	const [createQuestionApi] = questionApi.useCreateQuestionMutation()
	//Edit question
	const [editQuestionApi] = questionApi.useEditQuestionMutation()

	//Data sorting
	//Test
	const test = testData?.data
	//Questions
	const [questions, setQuestions] = useState<QuestionDataInterface[]>([])
	useEffect(() => {
		if (questionsData?.data) setQuestions(questionsData.data)
	}, [questionsFetching])
	//End of sorting data

	//Edit state
	const [edit, setEdit] = useState(false)

	//Refs
	//Test name ref
	const testNameRef = useRef<HTMLHeadingElement>(null)

	//Functions
	//Test functions
	//Delete test
	//TODO Make this function with hook to do not send new request
	const deleteTest = async () => {
		deleteTestApi(testId)
	}
	//Questions functions
	//Create question
	const createQuestion = async (
		questionType: 'input' | 'radio' | 'checkbox',
		name?: string
	) => {
		setIsShow(false)

		const order = questions ? questions.length + 1 : 1

		const questionData = {
			name,
			test: testId,
			type: questionType,
			order
		}

		await createQuestionApi(questionData)
	}
	//Change order
	const changeOrder = async (questionId: number, increase: boolean) => {
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
		if (questions && newOrder > questions.length) return

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
	}

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
		//@ts-ignore
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
			//@ts-ignore
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
	//SOON //TODO Create learning functions
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
					<EditButton editing={edit} toggleEdit={toggleEdit} />
				</div>
				{questions &&
					questions.map(question => (
						<article
							style={{ order: question.attributes.order }}
							key={question.id}
						>
							<Question
								changeOrderFunction={changeOrder}
								editing={edit}
								question={getQuestion(question.id)}
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