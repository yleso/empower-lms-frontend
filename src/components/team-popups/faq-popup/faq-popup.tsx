import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { FaqPopupInterface } from '@/components/team-popups/faq-popup/faq-popup.interface'
import { CreateFaqDto } from '@/types/faq/create-faq.dto'
import { useTheme } from '@/hooks/useTheme.hook'
import faqApi from '@/store/api/faq.api'
import Text from '@/styles/text.module.scss'
import Styles from './faq-popup.module.scss'


const FaqPopup: FC<FaqPopupInterface> = ({
	isShow,
	setIsShow,
	reference,
	setValue
}) => {
	const { darkmode } = useTheme()
	const { team_id: teamId } = useParams()

	const { register, handleSubmit, reset } = useForm<CreateFaqDto>({
		mode: 'onChange'
	})

	const [createFaqApi] = faqApi.useCreateFaqMutation()

	const onSubmit: SubmitHandler<CreateFaqDto> = async data => {
		const questionData = {
			...data,
			team: Number(teamId)
		}

		//Close popup
		setIsShow(false)
		//Create faq
		await createFaqApi(questionData).then(response => {
			//Get new faq from request
			//@ts-ignore
			const newFaq = response.data
			//Add new faq to current list
			//@ts-ignore
			setValue(currentFaqs => [...currentFaqs, newFaq])
			//Reset form
			reset()
		})
	}

	return (
		<Popup isOpened={isShow} setIsOpened={setIsShow} reference={reference}>
			<form
				className={`${Styles.Content} ${darkmode && Styles.ContentDark}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={`${Styles.PopupGrid}`}>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Question</label>
						<Field
							type={'text'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('question')}
							reference={register('question').ref}
						/>
					</div>
					<div className={`${Styles.Field}`}>
						<label className={Text.H6Bold}>Answer</label>
						<Field
							type={'textarea'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('answer')}
							reference={register('answer').ref}
						/>
					</div>
				</div>
				<Button text={'Add to FAQ'} fill small submit />
			</form>
		</Popup>
	)
}

export default FaqPopup