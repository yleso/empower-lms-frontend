import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { PopupInterface } from '@/components/team-popups/popup.interface'
import { CreateWordDto } from '@/types/word/create-word.dto'
import { useTheme } from '@/hooks/useTheme.hook'
import wordApi from '@/store/api/word.api'
import Text from '@/styles/text.module.scss'
import Styles from '../faq-popup/faq-popup.module.scss'


const WordPopup: FC<PopupInterface> = ({ isShow, setIsShow, reference }) => {
	const { darkmode } = useTheme()
	const { team_id: teamId } = useParams()

	const { register, handleSubmit, reset } = useForm<CreateWordDto>({
		mode: 'onChange'
	})

	const [createWordApi] = wordApi.useCreateWordMutation()

	const onSubmit: SubmitHandler<CreateWordDto> = async data => {
		const wordData = {
			...data,
			team: Number(teamId)
		}

		setIsShow(false)
		await createWordApi(wordData)
		reset()
	}

	return (
		<Popup isOpened={isShow} setIsOpened={setIsShow} reference={reference}>
			<form
				className={`${Styles.Content} ${darkmode && Styles.ContentDark}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={`${Styles.PopupGrid}`}>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Word</label>
						<Field
							type={'text'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('name')}
							reference={register('name').ref}
						/>
					</div>
					<div className={`${Styles.Field}`}>
						<label className={Text.H6Bold}>Definition</label>
						<Field
							type={'textarea'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('definition')}
							reference={register('definition').ref}
						/>
					</div>
				</div>
				<input
					className={Styles.TeamInput}
					type='text'
					value={teamId}
					{...register('team')}
				/>
				<Button text={'Add to Glossary'} fill small submit />
			</form>
		</Popup>
	)
}

export default WordPopup