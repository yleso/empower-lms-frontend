import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { useTheme } from '@/hooks/useTheme.hook'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import TeammateFields from './teammate-popul.fields'
import { TeammatePopupFormInterface } from './teammate-popup.form.interface'
import { TeammatePopupInterface } from './teammate-popup.interface'
import Styles from './teammate-popup.module.scss'


const TeammatePopup: FC<TeammatePopupInterface> = ({
	isShow,
	setIsShow,
	reference,
	teamName
}) => {
	const { darkmode } = useTheme()

	const { team_id } = useParams()
	const teamId = Number(team_id) || 0

	const [error, setError] = useState<string>()

	useEffect(() => {
		setError(undefined)
	}, [isShow])

	const [createUserApi, { isLoading: userIsCreating }] =
		employeeApi.useCreateEmployeeMutation()

	const { register, handleSubmit, reset } = useForm<TeammatePopupFormInterface>(
		{
			mode: 'onChange'
		}
	)

	const onSubmit: SubmitHandler<TeammatePopupFormInterface> = async data => {
		const userData = {
			...data,
			role: 1,
			team: teamId,
			line_manager: +data.line_manager,
			phone_number: data.phone_number ? data.phone_number : undefined
		}

		await createUserApi(userData).then(response => {
			//Get error from response
			//@ts-ignore
			const error = response?.error
			//If email is already registered
			if (error) {
				//Get error message
				const errorMessage = error?.data.message
				//Set error and exist the function
				return setError(errorMessage)
			}
			//Close popup
			setIsShow(false)
			//Reset form
			reset()
		})
	}

	return (
		<>
			{/*Content*/}
			<Popup isOpened={isShow} setIsOpened={setIsShow} reference={reference}>
				<div className={`${darkmode && Styles.ContentDark} ${Styles.Content}`}>
					<form
						className={`${Styles.PopupForm}`}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={`${Styles.PopupGrid}`}>
							{TeammateFields.map(field => (
								<div key={field.label} className={`${Styles.Field}`}>
									<div>
										<label className={Text.H6Bold}>{field.label}</label>
										{field.label === 'Phone' && <span>Opt.</span>}
									</div>
									<Field
										type={field.type}
										required={field.label !== 'Phone'}
										theme={!darkmode ? 'grey' : 'black'}
										{...register(field.name)}
										reference={register(field.name).ref}
									/>
								</div>
							))}

							<div key={'Team'} className={`${Styles.Field}`}>
								<div>
									<label className={Text.H6Bold}>Team</label>
								</div>
								<Field
									type={'text'}
									required={true}
									theme={!darkmode ? 'grey' : 'black'}
									value={teamName}
									disabled={true}
								/>
							</div>
						</div>
						{error && <div className={Styles.Error}>{error}</div>}
						<Button
							text={'Add a team member'}
							fill
							small
							submit
							disabled={userIsCreating}
						/>
					</form>
				</div>
			</Popup>
		</>
	)
}

export default TeammatePopup