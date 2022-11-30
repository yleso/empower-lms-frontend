import React, { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import { CreateFaqDto } from '@/types/faq/create-faq.dto'
import faqApi from '@/store/api/faq.api'
import Text from '@/styles/text.module.scss'
import { PopupInterface } from '../popup.interface'
import Styles from './faq-popup.module.scss'


const FaqPopup: FC<PopupInterface> = ({
	popupShow,
	setPopupShow,
	popupRef
}) => {
	const { darkmode } = useContext(ThemeContext)
	const { team_id: teamId } = useParams()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<CreateFaqDto>({
		mode: 'onChange'
	})

	const [addFaq, { isLoading }] = faqApi.useCreateFaqMutation()

	const onSubmit: SubmitHandler<CreateFaqDto> = async data => {
		const questionData = {
			...data,
			team: Number(teamId)
		}

		setPopupShow(false)
		await addFaq(questionData)
		!isLoading && window.location.reload()
	}

	return (
		<Popup isOpened={popupShow} setIsOpened={setPopupShow} popupRef={popupRef}>
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