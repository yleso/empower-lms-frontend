import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowDown, ArrowUp, Check } from 'tabler-icons-react'
import Field from '@/generic/field/field'
import SmallDeleteButton from '@/components/generic/buttons/delete-buttons/small-delete-button/small-delete-button'
import Button from '@/components/generic/buttons/primary-button/button'
import Divider from '@/components/generic/divider/divider'
import { useTheme } from '@/hooks/useTheme.hook'
import answerApi from '@/store/api/answer.api'
import questionApi from '@/store/api/question.api'
import Text from '@/styles/text.module.scss'
import { AnswerInterface, QuestionEditInterface } from './question.interface'
import Styles from './question.module.scss'


const Question: FC<QuestionEditInterface> = ({
	userProgress,
	question,
	editing,
	changeOrderFunction,
	deleteFunction
}) => {
	//Hooks
	//Ui hooks
	const { darkmode } = useTheme()
	//Hooks to work with api
	//Set question name
	const [questionName, setQuestionName] = useState<string>(question.name)
	//Set answers list
	const [answers, setAnswers] = useState<AnswerInterface[]>(question.answers)
	//Text answer
	const [textAnswer, setTextAnswer] = useState<string>('')
	//Text answer from props
	const [textAnswerFromProps, setTextAnswerFromProps] = useState<string>('')
	//Hook to do not run editing on component mounted
	const [isMounted, setIsMounted] = useState(false)
	//Check for edit
	useEffect(() => {
		//Async function, which can not be basically declared in useEffect hook
		const toggleEdit = async () => {
			//Check if it's turning on
			if (editing) {
				if (question.type === 'input') return

				for (const answer of answers) {
					answersInputsRef.current[answer.id].checked = answer.right
				}

				return
			}

			//Edit everything
			await editEverything()
		}

		//Check if it is first render and set it if not
		if (!isMounted) return setIsMounted(true)

		//Bootstrap async functions
		toggleEdit().then(() => {})
	}, [editing])

	//Text answer input setting on component loaded
	useEffect(() => {
		const textAnswerFunction = () => {
			//Check if question type is not input type
			if (question.type !== 'input') return

			//Check does the questions list contain answer for this question
			if (answers.length !== 0) {
				setTextAnswer(answers[0].name)
				setTextAnswerFromProps(answers[0].name)
			}
		}

		textAnswerFunction()
	}, [])

	//Refs
	//Question name ref
	const questionNameRef = useRef<HTMLHeadingElement>(null)
	//Answers
	//Answer names ref
	const answersNamesRef = useRef<HTMLHeadingElement[]>([])
	//Answer inputs ref
	const answersInputsRef = useRef<HTMLInputElement[]>([])
	//Text answer input ref
	const textAnswerInputRef = useRef<HTMLInputElement>(null)

	//Api Mutations
	//Question
	//Edit question api
	const [editQuestionApi] = questionApi.useEditQuestionMutation()
	//Answers
	//Create answer api
	const [createAnswerApi] = answerApi.useCreateAnswerMutation()
	//Edit answer api
	const [editAnswerApi] = answerApi.useEditAnswerMutation()
	//Delete answer api
	const [deleteAnswerApi] = answerApi.useDeleteAnswerMutation()

	//Functions
	//Api Functions
	const editEverything = async () => {
		//Editing question
		await editQuestion()

		//Editing answers names
		await editAnswers()
	}
	//Question
	//Edit question
	const editQuestion = async () => {
		//Question names to check
		//Old question name
		const oldQuestionName = question.name
		//New question name
		const newQuestionName = questionNameRef.current?.outerText

		//Check question names difference
		if (oldQuestionName !== newQuestionName) {
			//Edit question name
			await editQuestionApi({
				id: question.id,
				name: newQuestionName
			}).then(response => {
				//Get new question name from response
				//@ts-ignore
				const newQuestionName = response.data.name
				//Set new question name to hook
				setQuestionName(newQuestionName)
			})
		}
	}
	//Delete question
	const deleteQuestion = useCallback(async () => {
		for (const answer of answers) {
			await deleteAnswer(answer.id)
		}

		await deleteFunction(question.id)
	}, [answers])
	//Answers
	//Edit answers
	const editAnswers = async () => {
		//Edit text(input) answer
		//Check if it is input type question
		if (question.type === 'input' && !editing) {
			const currentAnswer = answers[0]

			//Answer names to check
			//Old answer name
			const oldAnswerName = textAnswerFromProps
			//New answer name
			const newAnswerName = textAnswer

			//Answer checking
			if (oldAnswerName !== newAnswerName) {
				//Editing answer
				await editAnswerApi({
					id: currentAnswer.id,
					name: newAnswerName
				}).then(() => {
					//Set input value empty after editing
					//Check if current ref exist
					if (textAnswerInputRef.current !== null) {
						//Edit input value
						textAnswerInputRef.current.value = ''
						//Set default name to the new
						setTextAnswerFromProps(newAnswerName)
					}
				})
			}

			return
		}

		//Edit radio and checkbox answers
		for (const answer of answers) {
			//Answer names to check
			//Old answer params
			//Old answer name
			const oldAnswerName = answer.name
			//Old answer right
			const oldAnswerRight = answer.right
			//New answer params
			//New answer name
			const newAnswerName = answersNamesRef.current[answer.id].outerText
			//New answer name
			const newAnswerRight = answersInputsRef.current[answer.id].checked

			//Answer checking
			if (
				oldAnswerName !== newAnswerName ||
				oldAnswerRight !== newAnswerRight
			) {
				//Editing answer
				await editAnswerApi({
					id: answer.id,
					name: newAnswerName,
					right: newAnswerRight
				}).then(response => {
					//Get answer from response
					//@ts-ignore
					const editedAnswer = response.data

					//Update answer list
					setAnswers(currentAnswersList => {
						//Empty answers list
						let newAnswersList: AnswerInterface[] = []

						//Sort answers list
						for (const currentAnswer of currentAnswersList) {
							if (currentAnswer.id !== editedAnswer.id) {
								newAnswersList.push(currentAnswer)
							} else {
								newAnswersList.push(editedAnswer)
							}
						}

						//Return new answers list
						return newAnswersList
					})
				})
			}

			answersInputsRef.current[answer.id].checked = false
		}
	}
	//Create answer
	const createAnswer = async () => {
		await createAnswerApi({ question: question.id }).then(response => {
			//Answer fetched from response
			//@ts-ignore
			const newAnswer = response.data
			//Check if something went wrong
			if (!newAnswer) return
			//Adding answer to answer list
			setAnswers(currentAnswerList => [...currentAnswerList, newAnswer])
		})
	}
	//Delete answer
	const deleteAnswer = async (answerId: number) => {
		await deleteAnswerApi(answerId).then(() => {
			setAnswers(currentAnswerList =>
				currentAnswerList.filter(answer => answerId !== answer.id)
			)
		})
	}

	//Ui functions
	//Get array of total questions amount
	const totalQuestionsAmount = (): number[] => {
		//Empty questions indexes list
		let questionsIndexes: number[] = []
		//Algorithm
		for (
			let index = 1;
			questionsIndexes.length < question.totalQuestions;
			index++
		) {
			questionsIndexes.push(index)
		}

		return questionsIndexes
	}
	//Grow order up
	const growUpOrder = async () => {
		await changeOrderFunction(question.id, true)
	}
	//Grow order down
	const growDownOrder = async () => {
		await changeOrderFunction(question.id, false)
	}

	//LEARNING PART
	//Hooks
	//Is questions answered
	const [answered, setAnswered] = useState(false)
	//Pathname hook
	const { pathname } = useLocation()
	const isLearningPage = pathname.startsWith('/my-learning')
	//Set questions answered or not
	useEffect(() => {
		setAnswered(userProgress.questions.includes(question.id))
	}, [userProgress])
	//Is answer incorrect
	const [answeredIncorrect, setAnsweredIncorrect] = useState(false)
	//Set answer not incorrect if it was answered right
	useEffect(() => {
		if (answered) {
			setAnsweredIncorrect(false)
		}
	}, [answered])
	//Api functions
	const [answerQuestionApi] = questionApi.useAnswerQuestionMutation()
	//For text answer question
	const [textUserAnswer, setTextUserAnswer] = useState<string>('')
	//Answer the question function
	const answerTheQuestion = async () => {
		//Answer text question
		if (question.type === 'input') {
			await answerQuestionApi({
				id: question.id,
				text_answer: textUserAnswer
			})

			return
		}

		//Get right answers ids
		const getRightAnswersIds = () => {
			//Initialize empty array
			let rightAnswersIds: number[] = []

			for (const answer of answers) {
				//Get current anser input
				const input = answersInputsRef.current[answer.id]
				//Check is answer input checked and add it to the ids array
				if (input.checked) rightAnswersIds.push(+answer.id)
			}

			return rightAnswersIds
		}

		//Answer question
		await answerQuestionApi({
			id: question.id,
			right_answers: getRightAnswersIds()
		}).then(response => {
			//Get answer value
			//@ts-ignore
			const isQuestionRight = response.data
			//Check is answer right and edit test state then
			if (isQuestionRight) {
				setAnswered(isQuestionRight)
			} else {
				setAnsweredIncorrect(isQuestionRight)
			}
		})
	}
	//END OF LEARNING PART

	return (
		<div className={`${Styles.Test} ${darkmode && Styles.TestDark}`}>
			<div className={Styles.TestHeader}>
				{!editing ? (
					<ul className={Styles.TestPagination}>
						{totalQuestionsAmount().map(order => (
							<li
								key={order}
								className={`${Styles.PaginationPoint} ${
									question.order === order && Styles.PaginationPointActive
								}`}
							>
								{order}
							</li>
						))}
					</ul>
				) : (
					<>
						<ul className={Styles.TestPagination}>
							<li className={`${Styles.PaginationPoint}`}>
								<button type={'button'} onClick={growUpOrder}>
									<ArrowUp height={10} strokeWidth={2} color={'currentColor'} />
								</button>
							</li>
							<li className={`${Styles.PaginationPoint}`}>
								<button type={'button'} onClick={growDownOrder}>
									<ArrowDown
										height={10}
										strokeWidth={2}
										color={'currentColor'}
									/>
								</button>
							</li>
						</ul>
						<SmallDeleteButton deleteFunction={deleteQuestion} />
					</>
				)}
			</div>

			<Divider />

			<h3
				ref={questionNameRef}
				contentEditable={editing}
				suppressContentEditableWarning={true}
				spellCheck={false}
				className={`${Text.H6Bold} ${Styles.Question}`}
			>
				{questionName}
			</h3>

			<form className={Styles.QuestionForm}>
				<div className={Styles.QuestionAnswers}>
					{/*Edits*/}

					{editing && (
						<div className={Styles.WrapperEdits}>
							{question.type !== 'input' ? (
								<>
									<span className={Text.Caption1Medium}>Right</span>
									<span className={Text.Caption1Medium}>Answer</span>
								</>
							) : (
								<>
									<span className={Text.Caption1Medium}>Answer</span>
								</>
							)}
						</div>
					)}

					{/*Edits*/}

					{/*Answers*/}

					{question.type === 'checkbox' ? (
						answers.map(answer => (
							<div
								className={`${Styles.AnswerWrapper} ${
									editing && Styles.AnswerWrapperEditing
								}`}
								key={answer.id}
							>
								<label className={Styles.QuestionAnswer}>
									<input
										id={`${answer.id}`}
										type={'checkbox'}
										value={answer.name}
										name={question.name}
										className={Styles.AnswerInput}
										ref={answerInput =>
											(answersInputsRef.current[answer.id] =
												answerInput as HTMLInputElement)
										}
									/>
									<div className={Styles.AnswerCheckbox}>
										<Check width={12} strokeWidth={3} />
									</div>
									<h5
										id={Styles.QuestionAnswersName}
										className={`${Text.Body1Regular} ${
											editing && Styles.QuestionAnswerNameEditing
										}`}
										contentEditable={editing}
										suppressContentEditableWarning={true}
										spellCheck={false}
										onClick={
											!editing ? () => {} : event => event.preventDefault()
										}
										ref={answerName =>
											(answersNamesRef.current[answer.id] =
												answerName as HTMLHeadingElement)
										}
									>
										{answer.name}
									</h5>
								</label>
								{editing && (
									<SmallDeleteButton
										deleteFunction={() => deleteAnswer(answer.id)}
									/>
								)}
							</div>
						))
					) : question.type === 'radio' ? (
						answers.map(answer => (
							<div
								className={`${Styles.AnswerWrapper} ${
									editing && Styles.AnswerWrapperEditing
								}`}
								key={answer.id}
							>
								<label className={Styles.QuestionAnswer}>
									<input
										id={`${answer.id}`}
										type={'radio'}
										value={answer.name}
										name={question.name}
										className={Styles.AnswerInput}
										ref={answerInput =>
											(answersInputsRef.current[answer.id] =
												answerInput as HTMLInputElement)
										}
									/>
									<div className={Styles.AnswerRadio}>
										<div />
									</div>
									<h5
										id={Styles.QuestionAnswersName}
										className={`${Text.Body1Regular} ${
											editing && Styles.QuestionAnswerNameEditing
										}`}
										contentEditable={editing}
										suppressContentEditableWarning={true}
										spellCheck={false}
										onClick={
											!editing ? () => {} : event => event.preventDefault()
										}
										ref={answerName =>
											(answersNamesRef.current[answer.id] =
												answerName as HTMLHeadingElement)
										}
									>
										{answer.name}
									</h5>
								</label>
								{editing && (
									<SmallDeleteButton
										deleteFunction={() => deleteAnswer(answer.id)}
									/>
								)}
							</div>
						))
					) : (
						<div className={Styles.AnswerTextInput}>
							<Field
								type={'text'}
								theme={!darkmode ? 'grey' : 'black'}
								name={question.name}
								reference={textAnswerInputRef}
								onChange={
									editing
										? event => setTextAnswer(event.target.value)
										: event => setTextUserAnswer(event.target.value)
								}
								value={editing ? textAnswer : textUserAnswer}
							/>
						</div>
					)}

					{/*Add answer button*/}
					{editing && question.type !== 'input' && (
						<button
							onClick={createAnswer}
							type={'button'}
							className={`${Text.Body1Regular} ${Styles.AddButton}`}
						>
							Add answer <span>+</span>
						</button>
					)}

					{/*Answers*/}
				</div>
				<div className={Styles.QuestionButton}>
					<Button
						clickFunction={answerTheQuestion}
						text={'Answer'}
						disabled={
							!isLearningPage ||
							editing ||
							answered ||
							userProgress === undefined
						}
						small
						fill
					/>
					{answeredIncorrect && <div className={Styles.IncorrectAnswer} />}
					{answered && (
						<div className={Styles.CorrectAnswer}>
							<Check size={12} strokeWidth={4} />
						</div>
					)}
				</div>
			</form>
		</div>
	)
}

export default Question