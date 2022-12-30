import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from '@/generic/select/select'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { useTheme } from '@/hooks/useTheme.hook'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import { CreateTeammateFormInterface } from './create-teammate-form.interface'
import { CreateTeammatePopupInterface } from './create-teammate-popup.interface'
import Styles from './create-teammate-popup.module.scss'
import TeammateFields from './employee.fields'


const CreateTeammatePopup: FC<CreateTeammatePopupInterface> = ({
	isShow,
	setIsShow,
	reference,
	teams
}) => {
	//Hooks
	//Theme hook
	const { darkmode } = useTheme()
	//Error hook
	const [error, setError] = useState<string>()

	//Make errors empty on load
	useEffect(() => {
		setError(undefined)
		reset()
	}, [isShow])

	const [createUserApi] = employeeApi.useCreateEmployeeMutation()

	const { register, handleSubmit, reset } =
		useForm<CreateTeammateFormInterface>({
			mode: 'onChange'
		})

	const onSubmit: SubmitHandler<CreateTeammateFormInterface> = async data => {
		const userData = {
			...data,
			role: 1,
			team: +data.team,
			phone_number: data.phone_number ? data.phone_number : undefined
		}

		await createUserApi(userData).then(async response => {
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
		})
	}

	return (
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
							<Select
								theme={!darkmode ? 'grey' : 'black'}
								options={teams}
								{...register('team')}
								reference={register('team').ref}
							/>
						</div>
					</div>
					{error && <div className={Styles.Error}>{error}</div>}
					<Button text={'Add a team member'} fill small submit />
				</form>
			</div>
		</Popup>
	)
}

export default CreateTeammatePopup