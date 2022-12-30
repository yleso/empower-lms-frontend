import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { Plus } from 'tabler-icons-react'
import SmallDeleteButton from '@/generic/buttons/delete-buttons/small-delete-button/small-delete-button'
import { useTheme } from '@/hooks/useTheme.hook'
import faqApi from '@/store/api/faq.api'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { FAQInterface } from './FAQ.interface'
import Styles from './FAQ.module.scss'


const Faq: FC<FAQInterface> = ({
	id,
	question,
	answer,
	editState,
	deleteFunction
}) => {
	//Hooks
	const { darkmode } = useTheme()
	const [opened, setOpened] = useState(false)
	//Hooks to work with api
	useEffect(() => {
		editFaq().then(() => {})
	}, [editState])

	//Api functions
	//Edit faq
	const [editFaqApi] = faqApi.useEditFaqMutation()
	//Functions
	const editFaq = async () => {
		//Params to compare
		//Question name
		//Current question name
		const currentQuestionName = question
		//New question name
		const newQuestionName =
			questionRef.current !== null ? questionRef.current.outerText : ''
		//Question answer
		//Current question answer
		const currentQuestionAnswer = answer
		//New question answer
		const newQuestionAnswer =
			answerRef.current !== null ? answerRef.current.outerText : ''

		if (
			currentQuestionName !== newQuestionName ||
			currentQuestionAnswer !== newQuestionAnswer
		) {
			editFaqApi({
				id,
				question: newQuestionName,
				answer: newQuestionAnswer
			})
		}
	}
	//Ui functions
	//Toggle open function
	const toggleOpen = (event: MouseEvent<HTMLElement>) => {
		const ignoredToClose = [questionRef, answerRef, ignoreButtonRef]

		if (!editState) return setOpened(opened => !opened)

		ignoredToClose.forEach(triggerIgnoreElement => {
			if (
				triggerIgnoreElement.current !== null &&
				//@ts-ignore
				!triggerIgnoreElement.current.contains(event.target)
			)
				setOpened(opened => !opened)
		})
	}

	//Refs
	//Question ref
	const questionRef = useRef<HTMLHeadingElement>(null)
	//Answer ref
	const answerRef = useRef<HTMLParagraphElement>(null)
	//Button to ignore close trigger ref
	const ignoreButtonRef = useRef<HTMLDivElement>(null)

	return (
		<div
			className={`${Styles.FAQ} ${opened && Styles.FAQOpened} ${
				darkmode && Styles.FAQDark
			}`}
			onClick={event => toggleOpen(event)}
		>
			<div className={Styles.FAQHeader}>
				<h6
					className={`${Text.H6Bold} ${editState && Styles.CursorText}`}
					contentEditable={editState}
					suppressContentEditableWarning={true}
					spellCheck={false}
					ref={questionRef}
				>
					{question}
				</h6>
				<div className={Styles.FAQButtons}>
					<div className={Styles.FAQIcon}>
						<Plus size={24} color={Vars['brand-main-color']} />
					</div>
					{editState && (
						<div className={Styles.DeleteButton} ref={ignoreButtonRef}>
							<SmallDeleteButton deleteFunction={() => deleteFunction(id)} />
						</div>
					)}
				</div>
			</div>
			<p
				className={`${Text.Body1Regular} ${Styles.FAQAnswer} ${
					editState && Styles.CursorText
				}`}
				contentEditable={editState}
				suppressContentEditableWarning={true}
				spellCheck={false}
				ref={answerRef}
			>
				{answer}
			</p>
		</div>
	)
}

export default Faq